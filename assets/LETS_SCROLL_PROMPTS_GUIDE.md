# 🍕 14th Street Pizza — `lets-scroll` AI Generation Guide & Prompt Kit

Welcome to your **6-Scene Cinematic Diorama World** asset generation kit.

---

## 🎨 Shared Style Preamble (Use in ALL Image & Video Prompts)
To ensure that all 6 scenes look like parts of the exact same continuous world, **prepend this exact style preamble to every prompt**:

```text
[STYLE PREAMBLE]: isometric 3D clay diorama, tilt-shift miniature world, soft matte low-poly clay textures, warm appetizing golden-hour lighting, detailed handcrafted clay figurines, studio lighting, octane render, 8k resolution, charming whimsical miniature scale, subtle depth of field, warm charcoal and pizza-red accents, floating island diorama, high-end claymation aesthetic.
```

---

## 📂 Target Drop Folder & Required Filenames

Place all generated image stills and video clips directly into:
👉 `client/public/assets/cinematic/`

| Scene # | Image Still Filename (16:9 PNG/JPG) | Dive-In Video Filename (1080p MP4) | Connector Video Filename (1080p MP4) |
| :--- | :--- | :--- | :--- |
| **Scene 1: The Wheat Mill & Dough Spring** | `still_01.png` | `dive_01.mp4` | `conn_01_to_02.mp4` *(joins S1 to S2)* |
| **Scene 2: The 48-Hour Fermentation Vault** | `still_02.png` | `dive_02.mp4` | `conn_02_to_03.mp4` *(joins S2 to S3)* |
| **Scene 3: The Spice Bazaar & Charcoal Grill** | `still_03.png` | `dive_03.mp4` | `conn_03_to_04.mp4` *(joins S3 to S4)* |
| **Scene 4: The 550°F Stone Deck Oven** | `still_04.png` | `dive_04.mp4` | `conn_04_to_05.mp4` *(joins S4 to S5)* |
| **Scene 5: The Express Heat-Lock Dispatch** | `still_05.png` | `dive_05.mp4` | `conn_05_to_06.mp4` *(joins S5 to S6)* |
| **Scene 6: The Giant 20" Monster Feast** | `still_06.png` | `dive_06.mp4` | *(End of journey)* |

---

## 🎬 1. Master Image Stills Prompts (Generate in Midjourney / DALL-E 3 / Flux / Higgsfield)

### 🌾 Scene 1 — The Wheat Mill & Spring
- **Filename**: `still_01.png`
- **Prompt**:
```text
isometric 3D clay diorama, tilt-shift miniature world, soft matte low-poly clay textures, warm appetizing golden-hour lighting, a charming miniature stone watermill with golden wheat stalks, wooden flour barrels overflowing with fine white flour, a crystal clear sparkling mountain spring creek, miniature chef kneads fresh dough ball on wooden butcher block, floating diorama island, octane render, 8k --ar 16:9
```

### 🥖 Scene 2 — The 48-Hour Fermentation Vault
- **Filename**: `still_02.png`
- **Prompt**:
```text
isometric 3D clay diorama, tilt-shift miniature world, soft matte low-poly clay textures, warm cozy subterranean ambient lighting, temperature-controlled stone cellar with wooden fermentation racks, dozens of smooth rising clay dough balls with airy bubbles under glass cloches, miniature pizza chef tossing a giant pizza dough disc into the air, floating diorama island, octane render, 8k --ar 16:9
```

### 🌶️ Scene 3 — The Spice Bazaar & Charcoal Grill
- **Filename**: `still_03.png`
- **Prompt**:
```text
isometric 3D clay diorama, tilt-shift miniature world, soft matte low-poly clay textures, vibrant Pakistani spice market scene, miniature live charcoal grill with glowing red embers and smoking chicken tikka skewers, terracotta bowls filled with red peri-peri chilies, crushed tomatoes, and fresh basil herbs, miniature copper pots of simmered marinara sauce, floating diorama island, octane render, 8k --ar 16:9
```

### 🔥 Scene 4 — The 550°F Stone Deck Oven
- **Filename**: `still_04.png`
- **Prompt**:
```text
isometric 3D clay diorama, tilt-shift miniature world, soft matte low-poly clay textures, glowing orange fire glow, rustic brick stone-deck pizza oven radiating heat, giant pizza inside oven with bubbling melted cheese and blistered golden crust edges, miniature chef using long wooden pizza peel, flying spark embers, floating diorama island, octane render, 8k --ar 16:9
```

### 🛵 Scene 5 — The Express Heat-Lock Dispatch
- **Filename**: `still_05.png`
- **Prompt**:
```text
isometric 3D clay diorama, tilt-shift miniature world, soft matte low-poly clay textures, nighttime urban street with warm glowing streetlights and subtle red neon signs, miniature delivery scooter with insulated 14th Street thermal delivery box, rider ready for express dispatch, steam rising into cool night air, cobblestone street, floating diorama island, octane render, 8k --ar 16:9
```

### 🍕 Scene 6 — The Giant 20" Monster Feast
- **Filename**: `still_06.png`
- **Prompt**:
```text
isometric 3D clay diorama, tilt-shift miniature world, soft matte low-poly clay textures, celebratory dining table scene, giant 20-inch monster pizza in open craft box with steaming foldable slice lifted showing dramatic gooey cheese pull, dipping sauce ramekins, chilled drink bottle, party celebration confetti, floating diorama island, octane render, 8k --ar 16:9
```

---

## 🎥 2. Camera Dive-In Video Prompts (Generate in Runway Gen-3 / Kling / Luma Dream Machine / Monid)

### `dive_01.mp4` (Dive into Scene 1)
- **Start Frame**: `still_01.png`
- **Prompt**: `Slow cinematic camera dive starting from high isometric overview, swooping down and zooming into the spinning watermill wheel and the flour dusting on the dough table. Smooth 3D parallax, 24fps.`

### `dive_02.mp4` (Dive into Scene 2)
- **Start Frame**: `still_02.png`
- **Prompt**: `Camera pushes forward into the warm cellar vault, sweeping past the glass proofing cloches and panning up toward the chef tossing the dough disc into the air. Smooth depth-of-field transition.`

### `dive_03.mp4` (Dive into Scene 3)
- **Start Frame**: `still_03.png`
- **Prompt**: `Camera glides down toward the glowing charcoal embers, flying past the steaming clay pots of marinara and tilting up to reveal the skewers of sizzling chicken tikka.`

### `dive_04.mp4` (Dive into Scene 4)
- **Start Frame**: `still_04.png`
- **Prompt**: `Camera swoops right into the roaring stone deck oven, getting close to the bubbling mozzarella cheese and caramelizing crust surface. Golden fiery embers float past the lens.`

### `dive_05.mp4` (Dive into Scene 5)
- **Start Frame**: `still_05.png`
- **Prompt**: `Camera glides down the cobblestone street alongside the delivery scooter, tracking forward as the headlights shine and steam puffs from the heat-lock carrier box.`

### `dive_06.mp4` (Dive into Scene 6)
- **Start Frame**: `still_06.png`
- **Prompt**: `Camera dives directly onto the center of the giant 20-inch pizza, following the lifted slice as golden molten cheese stretches in slow motion, ending on a hero wide dining view.`

---

## 🌉 3. Seamless Connector Video Prompts (Between Scenes)

> **The Golden Rule of `lets-scroll`**: Connector clips join consecutive scenes with **zero visible seams** using Start-Frame and End-Frame image conditioning:

- `conn_01_to_02.mp4`: **Start Image**: Last frame of `dive_01.mp4` $\to$ **End Image**: First frame of `still_02.png`. Prompt: `Camera pulls up from the flour mill into the clouds, rotates 45 degrees, and swoops down into the warm dough fermentation vault.`
- `conn_02_to_03.mp4`: **Start Image**: Last frame of `dive_02.mp4` $\to$ **End Image**: First frame of `still_03.png`. Prompt: `Camera flies out of the cellar window across the diorama world, swooping down into the colorful spice bazaar and charcoal grill.`
- `conn_03_to_04.mp4`: **Start Image**: Last frame of `dive_03.mp4` $\to$ **End Image**: First frame of `still_04.png`. Prompt: `Camera glides past the spice bowls, flying up and diving into the glowing stone-deck fire oven.`
- `conn_04_to_05.mp4`: **Start Image**: Last frame of `dive_04.mp4` $\to$ **End Image**: First frame of `still_05.png`. Prompt: `Camera pulls out from the oven chimney into the night sky, flying across town and landing beside the express delivery bike.`
- `conn_05_to_06.mp4`: **Start Image**: Last frame of `dive_05.mp4` $\to$ **End Image**: First frame of `still_06.png`. Prompt: `Camera follows the dispatch bike around the corner, gliding smoothly through the restaurant doorway onto the festive dining table with the giant pizza feast.`
