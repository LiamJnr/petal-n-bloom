/**
 * Petal & Bloom — Client Reviews Data Store
 * Includes verified customer feedback, star ratings, and storewide reviews.
 */

export const REVIEWS = [
  // 1. Blue White Bouquets
  {
    id: "rev-1",
    productSlug: "blue-white-bouquets",
    productName: "Blue White Bouquets",
    author: "Kristin Watson",
    location: "Downtown Edmonton, AB",
    rating: 5,
    date: "1 month ago",
    verified: true,
    title: "Perfect for Birthdays and Anniversaries!",
    comment: "The hyacinths and crisp white tulips created the most serene, gorgeous arrangement. The fragrance filled our entire home within hours of delivery! Will definitely order again.",
    variant: "Size: Standard • Gingham Wrap",
    helpfulCount: 24
  },
  {
    id: "rev-1b",
    productSlug: "blue-white-bouquets",
    productName: "Blue White Bouquets",
    author: "Claire Beauchamp",
    location: "Oliver, Edmonton",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    title: "Breath of fresh spring air",
    comment: "The royal blue color of the hyacinths is vibrant and rich. The stems were delivered deeply hydrated and lasted over 9 days in our dining room.",
    variant: "Size: Deluxe • Glass Vase",
    helpfulCount: 16
  },

  // 2. Rose Garden
  {
    id: "rev-2a",
    productSlug: "rose-garden",
    productName: "Rose Garden",
    author: "Julien Mercer",
    location: "Garneau, Edmonton",
    rating: 5,
    date: "1 month ago",
    verified: true,
    title: "Classic romance done with absolute perfection",
    comment: "Deep velvety red Ecuadorian garden roses paired with fresh eucalyptus. Not a single bruised petal upon arrival, and they opened up gorgeously.",
    variant: "Size: Deluxe • Taupe Wrap",
    helpfulCount: 19
  },
  {
    id: "rev-2b",
    productSlug: "rose-garden",
    productName: "Rose Garden",
    author: "Elena Rostova",
    location: "Crestwood, Edmonton",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Smells like a real Parisian flower market",
    comment: "The combination of blush spray roses and classic crimson roses is timeless. The letterpress note card was printed with our exact message in crisp typography.",
    variant: "Size: Premium • Glass Vase",
    helpfulCount: 14
  },

  // 3. Casablanca Imperial Lilies
  {
    id: "rev-3a",
    productSlug: "casablanca-lilies",
    productName: "Casablanca Imperial Lilies",
    author: "Eleanor Vance",
    location: "Old Strathcona, Edmonton",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "The sheer scale of these lilies is breathtaking!",
    comment: "Ordered these for our anniversary milestone. The massive pure white petals and intoxicating sweet aroma made this the centerpiece of our celebration.",
    variant: "Size: Deluxe • Glass Vase",
    helpfulCount: 18
  },
  {
    id: "rev-3b",
    productSlug: "casablanca-lilies",
    productName: "Casablanca Imperial Lilies",
    author: "Arthur Pendelton",
    location: "Glenora, Edmonton",
    rating: 5,
    date: "4 weeks ago",
    verified: true,
    title: "Majestic statement piece for our foyer",
    comment: "Each stem had multiple enormous buds that gradually bloomed over two full weeks. Outstanding quality and white-glove delivery.",
    variant: "Size: Premium • Ceramic Pot",
    helpfulCount: 12
  },

  // 4. Royal Phalaenopsis Orchid
  {
    id: "rev-4a",
    productSlug: "royal-orchid",
    productName: "Royal Phalaenopsis Orchid",
    author: "David Sterling",
    location: "Oliver, Edmonton",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    title: "High-end corporate gift that lasts for months",
    comment: "The ceramic planter is heavy and exquisite. The double cascading blooms look like an architectural sculpture in our boardroom. Highly recommended!",
    variant: "Size: Classic Double Stem • Ceramic Pot",
    helpfulCount: 15
  },
  {
    id: "rev-4b",
    productSlug: "royal-orchid",
    productName: "Royal Phalaenopsis Orchid",
    author: "Nadia Kassem",
    location: "Windermere, Edmonton",
    rating: 5,
    date: "1 month ago",
    verified: true,
    title: "Still blooming brilliantly after 6 weeks",
    comment: "Followed the 3 ice cubes weekly care tip and every blossom has stayed immaculate. Truly exceptional botanical quality.",
    variant: "Size: Triple Cascade Stem • Ceramic Pot",
    helpfulCount: 20
  },

  // 5. Hydrangea Cloud Bouquet
  {
    id: "rev-5a",
    productSlug: "hydrangea-cloud",
    productName: "Hydrangea Cloud Bouquet",
    author: "Camilla Moreau",
    location: "Glenora, Edmonton",
    rating: 5,
    date: "1 month ago",
    verified: true,
    title: "The blue and lavender palette is magical",
    comment: "These hydrangea heads were huge and pillowy! Following the florist care tip to mist them kept them looking brand-new for nearly two weeks.",
    variant: "Size: Deluxe • Vellum Wrap",
    helpfulCount: 21
  },
  {
    id: "rev-5b",
    productSlug: "hydrangea-cloud",
    productName: "Hydrangea Cloud Bouquet",
    author: "Liam O'Connor",
    location: "St. Albert, AB",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "So lush and voluminous",
    comment: "Arranged with such fullness and grace. The soft pastels created the most relaxing atmosphere in our living room.",
    variant: "Size: Standard • Glass Vase",
    helpfulCount: 13
  },

  // 6. Golden Sunburst & Dahlias
  {
    id: "rev-6a",
    productSlug: "golden-sunburst",
    productName: "Golden Sunburst & Dahlias",
    author: "Marcus Vance",
    location: "Windermere, Edmonton",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Instant sunshine delivered to a friend!",
    comment: "Sent this to my sister as a get-well gift. The dahlias and mini sunflowers were so cheerful, and the terracotta ribbon was a lovely artisan touch.",
    variant: "Size: Standard • Linen Ribbon",
    helpfulCount: 11
  },
  {
    id: "rev-6b",
    productSlug: "golden-sunburst",
    productName: "Golden Sunburst & Dahlias",
    author: "Beatrice Thorne",
    location: "Sherwood Park, AB",
    rating: 5,
    date: "1 week ago",
    verified: true,
    title: "Warm autumn glow in a vase",
    comment: "The Café au Lait dahlias were huge dinnerplate specimens. Paired with the berries, it felt so rich and celebratory.",
    variant: "Size: Deluxe • Ceramic Pot",
    helpfulCount: 9
  },

  // 7. Meadow Spires & Wild Greens
  {
    id: "rev-7a",
    productSlug: "meadow-spires",
    productName: "Meadow Spires & Wild Greens",
    author: "Sienna Miller",
    location: "St. Albert, AB",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    title: "Felt like a wildflower meadow in the countryside",
    comment: "The tall peach snapdragons and lavender stock gave so much height and natural movement. Very editorial and romantic look.",
    variant: "Size: Deluxe • Sage Ribbon",
    helpfulCount: 13
  },
  {
    id: "rev-7b",
    productSlug: "meadow-spires",
    productName: "Meadow Spires & Wild Greens",
    author: "Julian Cross",
    location: "Rossdale, Edmonton",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Natural organic movement",
    comment: "Not stiff or generic like supermarket flowers—these stems had wonderful dynamic shapes and subtle, sweet wildflower scents.",
    variant: "Size: Standard • Sage Ribbon",
    helpfulCount: 8
  },

  // 8. Pastel Peonies
  {
    id: "rev-8a",
    productSlug: "pastel-peonies",
    productName: "Pastel Peonies",
    author: "Jenny Wilson",
    location: "Sherwood Park, AB",
    rating: 5,
    date: "2 months ago",
    verified: true,
    title: "The Most Stunning Peonies Ever!",
    comment: "Finding real Sarah Bernhardt peonies this fresh is rare. They opened up into huge, fragrant cloud-like blooms that lasted beautifully.",
    variant: "Size: Deluxe • Velvet Ribbon",
    helpfulCount: 32
  },
  {
    id: "rev-8b",
    productSlug: "pastel-peonies",
    productName: "Pastel Peonies",
    author: "Madeline Hayes",
    location: "Riverdale, Edmonton",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    title: "Ruffled perfection for our bridal shower",
    comment: "Arrived in elegant tight buds with hydration packs and opened into massive, multi-layered blush clouds over 48 hours. Everyone asked where they came from!",
    variant: "Size: Premium • Glass Vase",
    helpfulCount: 27
  },

  // 9. Sunday Tulips
  {
    id: "rev-9a",
    productSlug: "sunday-tulips",
    productName: "Sunday Tulips",
    author: "Lucas Bennett",
    location: "Terwillegar, Edmonton",
    rating: 5,
    date: "3 days ago",
    verified: true,
    title: "Vibrant and graceful spring tulips",
    comment: "These Dutch tulips had stunning pastel hues and continued growing and opening toward morning light every day. Effortlessly elegant.",
    variant: "Size: Deluxe • Glass Vase",
    helpfulCount: 19
  },
  {
    id: "rev-9b",
    productSlug: "sunday-tulips",
    productName: "Sunday Tulips",
    author: "Isla MacLeod",
    location: "Laurier Heights, Edmonton",
    rating: 5,
    date: "1 week ago",
    verified: true,
    title: "Crisp and long-lasting",
    comment: "Keeping the water shallow and cold as advised kept the stems tall and perky for over 10 days. The packaging was immaculate.",
    variant: "Size: Standard • Kraft Wrap",
    helpfulCount: 11
  },

  // 10. Sweetheart Bouquet
  {
    id: "rev-10a",
    productSlug: "sweetheart-bouquet",
    productName: "Sweetheart Bouquet",
    author: "Aria Montgomery",
    location: "Rossdale, Edmonton",
    rating: 5,
    date: "5 days ago",
    verified: true,
    title: "Layers upon layers of delicate blush petals",
    comment: "The ranunculus and lisianthus opened up like intricate origami flowers. The letterpress greeting card was a stunning luxury bonus.",
    variant: "Size: Standard • Blush Ribbon",
    helpfulCount: 22
  },
  {
    id: "rev-10b",
    productSlug: "sweetheart-bouquet",
    productName: "Sweetheart Bouquet",
    author: "Dominic Silva",
    location: "Downtown Edmonton, AB",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Delighted my fiancée on her birthday",
    comment: "The soft peach ranunculus and garden spray roses created such a gentle, dreamy aesthetic. Prompt morning delivery with live updates.",
    variant: "Size: Deluxe • Vellum Wrap",
    helpfulCount: 15
  },

  // 11. Petite Wildflower Basket
  {
    id: "rev-11a",
    productSlug: "petite-wildflower-basket",
    productName: "Petite Wildflower Basket",
    author: "Hannah Abbott",
    location: "Riverdale, Edmonton",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Brought so much bright sunshine into my kitchen!",
    comment: "The daisies and chamomile arrived in gorgeous crisp condition. The chamomile has the sweetest subtle apple-honey aroma and the basket is so charming.",
    variant: "Size: Standard • Woven Basket",
    helpfulCount: 14
  },
  {
    id: "rev-11b",
    productSlug: "petite-wildflower-basket",
    productName: "Petite Wildflower Basket",
    author: "Chloe Dubois",
    location: "Laurier Heights, Edmonton",
    rating: 5,
    date: "6 days ago",
    verified: true,
    title: "Adorable ready-to-display gift",
    comment: "Sent this to my mother-in-law. She loved that she didn't need to find a vase—just added water to the center reservoir and it flourished.",
    variant: "Size: Deluxe • Classic Basket",
    helpfulCount: 17
  },

  // 12. Birthday Bloom Box
  {
    id: "rev-12a",
    productSlug: "birthday-bloom-box",
    productName: "Birthday Bloom Box",
    author: "Sophia Chen",
    location: "Crestwood, Edmonton",
    rating: 5,
    date: "1 week ago",
    verified: true,
    title: "The ultimate milestone celebration gift!",
    comment: "The keepsake hat box with the silk ribbon and gold-foil letterpress card made unboxing feel like opening high jewelry. The roses stayed fresh for over a week!",
    variant: "Size: Standard • Keepsake Hat Box",
    helpfulCount: 28
  },
  {
    id: "rev-12b",
    productSlug: "birthday-bloom-box",
    productName: "Birthday Bloom Box",
    author: "Gabriel Ross",
    location: "Summerside, Edmonton",
    rating: 5,
    date: "4 days ago",
    verified: true,
    title: "Dense, lush arrangement with zero hassle",
    comment: "No vase arranging needed. The hydration foam kept the mini hydrangeas and pastel roses in peak condition through the whole birthday week.",
    variant: "Size: Deluxe • Hat Box",
    helpfulCount: 20
  },

  // 13. English Countryside Daisies
  {
    id: "rev-13a",
    productSlug: "english-daisies",
    productName: "English Countryside Daisies",
    author: "Benjamin Hayes",
    location: "Summerside, Edmonton",
    rating: 5,
    date: "1 week ago",
    verified: true,
    title: "Pure, joyful meadow elegance",
    comment: "The Shasta daisies and feverfew sprigs created the brightest, happiest centerpiece for our weekend brunch. Crisp, clean, and beautifully wrapped.",
    variant: "Size: Standard • Yellow Ribbon",
    helpfulCount: 17
  },
  {
    id: "rev-13b",
    productSlug: "english-daisies",
    productName: "English Countryside Daisies",
    author: "Charlotte Sterling",
    location: "Garneau, Edmonton",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Lasted over 12 days in our kitchen",
    comment: "Daisies were harvested at peak freshness. Followed the trim and cold water care instructions and they outlasted any bouquet I've received before.",
    variant: "Size: Deluxe • Glass Vase",
    helpfulCount: 15
  }
];

/**
 * Get reviews filtered by product slug or all
 */
export function getReviewsForProduct(slug = "all") {
  if (!slug || slug === "all") return REVIEWS;
  return REVIEWS.filter(r => r.productSlug === slug);
}

/**
 * Calculate aggregate review metrics
 */
export function getReviewMetrics(slug = "all") {
  const reviews = getReviewsForProduct(slug);
  const count = reviews.length;

  if (count === 0) {
    return {
      average: "4.9",
      count: 245,
      distribution: { 5: 184, 4: 42, 3: 12, 2: 5, 1: 2 }
    };
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const average = (sum / count).toFixed(1);

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    if (distribution[r.rating] !== undefined) {
      distribution[r.rating]++;
    }
  });

  return { average, count, distribution };
}

/**
 * Add a new user review
 */
export function addReview(reviewData) {
  const newReview = {
    id: `rev-${Date.now()}`,
    date: "Just now",
    verified: true,
    helpfulCount: 0,
    ...reviewData
  };
  REVIEWS.unshift(newReview);
  return newReview;
}
