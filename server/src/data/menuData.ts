import { MenuItem, PizzaSize, SauceOption, ToppingOption } from "../types";

export const standardPizzaSizes: PizzaSize[] = [
  { id: "10", name: "Regular 10\"", inches: 10, slices: 6, serves: "1-2 Persons", price: 1199 },
  { id: "12", name: "Medium 12\"", inches: 12, slices: 8, serves: "2-3 Persons", price: 1699 },
  { id: "15", name: "Large 15\"", inches: 15, slices: 10, serves: "3-4 Persons", price: 2299 },
  { id: "20", name: "Monster 20\" (The 14th St Classic)", inches: 20, slices: 12, serves: "5-6 Persons", price: 3399 }
];

export const standardCrusts: string[] = [
  "Original Pan Crust",
  "Crispy Thin Crust",
  "Cheesy Stuffed Crust",
  "Garlic Butter Herb Crust"
];

export const standardSauces: SauceOption[] = [
  { id: "marinara", name: "Signature New York Marinara", spicyLevel: 0, price: 0 },
  { id: "spicy-peri", name: "Fiery Peri-Peri Fusion", spicyLevel: 2, price: 0 },
  { id: "garlic-ranch", name: "Creamy Garlic & Herb Mayo", spicyLevel: 0, price: 0 },
  { id: "smoky-bbq", name: "Rich Hickory BBQ", spicyLevel: 1, price: 0 },
  { id: "chipotle-zing", name: "Chipotle Fire Sauce", spicyLevel: 3, price: 50 }
];

export const standardToppings: ToppingOption[] = [
  // Meats
  { id: "chicken-tikka", name: "Smoky Chicken Tikka", category: "meat", price: 180 },
  { id: "smoked-pepperoni", name: "Crispy Beef Pepperoni", category: "meat", price: 220 },
  { id: "fajita-chicken", name: "Spiced Fajita Chicken", category: "meat", price: 180 },
  { id: "roasted-beef", name: "Slow-Roasted Beef Chunks", category: "meat", price: 250 },
  { id: "spicy-sausage", name: "Italian Spicy Sausage", category: "meat", price: 200 },
  // Cheese
  { id: "extra-mozzarella", name: "Extra Melted Mozzarella", category: "cheese", price: 160 },
  { id: "cheddar-blend", name: "Sharp Cheddar Blend", category: "cheese", price: 180 },
  { id: "parmesan-dust", name: "Aged Parmesan Dusting", category: "cheese", price: 120 },
  // Veggies
  { id: "fresh-mushrooms", name: "Sliced Button Mushrooms", category: "veggie", price: 120 },
  { id: "black-olives", name: "Sliced Spanish Black Olives", category: "veggie", price: 100 },
  { id: "jalapenos", name: "Pickled Green Jalapeños", category: "veggie", price: 90 },
  { id: "bell-peppers", name: "Crunchy Tricolor Bell Peppers", category: "veggie", price: 80 },
  { id: "caramelized-onions", name: "Sweet Red Onions", category: "veggie", price: 70 },
  { id: "sweet-corn", name: "Golden Sweet Corn", category: "veggie", price: 80 }
];

export const seedMenu: MenuItem[] = [
  // ==================== PIZZAS ====================
  {
    id: "ny-tikka-blaster",
    name: "New York Tikka Blaster",
    tagline: "Desi spices meet Manhattan's oversized foldable crust.",
    description: "Our signature Pakistani-American fusion: tender charcoal-smoked chicken tikka, sweet red onions, and fresh green bell peppers over rich marinara, smothered with premium whole-milk mozzarella.",
    category: "pizzas",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    badge: "Bestseller",
    spicyLevel: 2,
    sizes: standardPizzaSizes,
    crusts: standardCrusts,
    sauces: standardSauces,
    toppings: standardToppings
  },
  {
    id: "manhattan-beef-pepperoni",
    name: "Manhattan Double Pepperoni",
    tagline: "Crisp cupping beef pepperoni baked to sizzling perfection.",
    description: "Loaded generously from edge-to-crust with premium beef pepperoni, roasted garlic oil, and double mozzarella over our slow-simmered vine tomato marinara sauce.",
    category: "pizzas",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    badge: "Fan Favorite",
    spicyLevel: 1,
    sizes: standardPizzaSizes,
    crusts: standardCrusts,
    sauces: standardSauces,
    toppings: standardToppings
  },
  {
    id: "broadway-fajita-supreme",
    name: "Broadway Fajita Supreme",
    tagline: "Zesty Mexican fajita meets Pakistani street heat.",
    description: "Marinated Mexican fajita chicken cubes, sliced black olives, crunchy capsicum, sweet corn, and pickled jalapeños topped with our house peri-peri drizzle.",
    category: "pizzas",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    badge: "Spicy Hit",
    spicyLevel: 3,
    sizes: standardPizzaSizes,
    crusts: standardCrusts,
    sauces: standardSauces,
    toppings: standardToppings
  },
  {
    id: "soho-four-cheese-melt",
    name: "SoHo Four Cheese Melt",
    tagline: "Rich, gooey, golden cheese indulgence for true purists.",
    description: "A decadent harmony of Wisconsin whole-milk mozzarella, sharp cheddar, creamy gouda, and freshly grated parmesan, accented with fragrant Italian dried oregano.",
    category: "pizzas",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    badge: "Vegetarian",
    spicyLevel: 0,
    sizes: standardPizzaSizes,
    crusts: standardCrusts,
    sauces: standardSauces,
    toppings: standardToppings
  },
  {
    id: "brooklyn-bbq-smokehouse",
    name: "Brooklyn BBQ Smokehouse",
    tagline: "Slow-smoked meat with caramelized sweetness and heat.",
    description: "Tender pulled chicken tossed in hickory BBQ sauce, beef chunks, caramelized red onions, and button mushrooms finished with a smoky BBQ spiral.",
    category: "pizzas",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    spicyLevel: 1,
    sizes: standardPizzaSizes,
    crusts: standardCrusts,
    sauces: standardSauces,
    toppings: standardToppings
  },

  // ==================== BUILD YOUR OWN ====================
  {
    id: "build-your-own-pizza",
    name: "Build Your Own Custom Monster",
    tagline: "Total creative freedom from dough to final drizzle.",
    description: "Start with our artisan hand-stretched dough and signature base sauce, then tailor every inch with your favorite crusts, cheeses, meats, and farm-fresh vegetables.",
    category: "build-your-own",
    image: "https://images.unsplash.com/photo-1594007654729-407aac9a2964?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    badge: "Custom Crafted",
    spicyLevel: 0,
    sizes: standardPizzaSizes,
    crusts: standardCrusts,
    sauces: standardSauces,
    toppings: standardToppings
  },

  // ==================== DEALS ====================
  {
    id: "deal-monster-squad",
    name: "The 20\" Monster Squad Feast",
    tagline: "Everything you need for the ultimate match night or party.",
    description: "1x Giant 20\" Monster Pizza (any flavor), 1x Loaded Cheesy Garlic Bread, 6x Baked Spicy Wings, and a 1.5L chilled beverage.",
    category: "deals",
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: true,
    badge: "Save PKR 600",
    basePrice: 4299
  },
  {
    id: "deal-duo-delight",
    name: "Duo Feast: 2x 12\" Medium Pizzas",
    tagline: "Double the flavor for family & friends.",
    description: "Any 2 Medium 12\" Pizzas with choice of crust, paired with 2x dipping sauces and 2x 345ml soft drinks.",
    category: "deals",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    badge: "Popular Value",
    basePrice: 3199
  },

  // ==================== SIDES ====================
  {
    id: "side-cheesy-garlic-bread",
    name: "Four-Cheese Pull-Apart Garlic Bread",
    tagline: "Oven-baked baguette brushed with garlic herb butter.",
    description: "Crispy-crusted golden bread stuffed with melted mozzarella, cheddar, and fresh rosemary garlic butter. Served with warm marinara dipping sauce.",
    category: "sides",
    image: "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    basePrice: 499
  },
  {
    id: "side-peri-peri-wings",
    name: "Fiery Baked Peri-Peri Wings (6 Pcs)",
    tagline: "Juicy, crispy-skinned oven-baked wings with spicy glaze.",
    description: "Tender chicken wings tossed in our signature flame-roasted peri-peri chili glaze, accompanied by cooling garlic ranch dip.",
    category: "sides",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    spicyLevel: 3,
    basePrice: 649
  },
  {
    id: "side-loaded-curly-fries",
    name: "Loaded Golden Curly Fries",
    tagline: "Seasoned spiral cut potatoes with cheese & jalapeños.",
    description: "Crispy seasoned curly fries drizzled with melted cheddar cheese sauce, crushed beef bacon bits, and chopped pickled jalapeños.",
    category: "sides",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    basePrice: 549
  },

  // ==================== DRINKS ====================
  {
    id: "drink-soft-drink-1500ml",
    name: "Chilled Soft Drink (1.5L Bottle)",
    tagline: "Ice-cold refreshing fizz.",
    description: "Choice of Coca-Cola, Sprite, or Fanta in a chilled 1.5 Liter party bottle.",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    basePrice: 280
  },
  {
    id: "drink-soft-drink-can",
    name: "Soft Drink Can (345ml)",
    tagline: "Single serve ice cold can.",
    description: "Chilled 345ml can of Coca-Cola, Coca-Cola Zero, Sprite, or Pakola Cream Soda.",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    basePrice: 150
  },

  // ==================== DESSERTS ====================
  {
    id: "dessert-molten-lava-cake",
    name: "Belgian Chocolate Molten Lava Cake",
    tagline: "Warm decadent cake with an oozing rich chocolate core.",
    description: "Freshly baked individual chocolate sponge cake with a molten dark Belgian chocolate center. Dusted with powdered icing sugar.",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    available: true,
    featured: false,
    basePrice: 499
  }
];
