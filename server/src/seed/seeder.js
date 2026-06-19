'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

var mongoose    = require('mongoose');
var MenuItem    = require('../models/MenuItem');
var { Event, Testimonial } = require('../models/misc');
var User        = require('../models/User');

// ── Menu data using uploaded food images (served from /food/*.ext) ────────────
var menuData = [
  // ── STARTERS ────────────────────────────────────────────────────────────────
  {
    name: 'Chicken Tikka',
    category: 'starters',
    price: 18.50,
    description: 'Tender chicken marinated in aromatic spices, grilled in a tandoor oven. Served with mint chutney and sliced onions.',
    image: '/food/chiken-tiika.png',
    badge: 'Chef Special',
    rating: 4.8, reviewCount: 412,
    isVeg: false, isPopular: true, isFeatured: true,
    tags: ['chef-special', 'tandoor', 'spicy'],
    prepTime: 25, sortOrder: 1,
  },  {
    name: 'Avocado Club Sandwich',
    category: 'starters',
    price: 16.00,
    description: 'Triple-decker sandwich with smashed avocado, grilled chicken, crispy bacon, fresh tomato and romaine lettuce.',
    image: '/food/Avocado-Club-Sandwich.png',
    badge: null,
    rating: 4.5, reviewCount: 198,
    isVeg: false, isPopular: false, isFeatured: false,
    tags: ['sandwich', 'brunch'],
    prepTime: 15, sortOrder: 3,
  },
  {
    name: 'Eggs Benedict',
    category: 'starters',
    price: 17.50,
    description: 'Poached eggs on toasted English muffins with Canadian bacon, finished with velvety hollandaise sauce.',
    image: '/food/Eggs-Benedict.png',
    badge: null,
    rating: 4.7, reviewCount: 334,
    isVeg: false, isPopular: true, isFeatured: false,
    tags: ['brunch', 'classic', 'eggs'],
    prepTime: 20, sortOrder: 4,
  },

  // ── MAINS ───────────────────────────────────────────────────────────────────
  {
    name: 'Wagyu Smash Burger',
    category: 'mains',
    price: 32.00,
    description: 'A5 Wagyu beef smash patty with aged cheddar, caramelised onions, pickles and house sauce on a brioche bun.',
    image: '/food/Wagyu-Smash-Burger.png',
    badge: 'Premium',
    rating: 4.9, reviewCount: 521,
    isVeg: false, isPopular: true, isFeatured: true,
    tags: ['premium', 'wagyu', 'burger', 'chef-special'],
    prepTime: 18, sortOrder: 5,
  },
  {
    name: 'Crispy Chicken Burger',
    category: 'mains',
    price: 19.00,
    description: 'Double-fried buttermilk chicken thigh with sriracha mayo, pickled slaw and crunchy pickles.',
    image: '/food/crispy-chiken-burger.png',
    badge: null,
    rating: 4.6, reviewCount: 443,
    isVeg: false, isPopular: true, isFeatured: false,
    tags: ['burger', 'fried', 'spicy'],
    prepTime: 15, sortOrder: 6,
  },
  {
    name: 'Mushroom Swiss Burger',
    category: 'mains',
    price: 22.00,
    description: 'Juicy beef patty topped with sautéed wild mushrooms, Swiss cheese, truffle aioli and fresh arugula.',
    image: '/food/Mushroom-Swiss-Burger.png',
    badge: null,
    rating: 4.7, reviewCount: 267,
    isVeg: false, isPopular: false, isFeatured: true,
    tags: ['burger', 'mushroom', 'truffle'],
    prepTime: 18, sortOrder: 7,
  },
  {
    name: 'Truffle Mac & Cheese',
    category: 'mains',
    price: 24.00,
    description: 'Artisan pasta with a four-cheese sauce, finished with black truffle shavings and toasted breadcrumbs.',
    image: '/food/Truffle-Mac-Cheese.png',
    badge: null,
    rating: 4.8, reviewCount: 389,
    isVeg: true, isPopular: true, isFeatured: true,
    tags: ['pasta', 'truffle', 'vegetarian', 'chef-special'],
    prepTime: 20, sortOrder: 8,
  },
  {
    name: 'Penne Arrabbiata',
    category: 'mains',
    price: 18.50,
    description: 'Penne pasta in a fiery tomato sauce with garlic, crushed red chillies and fresh basil.',
    image: '/food/Penne-Arrabbiata.png',
    badge: null,
    rating: 4.5, reviewCount: 221,
    isVeg: true, isPopular: false, isFeatured: false,
    tags: ['pasta', 'spicy', 'vegetarian'],
    prepTime: 18, sortOrder: 9,
  },  {
    name: 'Fish Roast',
    category: 'mains',
    price: 28.00,
    description: 'Whole fish marinated in coastal spices and slow-roasted until crisp outside, flaky inside. Served with green mango salsa.',
    image: '/food/fishroast.jpg',
    badge: null,
    rating: 4.7, reviewCount: 256,
    isVeg: false, isPopular: false, isFeatured: false,
    tags: ['seafood', 'roasted', 'coastal'],
    prepTime: 30, sortOrder: 12,
  },
  // ── SPECIALS ─────────────────────────────────────────────────────────────────
  {
    name: 'Truffle Margherita',
    category: 'specials',
    price: 28.00, originalPrice: 38.00,
    description: 'Classic Neapolitan base with San Marzano tomatoes, buffalo mozzarella, fresh basil and a finishing drizzle of black truffle oil.',
    image: '/food/Truffle-Margherita.png',
    badge: 'Special',
    rating: 4.9, reviewCount: 687,
    isVeg: true, isPopular: true, isFeatured: true,
    tags: ['special', 'pizza', 'truffle', 'chef-special'],
    prepTime: 20, sortOrder: 14,
  },
  {
    name: 'BBQ Chicken Pizza',
    category: 'specials',
    price: 24.00,
    description: 'Wood-fired pizza with smoky BBQ pulled chicken, caramelised onion, jalapeño and smoked mozzarella.',
    image: '/food/BBQ-Chicken-Pizza.png',
    badge: null,
    rating: 4.7, reviewCount: 445,
    isVeg: false, isPopular: true, isFeatured: false,
    tags: ['pizza', 'bbq', 'chicken'],
    prepTime: 22, sortOrder: 15,
  },
  {
    name: 'Peri Peri Paneer Pizza',
    category: 'specials',
    price: 22.00,
    description: 'Flame-grilled paneer cubes with peri peri sauce, sweet peppers, red onion and cheddar on a thin crust.',
    image: '/food/Peri-Peri-Paneer-Pizza.png',
    badge: 'New',
    rating: 4.6, reviewCount: 234,
    isVeg: true, isPopular: false, isFeatured: false,
    tags: ['pizza', 'vegetarian', 'new', 'spicy'],
    prepTime: 22, sortOrder: 16,
  },
  {
    name: 'Paneer Tikka Platter',
    category: 'specials',
    price: 20.00, originalPrice: 28.00,
    description: 'Marinated cottage cheese cubes chargrilled and served with saffron rice, mint chutney and pickled onions.',
    image: '/food/panner.png',
    badge: 'Special',
    rating: 4.7, reviewCount: 312,
    isVeg: true, isPopular: true, isFeatured: true,
    tags: ['special', 'vegetarian', 'indian', 'chef-special'],
    prepTime: 25, sortOrder: 17,
  },

  // ── DESSERTS ─────────────────────────────────────────────────────────────────
  {
    name: 'Burnt Basque Cheesecake',
    category: 'desserts',
    price: 14.00,
    description: 'Rustic Spanish-style cheesecake with a perfectly caramelised top, creamy centre and a biscuit base.',
    image: '/food/Burnt-Basque-Cheesecake.png',
    badge: null,
    rating: 4.9, reviewCount: 521,
    isVeg: true, isPopular: true, isFeatured: true,
    tags: ['dessert', 'cheesecake', 'bestseller'],
    prepTime: 10, sortOrder: 18,
  },
  {
    name: 'Tiramisu Classico',
    category: 'desserts',
    price: 12.00,
    description: 'Layers of espresso-soaked ladyfingers and mascarpone cream, dusted with Valrhona cocoa.',
    image: '/food/Tiramisu-Classico.webp',
    badge: null,
    rating: 4.8, reviewCount: 478,
    isVeg: true, isPopular: true, isFeatured: false,
    tags: ['dessert', 'italian', 'classic'],
    prepTime: 5, sortOrder: 19,
  },
  {
    name: 'Delicious Pancake Stack',
    category: 'desserts',
    price: 13.50,
    description: 'Fluffy buttermilk pancakes stacked high with maple-glazed berries, whipped cream and a dusting of icing sugar.',
    image: '/food/deliciouspancake.jpg',
    badge: null,
    rating: 4.7, reviewCount: 356,
    isVeg: true, isPopular: false, isFeatured: false,
    tags: ['dessert', 'pancakes', 'brunch'],
    prepTime: 12, sortOrder: 20,
  },

  // ── DRINKS ───────────────────────────────────────────────────────────────────
  {
    name: 'Cappuccino Classico',
    category: 'drinks',
    price: 6.50,
    description: 'A perfect espresso balance: one-third espresso, one-third steamed milk, one-third silky micro-foam.',
    image: '/food/Cappuccino-Classico.png',
    badge: null,
    rating: 4.8, reviewCount: 612,
    isVeg: true, isPopular: true, isFeatured: false,
    tags: ['coffee', 'hot'],
    prepTime: 5, sortOrder: 21,
  },
  {
    name: 'Espresso Royale',
    category: 'drinks',
    price: 5.00,
    description: 'Double-shot espresso from single-origin Yirgacheffe beans with a rich crema.',
    image: '/food/Espresso-Royale.webp',
    badge: null,
    rating: 4.7, reviewCount: 398,
    isVeg: true, isPopular: false, isFeatured: false,
    tags: ['coffee', 'espresso', 'hot'],
    prepTime: 3, sortOrder: 22,
  },
  {
    name: 'Caramel Cloud Latte',
    category: 'drinks',
    price: 7.50,
    description: 'Velvety latte crowned with a cloud of whipped cream and drizzled with house-made salted caramel.',
    image: '/food/Caramel-Cloud-Latte.webp',
    badge: 'New',
    rating: 4.8, reviewCount: 287,
    isVeg: true, isPopular: false, isFeatured: true,
    tags: ['coffee', 'hot', 'new', 'sweet'],
    prepTime: 5, sortOrder: 23,
  },
  {
    name: 'Matcha Ceremonial',
    category: 'drinks',
    price: 8.00,
    description: 'Ceremonial-grade Japanese matcha whisked with steamed oat milk. Earthy, creamy, subtly sweet.',
    image: '/food/Matcha-Ceremonial.png',
    badge: null,
    rating: 4.6, reviewCount: 223,
    isVeg: true, isPopular: false, isFeatured: false,
    tags: ['matcha', 'hot', 'healthy'],
    prepTime: 5, sortOrder: 24,
  },
  {
    name: 'Flat White',
    category: 'drinks',
    price: 6.00,
    description: 'A ristretto-based flat white with velvety steamed whole milk. Bold, rich and smooth.',
    image: '/food/Flat-White.png',
    badge: null,
    rating: 4.7, reviewCount: 445,
    isVeg: true, isPopular: false, isFeatured: false,
    tags: ['coffee', 'hot'],
    prepTime: 4, sortOrder: 25,
  },
  {
    name: 'Earl Grey Supreme',
    category: 'drinks',
    price: 5.50,
    description: 'First-flush Darjeeling blended with bergamot and blue cornflowers. Served in a cast-iron pot.',
    image: '/food/Earl-Grey-Supreme.png',
    badge: null,
    rating: 4.5, reviewCount: 178,
    isVeg: true, isPopular: false, isFeatured: false,
    tags: ['tea', 'hot'],
    prepTime: 4, sortOrder: 26,
  },
  {
    name: 'Masala Chai',
    category: 'drinks',
    price: 5.00,
    description: 'Aromatic blend of Assam tea with ginger, cardamom, cinnamon and cloves. Simmered low and slow.',
    image: '/food/Masala-Chai.png',
    badge: null,
    rating: 4.8, reviewCount: 534,
    isVeg: true, isPopular: true, isFeatured: false,
    tags: ['tea', 'hot', 'indian', 'spiced'],
    prepTime: 8, sortOrder: 27,
  },
  {
    name: 'Mango Sunrise Smoothie',
    category: 'drinks',
    price: 9.00,
    description: 'Fresh Alphonso mango, coconut cream, pineapple and a hint of lime. Tropical and refreshing.',
    image: '/food/Mango-Sunrise-Smoothie.png',
    badge: null,
    rating: 4.7, reviewCount: 312,
    isVeg: true, isPopular: false, isFeatured: false,
    tags: ['smoothie', 'cold', 'tropical'],
    prepTime: 5, sortOrder: 28,
  },
  {
    name: 'Cold Brew Lemonade',
    category: 'drinks',
    price: 7.50,
    description: '24-hour cold brew coffee swirled with fresh-squeezed lemonade and mint.',
    image: '/food/Cold-Brew-Lemonade.png',
    badge: null,
    rating: 4.6, reviewCount: 198,
    isVeg: true, isPopular: false, isFeatured: false,
    tags: ['cold', 'coffee', 'lemon'],
    prepTime: 3, sortOrder: 29,
  },
  {
    name: 'Cold Brew Float',
    category: 'drinks',
    price: 9.00,
    description: 'Our signature cold brew poured over a scoop of Madagascar vanilla ice cream.',
    image: '/food/Cold-Brew-Float.jpg',
    badge: null,
    rating: 4.8, reviewCount: 267,
    isVeg: true, isPopular: false, isFeatured: false,
    tags: ['cold', 'coffee', 'dessert-drink'],
    prepTime: 4, sortOrder: 30,
  },
  {
    name: 'Signature Cocktail',
    category: 'drinks',
    price: 16.00,
    description: "Grilli's house cocktail: aged gin, elderflower liqueur, cucumber and tonic, garnished with edible flowers.",
    image: '/food/cocktail.jpg',
    badge: 'Signature',
    rating: 4.9, reviewCount: 389,
    isVeg: true, isPopular: true, isFeatured: true,
    tags: ['cocktail', 'alcohol', 'signature', 'chef-special'],
    prepTime: 5, sortOrder: 31,
  },

  // ── BRUNCH ───────────────────────────────────────────────────────────────────
  {
    name: 'Café Breakfast Platter',
    category: 'brunch',
    price: 22.00,
    description: 'The full works: two eggs your way, back bacon, sausage, baked beans, sourdough toast and roasted tomato.',
    image: '/food/Caf--Breakfast-Platter.png',
    badge: null,
    rating: 4.7, reviewCount: 412,
    isVeg: false, isPopular: true, isFeatured: true,
    tags: ['brunch', 'breakfast', 'full'],
    prepTime: 20, sortOrder: 32,
  },

  // Generic menu images as atmospheric sides/sharing plates
  {
    name: 'Sharing Charcuterie',
    category: 'starters',
    price: 28.00,
    description: 'A curated board of cured meats, aged cheeses, seasonal fruits, house pickles and artisan crackers.',
    image: '/food/food-menu-1.png',
    badge: null,
    rating: 4.8, reviewCount: 334,
    isVeg: false, isPopular: true, isFeatured: false,
    tags: ['sharing', 'cheese', 'premium'],
    prepTime: 10, sortOrder: 33,
  },
  {
    name: 'Seasonal Garden Salad',
    category: 'starters',
    price: 14.00,
    description: 'Market-fresh greens, heirloom tomatoes, cucumber ribbons, toasted seeds and a lemon-herb vinaigrette.',
    image: '/food/food-menu-2.png',
    badge: null,
    rating: 4.5, reviewCount: 187,
    isVeg: true, isPopular: false, isFeatured: false,
    tags: ['salad', 'vegetarian', 'healthy', 'seasonal'],
    prepTime: 10, sortOrder: 34,
  },
  {
    name: "Chef's Tasting Plate",
    category: 'specials',
    price: 45.00, originalPrice: 58.00,
    description: 'A rotating selection of five small plates chosen daily by our head chef. A true surprise tasting experience.',
    image: '/food/food-menu-3.png',
    badge: 'Special',
    rating: 4.9, reviewCount: 156,
    isVeg: false, isPopular: false, isFeatured: true,
    tags: ['special', 'tasting', 'chef-special', 'premium'],
    prepTime: 35, sortOrder: 35,
  },
  {
    name: 'Grilled Sea Bass',
    category: 'mains',
    price: 38.00,
    description: 'Line-caught sea bass with lemon butter, capers, fine herbs and beurre blanc. Served with pommes purée.',
    image: '/food/food-menu-4.png',
    badge: null,
    rating: 4.8, reviewCount: 223,
    isVeg: false, isPopular: false, isFeatured: false,
    tags: ['seafood', 'fine-dining', 'premium'],
    prepTime: 28, sortOrder: 36,
  },
  {
    name: 'Spiced Lamb Rack',
    category: 'mains',
    price: 48.00,
    description: 'French-trimmed lamb rack with a pistachio-herb crust, fondant potato, wilted spinach and redcurrant jus.',
    image: '/food/food-menu-5.png',
    badge: 'Premium',
    rating: 4.9, reviewCount: 198,
    isVeg: false, isPopular: false, isFeatured: true,
    tags: ['premium', 'lamb', 'fine-dining', 'chef-special'],
    prepTime: 35, sortOrder: 37,
  },
];

var eventsData = [
  {
    title: "Flavour so good you'll try to eat with your eyes.",
    category: 'Food, Flavour',
    date: '2025-09-15',
    description: 'An evening celebrating bold flavours and vibrant presentation from our head chef. Six courses, each a work of art.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&h=800&fit=crop',
    isActive: true,
  },
  {
    title: 'The art of healthy cooking with seasonal ingredients.',
    category: 'Healthy Food',
    date: '2025-09-08',
    description: 'A masterclass in farm-to-table cooking featuring locally sourced produce and zero-waste techniques.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&h=800&fit=crop',
    isActive: true,
  },
  {
    title: 'Wine pairing dinner with award-winning sommelier.',
    category: 'Recipe',
    date: '2025-09-03',
    description: 'An intimate evening pairing fine wines with our tasting menu, hosted by our award-winning sommelier.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&h=800&fit=crop',
    isActive: true,
  },
];

var testimonialsData = [
  {
    name: 'Sam Johnson',
    role: 'Food Critic',
    avatar: 'https://i.pravatar.cc/100?img=11',
    text: "I wanted to thank you for inviting me down for that amazing dinner. The food was extraordinary — every dish told a story, and the atmosphere was simply unforgettable.",
    rating: 5, sortOrder: 1,
  },
  {
    name: 'Elena Marchetti',
    role: 'Regular Guest',
    avatar: 'https://i.pravatar.cc/100?img=47',
    text: "Grilli has redefined fine dining for me. The Truffle Margherita is a masterpiece and the service is second to none. I bring every important guest here.",
    rating: 5, sortOrder: 2,
  },
  {
    name: 'James Whitfield',
    role: 'Travel Blogger',
    avatar: 'https://i.pravatar.cc/100?img=33',
    text: 'Of all the restaurants I have visited across Europe, Grilli stands out as a place where passion for food truly shines through in every bite.',
    rating: 5, sortOrder: 3,
  },
];

async function seed() {
  var uri = (process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/grilli').replace('localhost', '127.0.0.1');
  await mongoose.connect(uri, { family: 4 });
  console.log('[Seed] Connected to MongoDB');

  await Promise.all([
    MenuItem.deleteMany({}),
    Event.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);

  await MenuItem.insertMany(menuData);
  console.log('[Seed] Menu items seeded:', menuData.length);

  await Event.insertMany(eventsData);
  console.log('[Seed] Events seeded:', eventsData.length);

  await Testimonial.insertMany(testimonialsData);
  console.log('[Seed] Testimonials seeded:', testimonialsData.length);

  // Admin user
  var adminExists = await User.findOne({ email: 'admin@grilli.com' });
  if (!adminExists) {
    await User.create({ name: 'Admin', email: 'admin@grilli.com', password: 'admin123', role: 'admin' });
    console.log('[Seed] Admin created: admin@grilli.com / admin123');
  } else {
    console.log('[Seed] Admin already exists');
  }

  console.log('\n[Seed] ✅ Done! Run: npm run dev\n');
  process.exit(0);
}

seed().catch(function(e) {
  console.error('[Seed Error]', e.message);
  process.exit(1);
});
