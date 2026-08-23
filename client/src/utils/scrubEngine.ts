/**
 * lets-scroll — High-Performance 60fps Cinematic Scroll Engine
 * Optimized for silky smooth frame rates, zero video-seek lockups,
 * and responsive 3D diorama storytelling.
 */

export interface LetsScrollSection {
  id: string;
  label: string;
  still: string;
  stillMobile?: string;
  clip?: string;
  clipMobile?: string;
  accent?: string;
  scroll?: number;
  linger?: number;
  eyebrow?: string;
  title?: string;
  body?: string;
  tags?: string[];
  cta?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}

export interface LetsScrollConfig {
  brand?: { name: string; href?: string };
  cta?: { label: string; href?: string };
  hint?: string;
  nav?: boolean;
  atmosphere?: boolean;
  customHeader?: boolean;
  onProgress?: (progress: number, activeIndex: number) => void;
  diveScroll?: number;
  connScroll?: number;
  crossfade?: number;
  sections: LetsScrollSection[];
  connectors?: string[];
  connectorsMobile?: string[];
}

export type LetsScrollInstance = {
  (): void;
  jumpTo: (index: number) => void;
};

export function mountLetsScroll(container: HTMLElement, config: LetsScrollConfig): LetsScrollInstance {
  const reduce = typeof window !== "undefined" && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = typeof window !== "undefined" && window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const smallMQ = typeof window !== "undefined" && window.matchMedia('(max-width: 860px)');
  const isMobile = () => coarse || (smallMQ ? smallMQ.matches : false);
  const SECTIONS = config.sections || [];
  const N = SECTIONS.length;
  if (!N || !container) {
    const noop: any = () => {};
    noop.jumpTo = () => {};
    return noop;
  }

  injectCSS();
  container.classList.add('sw-root');

  const DIVE_W = config.diveScroll || 1.2;
  const CROSSFADE = config.crossfade != null ? config.crossfade : 0.15;

  // Build segments
  const SEGMENTS: any[] = [];
  SECTIONS.forEach((s, i) => {
    const seg = {
      si: i,
      clip: s.clip,
      clipM: s.clipMobile,
      still: s.still,
      stillM: s.stillMobile,
      accent: s.accent || '#D32F2F',
      w: s.scroll || DIVE_W,
      linger: s.linger || 0.3
    };
    SEGMENTS.push(seg);
    (s as any)._seg = seg;
  });
  const NSEG = SEGMENTS.length;

  // Build DOM
  const sky = el('div', 'sw-sky');
  if (config.atmosphere !== false) {
    sky.appendChild(el('div', 'sw-sky__grad'));
    sky.appendChild(el('div', 'sw-sky__glow'));
  }
  const particles = el('div', 'sw-particles');
  sky.appendChild(particles);

  const scrollbar = el('div', 'sw-scrollbar');
  const scrollbarFill = el('span');
  scrollbar.appendChild(scrollbarFill);

  const topbar = el('div', 'sw-topbar');
  let nav: HTMLElement | null = null;
  if (!config.customHeader) {
    if (config.brand) {
      const brand = el('a', 'sw-brand');
      brand.setAttribute('href', config.brand.href || '/');
      brand.appendChild(el('span', 'sw-brand__mark'));
      const nm = el('span', 'sw-brand__name');
      nm.textContent = config.brand.name || '14th Street PIZZA';
      brand.appendChild(nm);
      topbar.appendChild(brand);
    }
    nav = el('nav', 'sw-nav');
    if (config.nav !== false) topbar.appendChild(nav);
    if (config.cta && config.cta.label) {
      const c = el('a', 'sw-topcta');
      c.setAttribute('href', config.cta.href || '/pizza/build-your-own-pizza');
      c.textContent = config.cta.label;
      topbar.appendChild(c);
    }
  }

  const stage = el('div', 'sw-stage');
  const copylayer = el('div', 'sw-copylayer');
  const route = el('div', 'sw-route');
  const hint = el('div', 'sw-hint');
  if (!config.customHeader) {
    const hintText = el('span');
    hintText.textContent = config.hint || 'Scroll to fly through the diorama world';
    hint.appendChild(hintText);
    hint.appendChild(el('i'));
  }
  const track = el('div', 'sw-track');

  container.innerHTML = '';
  const nodesToAppend = config.customHeader 
    ? [sky, stage, copylayer, track]
    : [sky, scrollbar, topbar, stage, copylayer, route, hint, track];
  nodesToAppend.forEach(n => container.appendChild(n));

  // Build Scene Layers
  SEGMENTS.forEach((s) => {
    const scene = el('div', 'sw-scene');
    scene.style.setProperty('--sw-accent', s.accent);

    // High-Res 3D Diorama Still (Always active base for instant 60fps response)
    const img = document.createElement('img');
    img.className = 'sw-scene__still';
    img.alt = '';
    img.decoding = 'async';
    img.loading = 'eager';
    const poster = isMobile() && s.stillM ? s.stillM : s.still;
    if (poster) img.src = poster;
    scene.appendChild(img);

    // Video Element (Smooth ambient autoplay when active)
    let video: HTMLVideoElement | null = null;
    if (s.clip && !reduce) {
      video = document.createElement('video');
      video.className = 'sw-scene__video';
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('loop', '');
      video.src = s.clip;
      scene.appendChild(video);
    }

    stage.appendChild(scene);
    s.el = scene;
    s.img = img;
    s.video = video;
    s.videoPlaying = false;
    s.visible = false;
  });

  // Section Copy & Route Dots
  const copies: HTMLElement[] = [];
  const dots: HTMLElement[] = [];
  SECTIONS.forEach((s, i) => {
    const c = el('article', 'sw-copy');
    c.style.setProperty('--sw-accent', s.accent || '#D32F2F');
    c.innerHTML =
      `<span class="sw-copy__num">${pad(i + 1)} / ${pad(N)}</span>` +
      (s.eyebrow ? `<span class="sw-copy__eyebrow">${esc(s.eyebrow)}</span>` : '') +
      (s.title ? `<h2 class="sw-copy__title">${esc(s.title)}</h2>` : '') +
      (s.body ? `<p class="sw-copy__body">${esc(s.body)}</p>` : '') +
      (s.tags && s.tags.length ? `<ul class="sw-copy__tags">${s.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : '') +
      (s.cta ? `<div class="sw-copy__cta">${ctaBtns(s.cta)}</div>` : '');
    copylayer.appendChild(c);
    copies.push(c);

    const dot = el('button', 'sw-route__dot');
    dot.style.setProperty('--sw-accent', s.accent || '#D32F2F');
    dot.innerHTML = `<span class="sw-route__label">${esc(s.label || '')}</span><i></i>`;
    dot.addEventListener('click', () => jumpTo(i));
    route.appendChild(dot);
    dots.push(dot);

    if (nav && config.nav !== false) {
      const b = el('button', 'sw-nav__item');
      b.textContent = s.label || '';
      b.addEventListener('click', () => jumpTo(i));
      nav.appendChild(b);
    }
  });

  const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const smooth = (x: number) => { x = clamp(x); return x * x * (3 - 2 * x); };

  let vh = window.innerHeight;
  let totalW = 0;
  let activeIndex = -1;
  let ticking = false;
  let isUnmounted = false;

  function layout() {
    if (isUnmounted) return;
    vh = window.innerHeight;
    let off = 0;
    SEGMENTS.forEach(s => {
      s.start = off * vh;
      off += s.w;
      s.end = off * vh;
    });
    totalW = off;
    track.style.height = (totalW * vh + vh) + 'px';
    render();
  }

  function jumpTo(i: number) {
    const seg = SEGMENTS[i];
    if (!seg) return;
    window.scrollTo({
      top: seg.start + (seg.end - seg.start) * 0.3,
      behavior: reduce ? 'auto' : 'smooth'
    });
  }

  function render() {
    if (isUnmounted) return;
    const y = window.scrollY || window.pageYOffset;
    const fade = CROSSFADE * vh;
    
    // Find active section
    let ci = 0;
    for (let i = 0; i < NSEG; i++) {
      if (y >= SEGMENTS[i].start - fade) ci = i;
    }

    // Update Scenes with Silky Smooth Hardware Accelerated Transforms
    for (let i = 0; i < NSEG; i++) {
      const s = SEGMENTS[i];
      const local = clamp((y - s.start) / (s.end - s.start), 0, 1);
      
      let outside = 0;
      if (y < s.start) outside = s.start - y;
      else if (y > s.end) outside = y - s.end;

      const op = smooth(1 - outside / fade);
      const isCurrent = i === ci && op > 0.4;

      // Update scene container
      s.el.style.opacity = op.toFixed(3);
      s.el.style.zIndex = i === ci ? '120' : String(100 + Math.round(op * 10));
      s.el.style.pointerEvents = op > 0.5 ? 'auto' : 'none';

      // Parallax 3D zoom on still image
      const scale = (1.0 + local * 0.08).toFixed(3);
      const transY = ((local - 0.5) * -2).toFixed(2);
      s.img.style.transform = `translate3d(0, ${transY}vh, 0) scale(${scale})`;

      // Video playback handling (Plays ambiently when in focus, pauses when scrolled away)
      if (s.video) {
        if (isCurrent && !s.videoPlaying) {
          s.videoPlaying = true;
          s.video.play().catch(() => {});
          s.video.style.opacity = '1';
        } else if (!isCurrent && s.videoPlaying) {
          s.videoPlaying = false;
          s.video.pause();
          s.video.style.opacity = '0';
        }
      }
    }

    // Update Story Copy Cards
    for (let i = 0; i < N; i++) {
      const seg = SEGMENTS[i];
      const pr = clamp((y - seg.start) / (seg.end - seg.start), 0, 1);
      const before = y < seg.start;
      const after = y > seg.end;
      
      let cop: number;
      if (i === 0) cop = after ? 0 : smooth(1 - pr / 0.7);
      else if (i === N - 1) cop = before ? 0 : smooth(pr / 0.5);
      else cop = before || after ? 0 : smooth(1 - Math.abs(pr - 0.5) / 0.45);

      const c = copies[i];
      if (c) {
        c.style.opacity = cop.toFixed(3);
        const transY = ((0.5 - pr) * 6).toFixed(2);
        c.style.transform = `translate3d(0, ${transY}vh, 0)`;
        c.style.pointerEvents = cop > 0.5 ? 'auto' : 'none';
      }
    }

    // Update Active Navigation & Dots
    if (ci !== activeIndex) {
      activeIndex = ci;
      dots.forEach((d, k) => d.classList.toggle('is-active', k === ci));
      if (nav) {
        nav.querySelectorAll('.sw-nav__item').forEach((n: Element, k: number) => n.classList.toggle('is-active', k === ci));
      }
      container.style.setProperty('--sw-accent', SECTIONS[ci]?.accent || '#D32F2F');
    }

    // Progress Bar & Hints
    const progressVal = clamp(y / (totalW * vh));
    scrollbarFill.style.transform = `scaleX(${progressVal.toFixed(3)})`;
    hint.style.opacity = clamp(1 - y / (0.3 * vh)).toFixed(2);
    
    if (config.onProgress) {
      config.onProgress(progressVal, ci);
    }
    
    ticking = false;
  }

  seedParticles(particles, reduce || coarse);

  const scrollHandler = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
  window.addEventListener('resize', layout, { passive: true });
  window.addEventListener('orientationchange', layout, { passive: true });

  layout();

  const cleanup: any = () => {
    isUnmounted = true;
    window.removeEventListener('scroll', scrollHandler);
    window.removeEventListener('resize', layout);
    window.removeEventListener('orientationchange', layout);
    SEGMENTS.forEach(s => {
      if (s.video) {
        try {
          s.video.pause();
          s.video.src = '';
          s.video.load();
        } catch (e) {}
      }
    });
  };

  cleanup.jumpTo = jumpTo;
  return cleanup;

  function el(tag: string, cls?: string): HTMLElement {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }

  function pad(n: number) {
    return String(n).padStart(2, '0');
  }

  function esc(s: string) {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c));
  }

  function ctaBtns(cta: any) {
    let h = '';
    if (cta.primary) {
      h += `<a class="sw-btn sw-btn--primary" href="${esc(cta.primary.href || '#')}">${esc(cta.primary.label)}</a>`;
    }
    if (cta.secondary) {
      h += `<a class="sw-btn sw-btn--ghost" href="${esc(cta.secondary.href || '#')}">${esc(cta.secondary.label)}</a>`;
    }
    return h;
  }
}

function seedParticles(host: HTMLElement | null, reduce: boolean) {
  if (!host || reduce) return;
  const kinds = ['dot', 'dot', 'ring'];
  const seeds = [7, 23, 41, 58, 71, 88, 12, 34, 52, 66, 83, 95, 18, 29, 47, 63, 77, 91];
  for (let k = 0; k < 18; k++) {
    const s = document.createElement('span');
    s.className = 'sw-pt sw-pt--' + kinds[k % kinds.length];
    s.style.left = seeds[k % seeds.length] + 'vw';
    s.style.top = ((seeds[(k * 3) % seeds.length] * 1.3) % 100) + 'vh';
    s.style.setProperty('--sw-sc', (0.6 + ((seeds[(k * 5) % seeds.length] % 50) / 50) * 0.8).toFixed(2));
    const dur = 16 + (seeds[(k * 7) % seeds.length] % 20);
    s.style.animationDuration = dur + 's';
    s.style.animationDelay = (-(seeds[(k * 2) % seeds.length] % dur)) + 's';
    host.appendChild(s);
  }
}

function injectCSS() {
  if (document.getElementById('sw-css')) return;
  const css = `
  .sw-root{--sw-bg:#07080a;--sw-ink:#ffffff;--sw-ink-soft:#9ca3af;--sw-accent:#d32f2f;
    --sw-font-display:'Bebas Neue','Outfit',system-ui,sans-serif;
    --sw-font-body:'Hanken Grotesk','Plus Jakarta Sans',system-ui,sans-serif;
    color:var(--sw-ink);font-family:var(--sw-font-body);}
  .sw-sky{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:var(--sw-bg);}
  .sw-sky__grad{position:absolute;inset:-10%;background:linear-gradient(178deg,color-mix(in srgb,var(--sw-accent) 15%,var(--sw-bg)) 0%,var(--sw-bg) 55%,color-mix(in srgb,var(--sw-accent) 8%,var(--sw-bg)) 100%);}
  .sw-sky__glow{position:absolute;inset:0;background:radial-gradient(60% 42% at 74% 16%,color-mix(in srgb,var(--sw-accent) 22%,transparent),transparent 70%),radial-gradient(46% 34% at 50% 50%,color-mix(in srgb,#d32f2f 20%,transparent),transparent 70%);}
  .sw-particles{position:absolute;inset:-6% -2%;will-change:transform;transform:translate3d(0,0,0);}
  .sw-pt{position:absolute;width:10px;height:10px;transform:scale(var(--sw-sc,1));opacity:0;animation:sw-drift linear infinite;}
  .sw-pt::before{content:"";position:absolute;inset:0;border-radius:50%;}
  .sw-pt--dot::before{background:radial-gradient(circle at 34% 30%,color-mix(in srgb,var(--sw-accent) 80%,#fff),#d32f2f 82%);}
  .sw-pt--ring::before{background:transparent;border:2px solid color-mix(in srgb,var(--sw-accent) 65%,transparent);}
  @keyframes sw-drift{0%{opacity:0;transform:scale(var(--sw-sc)) translate(0,10vh) rotate(0)}15%{opacity:.5}85%{opacity:.4}100%{opacity:0;transform:scale(var(--sw-sc)) translate(3vw,-20vh) rotate(180deg)}}
  
  .sw-scrollbar{position:fixed;top:0;left:0;right:0;height:4px;z-index:60;background:rgba(255,255,255,0.08);}
  .sw-scrollbar span{display:block;height:100%;width:100%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#d32f2f,#f5a623);will-change:transform;}
  
  .sw-topbar{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:clamp(14px,2vw,22px) clamp(18px,5vw,56px);backdrop-filter:blur(16px);background:rgba(7,8,10,0.8);border-bottom:1px solid rgba(255,255,255,0.08);}
  .sw-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff;}
  .sw-brand__mark{width:24px;height:24px;border-radius:50%;border:2px solid #dc9100;background:#FFF8E7;box-shadow:0 0 15px rgba(211,47,47,0.5);}
  .sw-brand__name{font-family:var(--sw-font-display);font-weight:700;font-size:1.4rem;letter-spacing:0.04em;text-transform:uppercase;}
  .sw-nav{display:flex;gap:4px;padding:4px;background:rgba(22,25,34,0.9);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1);border-radius:999px;}
  .sw-nav__item{font:inherit;font-size:.78rem;font-weight:700;color:var(--sw-ink-soft);border:0;background:transparent;cursor:pointer;padding:6px 14px;border-radius:999px;transition:all .25s;}
  .sw-nav__item:hover{color:#fff;background:rgba(255,255,255,0.08);} .sw-nav__item.is-active{color:#fff;background:var(--sw-accent);box-shadow:0 0 15px rgba(211,47,47,0.6);}
  .sw-topcta{text-decoration:none;font-weight:700;font-size:.85rem;color:#fff;background:#d32f2f;padding:9px 20px;border-radius:999px;white-space:nowrap;box-shadow:0 0 20px rgba(211,47,47,0.5);transition:all .2s;}
  .sw-topcta:hover{background:#be123c;transform:translateY(-1px);}
  
  .sw-stage{position:fixed;inset:0;z-index:10;pointer-events:none;}
  .sw-scene{position:absolute;inset:0;opacity:0;overflow:hidden;will-change:opacity;transform:translate3d(0,0,0);backface-visibility:hidden;}
  .sw-scene__video,.sw-scene__still{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 45%;backface-visibility:hidden;}
  .sw-scene__still{will-change:transform;transform:translate3d(0,0,0);}
  .sw-scene__video{z-index:1;opacity:0;transition:opacity 0.5s ease;pointer-events:none;}
  
  .sw-copylayer{position:fixed;inset:0;z-index:20;pointer-events:none;}
  .sw-copylayer::before{content:"";position:absolute;inset:0;width:min(60vw,800px);background:linear-gradient(90deg,var(--sw-bg) 0%,rgba(7,8,10,0.85) 40%,rgba(7,8,10,0.3) 70%,transparent 100%);}
  .sw-copy{position:absolute;left:clamp(20px,6vw,80px);top:50%;transform:translate3d(0,-50%,0);width:min(44vw,520px);opacity:0;will-change:opacity,transform;}
  .sw-copy__num{font-family:ui-monospace,Menlo,monospace;font-size:.8rem;letter-spacing:.14em;color:var(--sw-accent);font-weight:800;}
  .sw-copy__eyebrow{display:block;margin-top:12px;font-family:var(--sw-font-body);font-weight:800;font-size:.82rem;letter-spacing:.16em;text-transform:uppercase;color:#f5a623;}
  .sw-copy__title{font-family:var(--sw-font-display);font-weight:400;color:#ffffff;font-size:clamp(2.5rem,5vw,4.2rem);line-height:0.95;margin:10px 0 0;letter-spacing:0.02em;text-transform:uppercase;text-shadow:0 4px 30px rgba(0,0,0,0.9);}
  .sw-copy__body{margin-top:16px;font-size:clamp(0.95rem,1.2vw,1.1rem);line-height:1.6;color:rgba(255,255,255,0.85);max-width:44ch;text-shadow:0 2px 14px rgba(0,0,0,0.9);}
  .sw-copy__tags{list-style:none;display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 0;padding:0;}
  .sw-copy__tags li{font-size:.76rem;font-weight:700;font-family:ui-monospace,Menlo,monospace;color:#f5a623;padding:5px 12px;border-radius:999px;background:rgba(245,166,35,0.12);border:1px solid rgba(245,166,35,0.3);}
  .sw-copy__cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px;pointer-events:auto;}
  .sw-btn{text-decoration:none;font-weight:700;font-size:.9rem;padding:12px 24px;border-radius:999px;transition:all .2s;}
  .sw-btn--primary{color:#fff;background:#d32f2f;box-shadow:0 0 20px rgba(211,47,47,0.5);} .sw-btn--primary:hover{transform:translateY(-2px);background:#be123c;}
  .sw-btn--ghost{color:#fff;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);} .sw-btn--ghost:hover{background:rgba(255,255,255,0.15);transform:translateY(-2px);}
  
  .sw-route{position:fixed;right:clamp(14px,2.4vw,30px);top:50%;z-index:40;transform:translateY(-50%);display:flex;flex-direction:column;gap:20px;padding:18px 10px;}
  .sw-route::before{content:"";position:absolute;left:50%;top:22px;bottom:22px;width:2px;transform:translateX(-50%);background:var(--sw-accent);opacity:.35;}
  .sw-route__dot{position:relative;border:0;background:transparent;cursor:pointer;width:18px;height:18px;display:grid;place-items:center;}
  .sw-route__dot i{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,0.3);transition:all .25s;}
  .sw-route__dot:hover i{transform:scale(1.3);background:var(--sw-accent);}
  .sw-route__dot.is-active i{background:var(--sw-accent);transform:scale(1.5);box-shadow:0 0 12px rgba(211,47,47,0.8);}
  .sw-route__label{position:absolute;right:28px;top:50%;transform:translateY(-50%) translateX(6px);white-space:nowrap;font-size:.78rem;font-weight:700;color:#fff;background:rgba(14,16,21,0.92);backdrop-filter:blur(8px);padding:5px 12px;border-radius:999px;opacity:0;pointer-events:none;transition:all .2s;border:1px solid rgba(255,255,255,0.12);}
  .sw-route__dot:hover .sw-route__label,.sw-route__dot.is-active .sw-route__label{opacity:1;transform:translateY(-50%) translateX(0);}
  
  .sw-hint{position:fixed;left:50%;bottom:28px;z-index:30;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:10px;font-size:.76rem;letter-spacing:.16em;text-transform:uppercase;color:var(--sw-ink-soft);font-weight:700;transition:opacity .3s;}
  .sw-hint i{width:22px;height:34px;border-radius:12px;border:2px solid rgba(255,255,255,0.3);position:relative;}
  .sw-hint i::after{content:"";position:absolute;left:50%;top:7px;width:4px;height:7px;border-radius:2px;background:var(--sw-accent);transform:translateX(-50%);animation:sw-wheel 1.7s ease-in-out infinite;}
  @keyframes sw-wheel{0%{opacity:0;top:6px}40%{opacity:1}100%{opacity:0;top:17px}}
  
  .sw-track{position:relative;z-index:1;width:100%;pointer-events:none;}
  @media (max-width:860px){
    .sw-nav{display:none;}
    .sw-copylayer::before{width:100%;height:65%;top:auto;bottom:0;background:linear-gradient(0deg,var(--sw-bg) 10%,rgba(7,8,10,0.9) 55%,transparent 100%);}
    .sw-copy{left:clamp(18px,5vw,64px);right:clamp(18px,5vw,64px);top:auto;bottom:clamp(64px,12vh,110px);transform:none;width:auto;max-width:560px;}
    .sw-copy__title{font-size:clamp(2.2rem,8vw,3.2rem);}
    .sw-route{gap:16px;right:6px;} .sw-route__label{display:none;}
  }
  `;
  const style = document.createElement('style');
  style.id = 'sw-css';
  style.textContent = '@layer sw {\n' + css + '\n}';
  document.head.appendChild(style);
}
