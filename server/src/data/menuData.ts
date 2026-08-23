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
  // ==================== SIGNATURE PIZZAS ====================
  {
    id: "ny-tikka-blaster",
    name: "NY Tikka Blaster",
    tagline: "Desi spices meet Manhattan's oversized foldable crust.",
    description: "Our signature Pakistani-American fusion: tender charcoal-smoked chicken tikka, sweet red onions, and fresh green bell peppers over rich marinara, smothered with premium whole-milk mozzarella.",
    category: "pizzas",
    image: "/assets/pizzas/tikka_pizza_4k.jpg",
    available: true,
    featured: true,
    badge: "Bestseller",
    spicyLevel: 2,
    sizes: standardPizzaSizes,
    crusts: standardCrusts,
    sauces: standardSauces,
    toppings: standardToppings,
    ingredients: [
      "48-Hour Cold Proof Sourdough Crust",
      "San Marzano Vine Marinara",
      "Whole-Milk Wisconsin Mozzarella",
      "Babool Charcoal-Smoked Chicken Tikka",
      "Caramelized Sweet Red Onions",
      "Crunchy Green Bell Peppers",
      "Roasted Cumin & Paprika Dusting"
    ],
    includesList: [
      "Hand-tossed artisan dough base",
      "Charcoal-smoked desi chicken tikka",
      "Signature herb marinara sauce",
      "Melted whole-milk mozzarella",
      "Crisp onions & bell peppers"
    ]
  },
  {
    id: "manhattan-beef-pepperoni",
    name: "Manhattan Double Pepperoni",
    tagline: "Crisp cupping beef pepperoni baked to sizzling perfection.",
    description: "Loaded generously from edge-to-crust with premium beef pepperoni, roasted garlic oil, and double mozzarella over our slow-simmered vine tomato marinara sauce.",
    category: "pizzas",
    image: "/assets/pizzas/pepperoni_pizza_4k.jpg",
    available: true,
    featured: true,
    badge: "Fan Favorite",
    spicyLevel: 1,
    sizes: standardPizzaSizes,
    crusts: standardCrusts,
    sauces: standardSauces,
    toppings: standardToppings,
    ingredients: [
      "48-Hour Fermented Dough",
      "Slow-Simmered Italian Tomato Marinara",
      "Double Whole-Milk Mozzarella",
      "Cupping Smoked Beef Pepperoni (Edge-to-Edge)",
      "Garlic-Infused Extra Virgin Olive Oil",
      "Crushed Red Pepper & Oregano"
    ],
    includesList: [
      "Edge-to-edge premium beef pepperoni",
      "Double-layer whole milk mozzarella",
      "Slow-simmered vine marinara",
      "Garlic-infused olive oil crust rim"
    ]
  },
  {
    id: "broadway-fajita-supreme",
    name: "Broadway Fajita Supreme",
    tagline: "Zesty Mexican fajita meets Pakistani street heat.",
    description: "Marinated Mexican fajita chicken cubes, sliced black olives, crunchy capsicum, sweet corn, and pickled jalapeños topped with our house peri-peri drizzle.",
    category: "pizzas",
    image: "/assets/pizzas/fajita_pizza_4k.jpg",
    available: true,
    featured: true,
    badge: "Spicy Hit",
    spicyLevel: 3,
    sizes: standardPizzaSizes,
    crusts: standardCrusts,
    sauces: standardSauces,
    toppings: standardToppings,
    ingredients: [
      "High-Hydration Durum Crust",
      "Spicy Peri-Peri Marinara Base",
      "Zesty Marinated Fajita Chicken",
      "Whole-Milk Mozzarella & Cheddar Blend",
      "Spanish Black Olives & Sweet Corn",
      "Pickled Green Jalapeño Slices",
      "Flame-Roasted Peri-Peri Drizzle"
    ],
    includesList: [
      "Spiced Mexican fajita chicken",
      "Sliced black olives & golden sweet corn",
      "Pickled green jalapeños",
      "Fiery peri-peri finishing drizzle"
    ]
  },
  {
    id: "soho-four-cheese-melt",
    name: "SoHo Four Cheese Melt",
    tagline: "Rich, gooey, golden cheese indulgence for true purists.",
    description: "A decadent harmony of Wisconsin whole-milk mozzarella, sharp cheddar, creamy gouda, and freshly grated parmesan, accented with fragrant Italian dried oregano.",
    category: "pizzas",
    image: "/assets/pizzas/four_cheese_pizza_4k.jpg",
    available: true,
    featured: true,
    badge: "Vegetarian",
    spicyLevel: 0,
    sizes: standardPizzaSizes,
    crusts: standardCrusts,
    sauces: standardSauces,
    toppings: standardToppings,
    ingredients: [
      "Artisan Hand-Stretched Dough",
      "San Marzano Herb Tomato Base",
      "Whole-Milk Mozzarella",
      "Sharp Wisconsin Cheddar",
      "Aged Dutch Gouda",
      "Freshly Grated Parmigiano-Reggiano",
      "Wild Italian Mountain Oregano"
    ],
    includesList: [
      "Four premium cheeses (Mozzarella, Cheddar, Gouda, Parmesan)",
      "San Marzano herb marinara sauce",
      "Colossal golden cheese pull stretch",
      "Fragrant oregano & garlic butter brush"
    ]
  },
  {
    id: "brooklyn-bbq-smokehouse",
    name: "Brooklyn BBQ Smokehouse",
    tagline: "Slow-smoked meat with caramelized sweetness and heat.",
    description: "Tender pulled chicken tossed in hickory BBQ sauce, beef chunks, caramelized red onions, and button mushrooms finished with a smoky BBQ spiral.",
    category: "pizzas",
    image: "/assets/pizzas/tikka_pizza_4k.jpg",
    available: true,
    featured: false,
    spicyLevel: 1,
    sizes: standardPizzaSizes,
    crusts: standardCrusts,
    sauces: standardSauces,
    toppings: standardToppings,
    ingredients: [
      "48-Hour Cold Proof Crust",
      "Hickory Smoked BBQ Sauce Base",
      "Smoky Shredded BBQ Chicken",
      "Slow-Roasted Beef Chunks",
      "Sliced Button Mushrooms",
      "Caramelized Red Onions",
      "Whole-Milk Mozzarella Blend"
    ],
    includesList: [
      "Smoky pulled chicken & roasted beef chunks",
      "Hickory BBQ sauce spiral glaze",
      "Fresh button mushrooms & red onions",
      "Bubbling whole-milk mozzarella"
    ]
  },

  // ==================== BUILD YOUR OWN ====================
  {
    id: "build-your-own-pizza",
    name: "Build Your Own Custom Monster",
    tagline: "Total creative freedom from dough to final drizzle.",
    description: "Start with our artisan hand-stretched dough and signature base sauce, then tailor every inch with your favorite crusts, cheeses, meats, and farm-fresh vegetables.",
    category: "build-your-own",
    image: "/assets/pizzas/forge_pizza_4k.jpg",
    available: true,
    featured: true,
    badge: "Custom Crafted",
    spicyLevel: 0,
    sizes: standardPizzaSizes,
    crusts: standardCrusts,
    sauces: standardSauces,
    toppings: standardToppings,
    ingredients: [
      "Freshly Hand-Stretched 48-Hour Fermented Dough",
      "Choice of 5 Signature Deck Sauces",
      "Choice of 4 Artisan Crust Styles",
      "Full Selection of Meats, Cheeses & Farm Vegetables",
      "Oven-Baked on 550°F Volcanic Stone Deck"
    ],
    includesList: [
      "Complete custom size & crust selection",
      "Choice of sauce base & cheese blend",
      "Unlimited customizable topping additions",
      "Baked fresh to order in 550°F hearth"
    ]
  },

  // ==================== DEALS & FEASTS ====================
  {
    id: "deal-monster-squad",
    name: "The 20\" Monster Squad Feast",
    tagline: "Everything you need for the ultimate match night or party.",
    description: "1x Giant 20\" Monster Pizza (any flavor), 1x Loaded Cheesy Garlic Bread, 6x Baked Spicy Wings, and a 1.5L chilled beverage.",
    category: "deals",
    image: "/assets/pizzas/hero_pizza_4k.jpg",
    available: true,
    featured: true,
    badge: "Save PKR 600",
    spicyLevel: 0,
    basePrice: 4299,
    ingredients: [
      "1x Colossal 20-Inch Monster Pizza (12 Foldable Slices)",
      "1x Four-Cheese Pull-Apart Garlic Bread Loaf",
      "6x Flame-Roasted Fiery Peri-Peri Wings with Ranch",
      "1x 1.5 Liter Ice-Cold Party Bottle Beverage"
    ],
    includesList: [
      "1x Giant 20\" Monster Pizza (314 sq inches)",
      "1x Four-Cheese Pull-Apart Garlic Bread",
      "6x Oven-Baked Peri-Peri Wings + Ranch Dip",
      "1x Chilled 1.5L Soft Drink Bottle"
    ]
  },
  {
    id: "deal-duo-delight",
    name: "Duo Feast: 2x 12\" Medium Pizzas",
    tagline: "Double the flavor for family & friends.",
    description: "Any 2 Medium 12\" Pizzas with choice of crust, paired with 2x dipping sauces and 2x 345ml soft drinks.",
    category: "deals",
    image: "/assets/pizzas/forge_pizza_4k.jpg",
    available: true,
    featured: false,
    badge: "Popular Value",
    spicyLevel: 1,
    basePrice: 3199,
    ingredients: [
      "2x 12-Inch Medium Pizzas (8 Slices Each)",
      "Choice of 2 Signature Flavors & Crusts",
      "2x Gourmet Dipping Sauces (Garlic Ranch & BBQ)",
      "2x 345ml Chilled Soft Drink Cans"
    ],
    includesList: [
      "2x 12\" Medium Pizzas of your choice",
      "2x Dipping sauces (Garlic Ranch / Chipotle)",
      "2x 345ml Ice-Cold Soft Drink Cans",
      "Perfect for 2-4 persons"
    ]
  },
  {
    id: "deal-fiery-triple-blaster",
    name: "The Fiery Triple Blaster Combo",
    tagline: "Pakistani street heat for daring spice lovers.",
    description: "1x Large 15\" NY Tikka Blaster Pizza, 6x Fiery Peri-Peri Wings, 1x Loaded Curly Fries, and 2x 345ml Soft Drinks.",
    category: "deals",
    image: "/assets/pizzas/tikka_pizza_4k.jpg",
    available: true,
    featured: true,
    badge: "Spice Drop",
    spicyLevel: 2,
    basePrice: 3899,
    ingredients: [
      "1x Large 15\" NY Tikka Blaster Pizza (10 Slices)",
      "6x Fiery Baked Peri-Peri Wings with Garlic Ranch",
      "1x Large Loaded Curly Fries with Cheddar & Jalapeños",
      "2x 345ml Chilled Soda Cans"
    ],
    includesList: [
      "1x Large 15\" Tikka Blaster Pizza",
      "6x Fiery Peri-Peri Wings with Dip",
      "1x Loaded Cheddar Curly Fries",
      "2x 345ml Soft Drink Cans"
    ]
  },
  {
    id: "deal-inferno-monster-drop",
    name: "The 20\" Inferno Monster Feast",
    tagline: "Ultra-spicy feast for match nights and brave squads.",
    description: "1x 20\" Monster Broadway Fajita Supreme with Peri-Peri Drizzle, 12x Peri-Peri Wings, and 1x 1.5L Chilled Beverage.",
    category: "deals",
    image: "/assets/pizzas/fajita_pizza_4k.jpg",
    available: true,
    featured: false,
    badge: "Fiery Drop",
    spicyLevel: 3,
    basePrice: 4699,
    ingredients: [
      "1x Giant 20\" Monster Broadway Fajita Supreme Pizza",
      "12x Flame-Glazed Fiery Peri-Peri Wings",
      "2x Creamy Buttermilk Garlic Ranch Dips",
      "1x 1.5 Liter Ice-Cold Soft Drink Bottle"
    ],
    includesList: [
      "1x 20\" Monster Fajita Supreme Pizza (12 Slices)",
      "12x Fiery Peri-Peri Chicken Wings",
      "2x Cooling Garlic Ranch Dips",
      "1x 1.5L Party Beverage Bottle"
    ]
  },

  // ==================== SIDES ====================
  {
    id: "side-cheesy-garlic-bread",
    name: "Four-Cheese Pull-Apart Garlic Bread",
    tagline: "Oven-baked baguette brushed with garlic herb butter.",
    description: "Crispy-crusted golden bread stuffed with melted mozzarella, cheddar, and fresh rosemary garlic butter. Served with warm marinara dipping sauce.",
    category: "sides",
    image: "/assets/items/garlic_bread_4k.jpg",
    available: true,
    featured: false,
    spicyLevel: 0,
    basePrice: 499,
    ingredients: [
      "Freshly Baked French Baguette Loaf",
      "Melted Whole-Milk Mozzarella & Cheddar Core",
      "Roasted Garlic & Sea Salt Butter",
      "Fresh Garden Rosemary & Thyme",
      "Side of Warm San Marzano Marinara Dip"
    ],
    includesList: [
      "1x Oven-baked pull-apart garlic loaf",
      "Four-cheese bubbling core",
      "Rosemary garlic herb butter brush",
      "Warm marinara dipping cup"
    ]
  },
  {
    id: "side-peri-peri-wings",
    name: "Fiery Baked Peri-Peri Wings (6 Pcs)",
    tagline: "Juicy, crispy-skinned oven-baked wings with spicy glaze.",
    description: "Tender chicken wings tossed in our signature flame-roasted peri-peri chili glaze, accompanied by cooling garlic ranch dip.",
    category: "sides",
    image: "/assets/items/wings_4k.jpg",
    available: true,
    featured: false,
    spicyLevel: 3,
    basePrice: 649,
    ingredients: [
      "6x Jumbo Oven-Baked Chicken Wings",
      "Flame-Roasted African Bird's Eye Peri-Peri Glaze",
      "Smoked Paprika & Garlic Seasoning",
      "House-Made Buttermilk Garlic Ranch Dip",
      "Crisp Fresh Celery Sticks"
    ],
    includesList: [
      "6x Crispy-skinned oven-baked wings",
      "Signature flame peri-peri glaze",
      "Cooling buttermilk garlic ranch dip",
      "Fresh celery sticks"
    ]
  },
  {
    id: "side-loaded-curly-fries",
    name: "Loaded Golden Curly Fries",
    tagline: "Seasoned spiral cut potatoes with cheese & jalapeños.",
    description: "Crispy seasoned curly fries drizzled with melted cheddar cheese sauce, crushed beef bacon bits, and chopped pickled jalapeños.",
    category: "sides",
    image: "/assets/items/curly_fries_4k.jpg",
    available: true,
    featured: false,
    spicyLevel: 1,
    basePrice: 549,
    ingredients: [
      "Seasoned Spiral-Cut Idaho Potatoes",
      "Warm Melted Aged Cheddar Sauce",
      "Crispy Smoked Beef Bacon Crumbles",
      "Sliced Pickled Green Jalapeños",
      "Cajun Spiced Sea Salt"
    ],
    includesList: [
      "Crispy golden seasoned curly fries",
      "Warm cheddar cheese sauce drizzle",
      "Crushed beef bacon crumbles",
      "Pickled jalapeño slices"
    ]
  },

  // ==================== DRINKS ====================
  {
    id: "drink-soft-drink-1500ml",
    name: "Chilled Soft Drink (1.5L Bottle)",
    tagline: "Ice-cold refreshing fizz.",
    description: "Choice of Coca-Cola, Sprite, or Fanta in a chilled 1.5 Liter party bottle.",
    category: "drinks",
    image: "/assets/items/drink_bottle_4k.jpg",
    available: true,
    featured: false,
    spicyLevel: 0,
    basePrice: 280,
    ingredients: [
      "1.5 Liter Chilled Party Bottle",
      "Choice of Coca-Cola / Sprite / Fanta",
      "Served Ice-Cold at 2°C",
      "Zero Artificial Preservatives"
    ],
    includesList: [
      "1x 1.5L Chilled Soft Drink Bottle",
      "Choice of Coke, Sprite, or Fanta",
      "Serves 4-6 cups",
      "Sealed cold for maximum fizz"
    ]
  },
  {
    id: "drink-soft-drink-can",
    name: "Soft Drink Can (345ml)",
    tagline: "Single serve ice cold can.",
    description: "Chilled 345ml can of Coca-Cola, Coca-Cola Zero, Sprite, or Pakola Cream Soda.",
    category: "drinks",
    image: "/assets/items/drink_can_4k.jpg",
    available: true,
    featured: false,
    spicyLevel: 0,
    basePrice: 150,
    ingredients: [
      "345ml Single-Serve Aluminum Can",
      "Choice of Coca-Cola / Coke Zero / Sprite / Pakola",
      "Chilled to 2°C for instant refreshment",
      "Optimal fizz retention"
    ],
    includesList: [
      "1x 345ml Chilled Soft Drink Can",
      "Choice of flavor on checkout/delivery",
      "Single-serve ice-cold portion"
    ]
  },

  // ==================== DESSERTS ====================
  {
    id: "dessert-molten-lava-cake",
    name: "Belgian Chocolate Molten Lava Cake",
    tagline: "Warm decadent cake with an oozing rich chocolate core.",
    description: "Freshly baked individual chocolate sponge cake with a molten dark Belgian chocolate center. Dusted with powdered icing sugar.",
    category: "desserts",
    image: "/assets/items/lava_cake_4k.jpg",
    available: true,
    featured: false,
    spicyLevel: 0,
    basePrice: 499,
    ingredients: [
      "Pure Belgian Dark Couverture Chocolate (70%)",
      "Freshly Baked Warm Sponge Shell",
      "Decadent Molten Chocolate Lava Core",
      "Confectioner's Powdered Sugar Dusting"
    ],
    includesList: [
      "1x Freshly baked individual molten lava cake",
      "Warm oozing dark chocolate core",
      "Dusted with powdered sugar",
      "Served in thermal protective dessert container"
    ]
  }
];
