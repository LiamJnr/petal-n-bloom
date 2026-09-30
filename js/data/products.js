/**
 * Petal & Bloom — Product Catalog Data Store
 * Comprehensive luxury collection balancing focal staples, voluminous mass, statement luxury, and textural fillers.
 */

export const PRODUCTS = [
  {
    id: "blue-white-bouquets",
    slug: "blue-white-bouquets",
    name: "Blue White Bouquets",
    subtitle: "Serene Hyacinths & Spring White Tulips",
    category: "bouquet",
    occasion: "Birthday & Anniversaries",
    tag: "Bestseller",
    featured: true,
    rating: 4.9,
    reviewCount: 245,
    images: {
      primary: "images/hyacinth.webp",
      gallery: [
        "images/hyacinth.webp",
        "images/hyacinth-1.webp",
        "images/hyacinth-2.webp"
      ]
    },
    shortDescription: "A serene harmony of fragrant royal blue hyacinths and crisp white Dutch tulips, tied with signature gingham ribbon.",
    description: "Our signature Blue White Bouquet captures the crisp elegance of spring botanical gardens. Hand-tied with sweet-scented blue hyacinths, pure white Dutch tulips, and silver dollar eucalyptus, this arrangement brings calming sophistication and gentle fragrance to any room.",
    stems: [
      { name: "Royal Blue Hyacinths", count: 10 },
      { name: "Crisp White Dutch Tulips", count: 12 },
      { name: "Silver Dollar Eucalyptus", count: 5 }
    ],
    careGuide: [
      "Trim stems at a 45-degree angle under cool running water before placing in a clean vase.",
      "Hyacinths and tulips drink lots of water; refresh with cold water daily.",
      "Keep away from direct sunlight, drafts, and ripening fruit to maximize bloom lifespan."
    ],
    sizes: [
      { id: "standard", name: "Standard", stems: "18-20 stems", price: 65, default: true },
      { id: "deluxe", name: "Deluxe", stems: "28-30 stems", price: 85, default: false },
      { id: "premium", name: "Premium", stems: "40-42 stems", price: 125, default: false }
    ],
    vases: [
      { id: "none", name: "Gingham Check Wrap", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "rose-garden",
    slug: "rose-garden",
    name: "Rose Garden",
    subtitle: "Timeless Crimson & Velvet Garden Roses",
    category: "bouquet",
    occasion: "Romantic",
    tag: "Classic Romance",
    featured: true,
    rating: 4.9,
    reviewCount: 88,
    images: {
      primary: "images/roses.webp",
      gallery: [
        "images/roses.webp",
        "images/roses-1.webp",
        "images/roses-2.webp"
      ]
    },
    shortDescription: "A timeless arrangement of velvety Ecuadorian red roses and delicate blush garden spray roses.",
    description: "Our signature Rose Garden bouquet brings classic romance into modern floristry. Curated with premium garden roses, blush spray roses, and seeded eucalyptus, each stem is selected at peak bud to guarantee over a week of breathtaking elegance in your home.",
    stems: [
      { name: "Premium Ecuadorian Red Roses", count: 12 },
      { name: "Blush Garden Spray Roses", count: 6 },
      { name: "Seeded Eucalyptus", count: 4 },
      { name: "White Waxflower Accents", count: 3 }
    ],
    careGuide: [
      "Trim stems at a 45-degree angle under cool running water before placing in vase.",
      "Replace vase water every 2 days with cold, fresh water and flower food.",
      "Remove any guard petals gently for full opening."
    ],
    sizes: [
      { id: "standard", name: "Standard", stems: "18-20 stems", price: 72, default: true },
      { id: "deluxe", name: "Deluxe", stems: "28-30 stems", price: 98, default: false },
      { id: "premium", name: "Premium", stems: "40-42 stems", price: 139, default: false }
    ],
    vases: [
      { id: "none", name: "Luxury Matte Taupe Wrap", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "casablanca-lilies",
    slug: "casablanca-lilies",
    name: "Casablanca Imperial Lilies",
    subtitle: "Grand White Oriental Lilies & Italian Ruscus",
    category: "luxury",
    occasion: "Celebrations",
    tag: "Statement Scale",
    featured: true,
    rating: 5.0,
    reviewCount: 64,
    images: {
      primary: "images/lilies.webp",
      gallery: [
        "images/lilies.webp",
        "images/lilies-1.webp",
        "images/lilies-2.webp"
      ]
    },
    shortDescription: "Dramatic, intoxicatingly fragrant pure white Oriental lilies paired with emerald Italian ruscus.",
    description: "An awe-inspiring statement of pure elegance. Casablanca lilies are renowned for their dramatic scale, sculptural star-shaped petals, and intoxicating sweet perfume. Hand-arranged with Italian ruscus and silver dollar eucalyptus in a champagne silk ribbon wrap.",
    stems: [
      { name: "Grand Casablanca Oriental Lilies", count: 8 },
      { name: "Italian Ruscus Spires", count: 6 },
      { name: "Silver Dollar Eucalyptus", count: 4 }
    ],
    careGuide: [
      "Gently remove pollen anthers as blooms open to prevent petal staining.",
      "Recut 1 inch off bottom of stems every 3 days in cold fresh water.",
      "Keep in a cool room away from direct heaters and air conditioning."
    ],
    sizes: [
      { id: "standard", name: "Standard", stems: "16-18 blooms", price: 95, default: true },
      { id: "deluxe", name: "Deluxe", stems: "24-26 blooms", price: 125, default: false },
      { id: "premium", name: "Premium", stems: "34-36 blooms", price: 175, default: false }
    ],
    vases: [
      { id: "none", name: "Beige Kraft Wrap & Silk Ribbon", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "royal-orchid",
    slug: "royal-orchid",
    name: "Royal Phalaenopsis Orchid",
    subtitle: "Double-Stem Cascading White Orchid Plant",
    category: "luxury",
    occasion: "Milestones & Corporate",
    tag: "Luxury Potted",
    rating: 4.9,
    reviewCount: 52,
    images: {
      primary: "images/orchids.webp",
      gallery: [
        "images/orchids.webp",
        "images/orchids-1.webp",
        "images/orchids-2.webp"
      ]
    },
    shortDescription: "A living sculptural masterpiece featuring two cascading stems of moth orchids in a fluted ceramic vessel.",
    description: "The epitome of architectural luxury and longevity. Our Royal Phalaenopsis Orchid arrives potted in an artisan matte cream fluted ceramic container with preserved forest moss. With proper care, these majestic blooms remain in vibrant flower for 2 to 3 months.",
    stems: [
      { name: "Cascading White Orchid Stems", count: 2 },
      { name: "Preserved Forest Moss Layer", count: 1 },
      { name: "Artisan Ceramic Pot", count: 1 }
    ],
    careGuide: [
      "Place in bright, indirect sunlight; avoid direct midday heat.",
      "Water with 3 ice cubes or 1/4 cup of room-temperature water once weekly.",
      "Allow soil mix to dry slightly between waterings; avoid standing water in saucer."
    ],
    sizes: [
      { id: "standard", name: "Classic Double Stem", stems: "12-14 blooms", price: 110, default: true },
      { id: "deluxe", name: "Triple Cascade Stem", stems: "18-20 blooms", price: 145, default: false },
      { id: "premium", name: "Grand Quadruple Stem", stems: "26-28 blooms", price: 195, default: false }
    ],
    vases: [
      { id: "ceramic", name: "Artisan Matte Cream Ceramic Pot (Included)", price: 0 },
      { id: "gold", name: "Hand-Hammered Brass Planter", price: 25 }
    ]
  },
  {
    id: "hydrangea-cloud",
    slug: "hydrangea-cloud",
    name: "Hydrangea Cloud Bouquet",
    subtitle: "Powder Blue & Vintage Lavender Hydrangeas",
    category: "bouquet",
    occasion: "Housewarming & Everyday",
    tag: "Voluminous Mass",
    rating: 4.8,
    reviewCount: 110,
    images: {
      primary: "images/hydrangea.webp",
      gallery: [
        "images/hydrangea.webp",
        "images/hydrangea-1.webp",
        "images/hydrangea-2.webp"
      ]
    },
    shortDescription: "Lush, pillowy cloud-like hydrangeas in pastel blue and lavender nestled with blush spray roses.",
    description: "An opulent, rounded centerpiece arrangement boasting voluminous heads of Dutch hydrangeas in soft periwinkle blue and smoky lavender. Accented with ruffled white lisianthus and seeded eucalyptus, this bouquet fills rooms with effortless botanical grandeur.",
    stems: [
      { name: "Large Powder Blue Hydrangeas", count: 4 },
      { name: "Vintage Lavender Hydrangeas", count: 3 },
      { name: "Blush Spray Roses", count: 6 },
      { name: "White Lisianthus Stems", count: 4 }
    ],
    careGuide: [
      "Hydrangeas love water: submerge stems deep in a clean, full vase of cold water.",
      "If a head wilts, submerge the entire bloom head in cool water for 20 minutes to revive.",
      "Mist petals lightly with fresh water every morning."
    ],
    sizes: [
      { id: "standard", name: "Standard", stems: "16-18 stems", price: 78, default: true },
      { id: "deluxe", name: "Deluxe", stems: "24-26 stems", price: 105, default: false },
      { id: "premium", name: "Premium", stems: "34-36 stems", price: 149, default: false }
    ],
    vases: [
      { id: "none", name: "Vellum Wrap & Lavender Ribbon", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "golden-sunburst",
    slug: "golden-sunburst",
    name: "Golden Sunburst & Dahlias",
    subtitle: "Mini Sunflowers & Café au Lait Dahlias",
    category: "celebration",
    occasion: "Get Well & Cheer",
    tag: "Seasonal Warmth",
    rating: 4.9,
    reviewCount: 76,
    images: {
      primary: "images/sunburst.webp",
      gallery: [
        "images/sunburst.webp",
        "images/sunburst-1.webp",
        "images/sunburst-2.webp"
      ]
    },
    shortDescription: "Joyful golden mini sunflowers, creamy Café au Lait dahlias, and vibrant red hypericum berries.",
    description: "An instant mood-lifter crafted to celebrate milestones, express gratitude, or deliver golden cheer. Featuring velvety brown-eyed sunflowers, dinner-plate Café au Lait dahlias, apricot garden roses, and clusters of polished hypericum berries.",
    stems: [
      { name: "Golden Mini Sunflowers", count: 6 },
      { name: "Café au Lait Dahlias", count: 4 },
      { name: "Apricot Garden Roses", count: 4 },
      { name: "Red Hypericum Berries", count: 5 }
    ],
    careGuide: [
      "Trim stems at an angle and remove any leaves below the waterline.",
      "Sunflowers are thirsty stems: check and refill water daily.",
      "Display in moderate temperatures to preserve dahlia petal firmness."
    ],
    sizes: [
      { id: "standard", name: "Standard", stems: "18-20 stems", price: 72, default: true },
      { id: "deluxe", name: "Deluxe", stems: "26-28 stems", price: 95, default: false },
      { id: "premium", name: "Premium", stems: "38-40 stems", price: 135, default: false }
    ],
    vases: [
      { id: "none", name: "Terracotta Linen Ribbon Wrap", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "meadow-spires",
    slug: "meadow-spires",
    name: "Meadow Spires & Wild Greens",
    subtitle: "Peach Snapdragons & Lavender Stock Spires",
    category: "bouquet",
    occasion: "Everyday",
    tag: "Textural Line",
    rating: 4.8,
    reviewCount: 43,
    images: {
      primary: "images/spires.webp",
      gallery: [
        "images/spires.webp",
        "images/spires-1.webp",
        "images/spires-2.webp"
      ]
    },
    shortDescription: "A tall, airy editorial arrangement of pastel snapdragons, sweet Matthiola stock, and layered eucalyptus.",
    description: "Designed with botanical movement and vertical depth. Tall, graceful peach snapdragons combine with honey-scented lavender stock, ruffled white ranunculus, and wisps of green bell thlaspi for an organic meadow silhouette.",
    stems: [
      { name: "Peach Snapdragon Spires", count: 6 },
      { name: "Lavender Matthiola Stock", count: 6 },
      { name: "White Ranunculus", count: 4 },
      { name: "Silver Dollar & Seeded Eucalyptus", count: 5 }
    ],
    careGuide: [
      "Snapdragons naturally reach toward the light; turn vase every couple of days.",
      "Remove faded bottom blossoms along the spires to encourage top buds to bloom.",
      "Keep water fresh and cool for long-lasting fragrance."
    ],
    sizes: [
      { id: "standard", name: "Standard", stems: "18-20 stems", price: 62, default: true },
      { id: "deluxe", name: "Deluxe", stems: "26-28 stems", price: 82, default: false },
      { id: "premium", name: "Premium", stems: "38-40 stems", price: 115, default: false }
    ],
    vases: [
      { id: "none", name: "Sage Cotton Ribbon Wrap", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "pastel-peonies",
    slug: "pastel-peonies",
    name: "Pastel Peonies",
    subtitle: "Lush Sarah Bernhardt Blush Peonies",
    category: "luxury",
    occasion: "Romantic",
    tag: "Coveted Luxury",
    featured: true,
    rating: 5.0,
    reviewCount: 156,
    images: {
      primary: "images/peonies.webp",
      gallery: [
        "images/peonies.webp",
        "images/peonies-1.webp",
        "images/peonies-2.webp"
      ]
    },
    shortDescription: "Sumptuous Sarah Bernhardt blush and cream peonies hand-tied with velvet champagne ribbon.",
    description: "The crown jewel of seasonal floristry. Pillow-soft Sarah Bernhardt peonies arrive in tight bud and unfurl into massive ruffled blooms over several days. Accented with dark emerald peony foliage and delicate white lilacs.",
    stems: [
      { name: "Sarah Bernhardt Blush Peonies", count: 10 },
      { name: "Cream White Peonies", count: 5 },
      { name: "White Lilac Sprigs", count: 4 },
      { name: "Lush Peony Greens", count: 4 }
    ],
    careGuide: [
      "To speed opening, place in slightly warm water in a warm room.",
      "Once open, move to a cool spot to prolong bloom beauty for up to 8-10 days.",
      "Gently rinse any natural sweet sap from tight buds with lukewarm water."
    ],
    sizes: [
      { id: "standard", name: "Standard", stems: "15-18 stems", price: 89, default: true },
      { id: "deluxe", name: "Deluxe", stems: "22-25 stems", price: 119, default: false },
      { id: "premium", name: "Premium", stems: "32-35 stems", price: 169, default: false }
    ],
    vases: [
      { id: "none", name: "Heavy Cream Wrap & Velvet Ribbon", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "sunday-tulips",
    slug: "sunday-tulips",
    name: "Sunday Tulips",
    subtitle: "Fresh Spring Whispers in Pastel",
    category: "bouquet",
    occasion: "Everyday",
    tag: "Spring Fresh",
    featured: true,
    rating: 4.8,
    reviewCount: 68,
    images: {
      primary: "images/tulips.webp",
      gallery: [
        "images/tulips.webp",
        "images/tulips-1.webp",
        "images/tulips-2.webp"
      ]
    },
    shortDescription: "A modern monochrome bouquet of fresh Dutch tulips in soft blush, peach, and ivory.",
    description: "Crisp, graceful, and understated. Sunday Tulips celebrate the simple perfection of springtime. Grown in cold-climate greenhouses and harvested at first color, these stems continue to grow and dance toward natural light in your vase.",
    stems: [
      { name: "Blush Dutch Tulips", count: 10 },
      { name: "Soft Peach Tulips", count: 8 },
      { name: "Cream White Tulips", count: 6 }
    ],
    careGuide: [
      "Tulips continue growing 1-2 inches in the vase: recut stems every 2 days.",
      "Keep water shallow (2-3 inches) and cold to keep stems upright.",
      "Avoid placing next to daffodils or fruit."
    ],
    sizes: [
      { id: "standard", name: "Standard", stems: "20-22 stems", price: 52, default: true },
      { id: "deluxe", name: "Deluxe", stems: "30-32 stems", price: 72, default: false },
      { id: "premium", name: "Premium", stems: "44-46 stems", price: 98, default: false }
    ],
    vases: [
      { id: "none", name: "Parchment Craft Wrap", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "sweetheart-bouquet",
    slug: "sweetheart-bouquet",
    name: "Sweetheart Bouquet",
    subtitle: "Ruffled Lisianthus, Ranunculus & Blush Roses",
    category: "bouquet",
    occasion: "Romantic",
    tag: "Romantic Favorite",
    rating: 4.9,
    reviewCount: 94,
    images: {
      primary: "images/sweetheart.webp",
      gallery: [
        "images/sweetheart.webp",
        "images/sweetheart-1.webp",
        "images/sweetheart-2.webp"
      ]
    },
    shortDescription: "A romantic confection of ruffled white lisianthus, pale peach ranunculus, and pastel pink roses.",
    description: "Soft, dreamy, and poetic. The Sweetheart Bouquet is crafted with fluttery multi-petaled lisianthus, delicate ranunculus, blush garden roses, and trailing asparagus ferns wrapped in frosted vellum paper.",
    stems: [
      { name: "Ruffled White Lisianthus", count: 8 },
      { name: "Pale Peach Ranunculus", count: 6 },
      { name: "Pastel Pink Garden Roses", count: 6 },
      { name: "Asparagus Fern & Eucalyptus", count: 4 }
    ],
    careGuide: [
      "Trim 1 inch off bottom of stems on an angle.",
      "Replace vase water every 48 hours to maintain clear freshness.",
      "Keep away from intense heat sources."
    ],
    sizes: [
      { id: "standard", name: "Standard", stems: "18-20 stems", price: 74, default: true },
      { id: "deluxe", name: "Deluxe", stems: "28-30 stems", price: 99, default: false },
      { id: "premium", name: "Premium", stems: "40-42 stems", price: 139, default: false }
    ],
    vases: [
      { id: "none", name: "Textured Vellum Wrap & Mauve Ribbon", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "petite-wildflower-basket",
    slug: "petite-wildflower-basket",
    name: "Petite Wildflower Basket",
    subtitle: "Chamomile Daisies & English Lavender",
    category: "gift",
    occasion: "Gratitude & Thinking of You",
    tag: "Charming Gift",
    rating: 4.9,
    reviewCount: 57,
    images: {
      primary: "images/wildflower.webp",
      gallery: [
        "images/wildflower.webp",
        "images/wildflower-1.webp",
        "images/wildflower-2.webp"
      ]
    },
    shortDescription: "A rustic woven rattan basket filled with sunny chamomile daisies, English lavender, and sweet peas.",
    description: "Charming, fragrant, and heartwarming. Hand-arranged in a natural hand-woven wicker basket with an internal water reservoir, this petite arrangement arrives ready to display on bedside tables, breakfast nooks, or work desks.",
    stems: [
      { name: "Sunny Chamomile Daisies", count: 12 },
      { name: "Fragrant English Lavender", count: 8 },
      { name: "Peach Sweet Peas", count: 6 },
      { name: "Trailing Ivy Foliage", count: 4 }
    ],
    careGuide: [
      "Add 1/2 cup of cold water into the center of the basket foam daily.",
      "Keep away from direct draft or strong sun to prolong lavender scent.",
      "Deadhead spent chamomile blossoms to encourage continued freshness."
    ],
    sizes: [
      { id: "standard", name: "Standard", stems: "Petite 6-inch Basket", price: 58, default: true },
      { id: "deluxe", name: "Deluxe", stems: "Classic 8-inch Basket", price: 78, default: false },
      { id: "premium", name: "Grand Luxe Basket", stems: "Grand 10-inch Basket", price: 105, default: false }
    ],
    vases: [
      { id: "basket", name: "Hand-Woven Natural Rattan Basket (Included)", price: 0 }
    ]
  },
  {
    id: "birthday-bloom-box",
    slug: "birthday-bloom-box",
    name: "Birthday Bloom Box",
    subtitle: "Pastel Hat-Box Arrangement & Letterpress Card",
    category: "celebration",
    occasion: "Milestones & Birthdays",
    tag: "Celebration Package",
    featured: true,
    rating: 5.0,
    reviewCount: 120,
    images: {
      primary: "images/birthday.webp",
      gallery: [
        "images/birthday.webp",
        "images/birthday-1.webp"
      ]
    },
    shortDescription: "A luxury round keepsake hat box densely packed with pastel roses and mini hydrangeas, with a letterpress card.",
    description: "The ultimate celebratory gift experience. Arrives in an elegant round matte cream hat box tied with violet silk ribbon. Freshly cut pastel roses, mini hydrangeas, and blush carnations are arranged in hydration foam, complete with a personalized gold-foil letterpress card.",
    stems: [
      { name: "Pastel Garden Roses", count: 8 },
      { name: "Mini White Hydrangeas", count: 3 },
      { name: "Blush Carnations", count: 6 },
      { name: "Gold-Dusted Hypericum Berries", count: 4 }
    ],
    careGuide: [
      "Add 1/4 cup of fresh cold water into the center of the bloom box every 2 days.",
      "Keep arrangement in the decorative hat box for the full life of the blooms.",
      "Display in a cool room away from direct heaters."
    ],
    sizes: [
      { id: "standard", name: "Standard", stems: "6-inch Hat Box", price: 78, default: true },
      { id: "deluxe", name: "Deluxe", stems: "8-inch Hat Box", price: 105, default: false },
      { id: "premium", name: "Grand Luxe Hat Box", stems: "10-inch Hat Box", price: 155, default: false }
    ],
    vases: [
      { id: "hatbox", name: "Matte Cream Keepsake Hat Box (Included)", price: 0 }
    ]
  },
  {
    id: "english-daisies",
    slug: "english-daisies",
    name: "English Countryside Daisies",
    subtitle: "Pure White Shasta Daisies & Sunny Chamomile",
    category: "bouquet",
    occasion: "Everyday",
    tag: "Cheerful Meadow",
    rating: 4.9,
    reviewCount: 62,
    images: {
      primary: "images/daisies.webp",
      gallery: [
        "images/daisies.webp",
        "images/daisies-1.webp",
        "images/daisies-2.webp"
      ]
    },
    shortDescription: "A cheerful, sun-drenched gathering of pure white Shasta daisies, sunny yellow chamomile, and fresh field greens.",
    description: "Bring the unpretentious joy and crisp breeze of the English countryside into your home. Hand-tied with abundant white Shasta daisies, aromatic chamomile blossoms, golden feverfew, and wisps of trailing greenery, this radiant bouquet brings effortless warmth and cheerful energy to any room.",
    stems: [
      { name: "Pure White Shasta Daisies", count: 14 },
      { name: "Sunny Chamomile Blossoms", count: 10 },
      { name: "Golden Feverfew Sprigs", count: 6 },
      { name: "Fresh Meadow Greens & Eucalyptus", count: 5 }
    ],
    careGuide: [
      "Trim stems at a 45-degree angle under cool running water before placing in clean water.",
      "Daisies love fresh, cold water; change water and rinse stems every 2 days.",
      "Keep away from direct heat and air drafts to maximize petal longevity."
    ],
    sizes: [
      { id: "standard", name: "Standard", stems: "20-22 stems", price: 52, default: true },
      { id: "deluxe", name: "Deluxe", stems: "30-32 stems", price: 72, default: false },
      { id: "premium", name: "Premium", stems: "42-44 stems", price: 98, default: false }
    ],
    vases: [
      { id: "none", name: "Classic Kraft Wrap & Yellow Linen Ribbon", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "bud-vase-trio",
    slug: "bud-vase-trio",
    name: "The Bud Vase Trio",
    subtitle: "Trio of Ribbed Glass Vessels & Fresh Accent Stems",
    category: "bouquet",
    occasion: "Everyday",
    tag: "Petite Luxe",
    rating: 4.9,
    reviewCount: 42,
    images: {
      primary: "images/bud-vase-trio.webp",
      gallery: [
        "images/bud-vase-trio.webp",
        "images/bud-vase-trio-1.webp",
        "images/bud-vase-trio-2.webp"
      ]
    },
    shortDescription: "A set of three fluted glass bud vases paired with handpicked ranunculus, garden spray roses, and eucalyptus.",
    description: "Effortlessly chic and versatile. Our Bud Vase Trio includes three individual fluted glass vessels, each styled with single-stem focal blooms and delicate botanical accents. Scatter them across your dining table, style your bedside, or place them on your home office desk for an instant touch of elegance.",
    stems: [
      { name: "Blush Ranunculus", count: 2 },
      { name: "Garden Spray Roses", count: 3 },
      { name: "Silver Dollar Eucalyptus Sprigs", count: 3 },
      { name: "Fragrant English Lavender", count: 3 }
    ],
    careGuide: [
      "Fill each mini vase 3/4 full with cool, fresh water.",
      "Trim 1/2 inch off the bottom of each stem before styling in the vases.",
      "Refresh water daily to keep small reservoirs clean and blooms vibrant."
    ],
    sizes: [
      { id: "standard", name: "Trio Set (3 Vases)", stems: "3 Vases + 11 Stems", price: 38, default: true },
      { id: "deluxe", name: "Quintet Set (5 Vases)", stems: "5 Vases + 18 Stems", price: 48, default: false }
    ],
    vases: [
      { id: "included", name: "Fluted Glass Bud Vases (Included)", price: 0 }
    ]
  },
  {
    id: "petite-parisian-posy",
    slug: "petite-parisian-posy",
    name: "Petite Parisian Posy",
    subtitle: "Blush Spray Roses, Lisianthus & Chamomile",
    category: "bouquet",
    occasion: "Gratitude & Thinking of You",
    tag: "Sweet Gesture",
    rating: 4.8,
    reviewCount: 39,
    images: {
      primary: "images/parisian-posy.webp",
      gallery: [
        "images/parisian-posy.webp",
        "images/parisian-posy-1.webp",
        "images/parisian-posy-2.webp"
      ]
    },
    shortDescription: "A charming hand-tied petite posy of blush spray roses, white lisianthus buds, and sunny chamomile daisies.",
    description: "A delicate pocket bouquet inspired by morning strolls through Parisian flower stalls. Hand-tied with sweet blush spray roses, ruffled white lisianthus, sunny chamomile daisies, and fragrant greenery, wrapped in authentic French newsprint paper with natural jute twine.",
    stems: [
      { name: "Blush Spray Roses", count: 4 },
      { name: "White Lisianthus Buds", count: 3 },
      { name: "Sunny Chamomile Blossoms", count: 5 },
      { name: "Silver Dollar Eucalyptus", count: 3 }
    ],
    careGuide: [
      "Trim stems at a 45-degree angle under cool water before placing in vase.",
      "Change vase water every two days to maintain pristine freshness.",
      "Keep away from direct heat sources and drafts."
    ],
    sizes: [
      { id: "standard", name: "Standard Posy", stems: "12-14 stems", price: 32, default: true },
      { id: "deluxe", name: "Deluxe Posy", stems: "18-20 stems", price: 44, default: false }
    ],
    vases: [
      { id: "none", name: "French Newsprint & Twine Wrap", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "everlasting-meadow-bundle",
    slug: "everlasting-meadow-bundle",
    name: "Everlasting Meadow Bundle",
    subtitle: "Naturally Preserved Lavender, Bunny Tails & Ruscus",
    category: "gift",
    occasion: "Housewarming & Everyday",
    tag: "Zero Waste",
    rating: 4.9,
    reviewCount: 51,
    images: {
      primary: "images/everlasting-meadow.webp",
      gallery: [
        "images/everlasting-meadow.webp",
        "images/everlasting-meadow-1.webp",
        "images/everlasting-meadow-2.webp"
      ]
    },
    shortDescription: "A 100% naturally dried botanical bundle of French lavender, fluffy bunny tails, and bleached ruscus that lasts for years.",
    description: "Sustainably dried and forever enchanting. This curated bundle brings organic texture and soothing botanical fragrance into your home with zero maintenance. Features sun-dried Provence lavender, soft cream bunny tails, bleached Italian ruscus, and golden starflowers tied with raw linen ribbon.",
    stems: [
      { name: "Preserved French Lavender", count: 12 },
      { name: "Fluffy Cream Bunny Tails (Lagurus)", count: 10 },
      { name: "Bleached Italian Ruscus", count: 4 },
      { name: "Golden Starflower Sprigs", count: 6 }
    ],
    careGuide: [
      "No water needed — keep stems completely dry.",
      "Display away from direct high humidity and harsh sun to preserve vibrant tones.",
      "Gently dust occasionally with a light feather duster or cool hairdryer setting."
    ],
    sizes: [
      { id: "standard", name: "Classic Bundle", stems: "28-30 dried stems", price: 36, default: true },
      { id: "deluxe", name: "Grand Luxe Bundle", stems: "45-50 dried stems", price: 48, default: false }
    ],
    vases: [
      { id: "none", name: "Raw Linen Ribbon & Kraft Wrap", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "cloud-nine-babys-breath",
    slug: "cloud-nine-babys-breath",
    name: "Cloud Nine Gypsophila Wrap",
    subtitle: "Abundant Million-Star Baby's Breath & Chamomile",
    category: "bouquet",
    occasion: "Everyday",
    tag: "Airy Botanical",
    rating: 4.8,
    reviewCount: 33,
    images: {
      primary: "images/cloud-nine.webp",
      gallery: [
        "images/cloud-nine.webp",
        "images/cloud-nine-1.webp",
        "images/cloud-nine-2.webp"
      ]
    },
    shortDescription: "An ethereal cloud of pure white million-star baby's breath accented with fresh golden chamomile daisies.",
    description: "Float into pure serenity with our Cloud Nine wrap. Densely gathered million-star gypsophila creates an ethereal, pillowy silhouette punctuated by sunny chamomile blooms. Highly durable, long-lasting, and effortlessly dries into a lasting keepsake in the vase.",
    stems: [
      { name: "Million-Star Gypsophila Stems", count: 8 },
      { name: "Sunny Chamomile Blossoms", count: 8 },
      { name: "Silver Dollar Eucalyptus", count: 3 }
    ],
    careGuide: [
      "Trim stem ends by 1 inch before placing in clean, cold water.",
      "Top up water every 2 days; gypsophila drinks steadily.",
      "Can be left in an empty vase after 10 days to dry naturally into preserved florals."
    ],
    sizes: [
      { id: "standard", name: "Standard Cloud", stems: "16-18 stems", price: 35, default: true },
      { id: "deluxe", name: "Deluxe Cloud", stems: "24-26 stems", price: 46, default: false }
    ],
    vases: [
      { id: "none", name: "Parchment Wrap & Silk Ribbon", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "artisan-potted-pilea",
    slug: "artisan-potted-pilea",
    name: "Artisan Potted Pilea & Succulent",
    subtitle: "Living Chinese Money Plant in Earthenware Pot",
    category: "gift",
    occasion: "Housewarming & Everyday",
    tag: "Living Plant",
    rating: 4.9,
    reviewCount: 47,
    images: {
      primary: "images/potted-pilea.webp",
      gallery: [
        "images/potted-pilea.webp",
        "images/potted-pilea-1.webp",
        "images/potted-pilea-2.webp"
      ]
    },
    shortDescription: "A lively Pilea Peperomioides (Chinese Money Plant) potted in a handcrafted terracotta vessel with living moss.",
    description: "Renowned as the 'Pass-It-On Plant' symbolizing prosperity and good fortune. Features circular coin-shaped foliage nestled with a miniature jade succulent and preserved woodland moss, planted in an artisanal matte terracotta earthenware vessel with drainage.",
    stems: [
      { name: "Pilea Peperomioides Plant", count: 1 },
      { name: "Mini Jade Succulent Accent", count: 1 },
      { name: "Preserved Forest Moss Layer", count: 1 }
    ],
    careGuide: [
      "Thrives in medium to bright indirect sunlight; avoid direct harsh sun.",
      "Water thoroughly when the top inch of soil feels dry to the touch (approx. once weekly).",
      "Rotate pot occasionally to ensure symmetrical leaf growth."
    ],
    sizes: [
      { id: "standard", name: "Petite 4-Inch Vessel", stems: "4-inch Terracotta Vessel", price: 28, default: true },
      { id: "deluxe", name: "Classic 6-Inch Vessel", stems: "6-inch Terracotta Vessel", price: 38, default: false }
    ],
    vases: [
      { id: "terracotta", name: "Artisan Handcrafted Terracotta Pot (Included)", price: 0 }
    ]
  },
  {
    id: "sweet-carnation-lavender",
    slug: "sweet-carnation-lavender",
    name: "Sweet Carnation & Lavender",
    subtitle: "Ruffled Peach Carnations & Fresh English Lavender",
    category: "bouquet",
    occasion: "Get Well & Cheer",
    tag: "Long Lasting",
    rating: 4.8,
    reviewCount: 36,
    images: {
      primary: "images/carnation-lavender.webp",
      gallery: [
        "images/carnation-lavender.webp",
        "images/carnation-lavender-1.webp",
        "images/carnation-lavender-2.webp"
      ]
    },
    shortDescription: "A long-lasting gathering of fragrant English lavender, peach ruffled carnations, and white waxflower.",
    description: "Exceptional longevity meets sweet pastoral charm. Fluffy ruffled carnations in delicate peach and cream tones paired with aromatic fresh English lavender and starry white waxflower. Celebrated for lasting up to two full weeks in the vase.",
    stems: [
      { name: "Ruffled Peach Carnations", count: 8 },
      { name: "Fresh English Lavender", count: 6 },
      { name: "White Waxflower Sprigs", count: 4 },
      { name: "Italian Ruscus", count: 3 }
    ],
    careGuide: [
      "Trim stems on a sharp angle and place in fresh cold water.",
      "Remove any leaves that fall beneath the water line.",
      "Replenish vase water every 2 days; carnations have phenomenal vase life."
    ],
    sizes: [
      { id: "standard", name: "Standard Bunch", stems: "18-20 stems", price: 34, default: true },
      { id: "deluxe", name: "Deluxe Bunch", stems: "26-28 stems", price: 45, default: false }
    ],
    vases: [
      { id: "none", name: "Vintage Kraft Wrap & Sage Ribbon", price: 0 },
      { id: "glass", name: "Fluted Clear Glass Vase", price: 14 },
      { id: "ceramic", name: "Artisan Matte Ceramic Pot", price: 24 }
    ]
  },
  {
    id: "classic-dozen-roses",
    slug: "classic-dozen-roses",
    name: "Classic Dozen Roses",
    subtitle: "Twelve Fresh Red Roses in a Signature Wrap",
    category: "bouquet",
    occasion: "Romantic",
    tag: "Everyday Romance",
    rating: 4.9,
    reviewCount: 42,
    images: {
      primary: "images/dozen-roses.webp",
      gallery: ["images/dozen-roses.webp"]
    },
    shortDescription: "A thoughtful dozen of fresh red roses, hand-tied and finished in our signature wrap.",
    description: "Twelve classic red roses, freshly hand-tied with seasonal foliage and finished in our signature presentation wrap. An easy, heartfelt gesture for birthdays, apologies, and just-because moments.",
    stems: [
      { name: "Fresh Red Roses", count: 12 },
      { name: "Seasonal Greenery", count: 4 }
    ],
    careGuide: [
      "Trim stems at a 45-degree angle and place in fresh, cool water.",
      "Refresh the water every two days to extend vase life."
    ],
    sizes: [
      { id: "standard", name: "Classic Dozen", stems: "12 Roses", price: 23, default: true }
    ],
    vases: [
      { id: "none", name: "Signature Rose Wrap", price: 0 }
    ]
  },
  {
    id: "combo-kingsbite-roses",
    slug: "combo-kingsbite-roses",
    name: "Roses & Kingsbite Gift Pack",
    subtitle: "Classic Dozen Roses + Medium Kingsbite Chocolate Pack",
    category: "combo",
    isCombo: true,
    homepagePlacement: "banner",
    occasion: "Everyday",
    tag: "Ghana Gift Pick",
    featured: true,
    rating: 4.9,
    reviewCount: 28,
    comboSavings: 4,
    originalPrice: 32,
    comboItems: [
      { slug: "classic-dozen-roses", sizeId: "standard", vaseId: "none" },
      { slug: "kingsbite-medium-pack", sizeId: "standard", vaseId: "none" }
    ],
    comboIncludes: [
      "Classic Dozen Red Roses",
      "Medium Kingsbite Chocolate Pack",
      "Complimentary Gift Card"
    ],
    images: {
      primary: "images/kingsbite.webp",
      gallery: ["images/kingsbite.webp", "images/dozen-roses.webp"]
    },
    shortDescription: "A simple, generous gift: a dozen fresh roses with a medium Kingsbite chocolate pack.",
    description: "A thoughtful Ghanaian gift pairing for everyday celebrations. Twelve fresh red roses arrive hand-tied in our signature wrap alongside a medium Kingsbite chocolate pack and a complimentary gift card.",
    stems: [
      { name: "Fresh Red Roses", count: 12 },
      { name: "Medium Kingsbite Chocolate Pack", count: 1 }
    ],
    careGuide: [
      "Trim rose stems at a 45-degree angle and refresh water every two days.",
      "Store chocolate in a cool, dry place away from direct sunlight."
    ],
    sizes: [
      { id: "standard", name: "Complete Gift Pack (Save $4)", stems: "12 Roses + Medium Kingsbite", price: 28, default: true }
    ],
    vases: [
      { id: "none", name: "Signature Gift Wrap", price: 0 }
    ]
  },
  {
    id: "combo-sweet-indulgence",
    slug: "combo-sweet-indulgence",
    name: "The Sweet Indulgence Gift Set",
    subtitle: "Rose Garden Bouquet + Belgian Dipped Strawberries",
    category: "combo",
    isCombo: true,
    occasion: "Romantic",
    tag: "Save $8 (Best Value)",
    featured: true,
    rating: 5.0,
    reviewCount: 96,
    comboSavings: 8,
    originalPrice: 94,
    comboItems: [
      { slug: "rose-garden", sizeId: "standard", vaseId: "none" },
      { slug: "chocolate-strawberries", sizeId: "standard", vaseId: "none" }
    ],
    comboIncludes: [
      "Rose Garden Bouquet (Standard)",
      "6-pc Belgian Chocolate-Dipped Strawberries",
      "Complimentary Gold-Foil Letterpress Card"
    ],
    images: {
      primary: "images/combo-sweet-indulgence.webp",
      gallery: [
        "images/combo-sweet-indulgence.webp",
        "images/strawberries.webp"
      ]
    },
    shortDescription: "The ultimate romantic pairing: velvety Ecuadorian red roses alongside handcrafted chocolate-dipped strawberries.",
    description: "Make their heart race with our most coveted luxury pairing. Features our signature Rose Garden hand-tied bouquet of crimson roses, blush spray blooms, and seeded eucalyptus alongside a box of 6 handcrafted Belgian chocolate-dipped strawberries with white chocolate drizzle and crushed Sicilian pistachios.",
    stems: [
      { name: "Premium Ecuadorian Red Roses", count: 12 },
      { name: "Blush Garden Spray Roses", count: 6 },
      { name: "Belgian Chocolate-Dipped Strawberries", count: 6 },
      { name: "Seeded Eucalyptus", count: 4 }
    ],
    careGuide: [
      "Bouquet: Trim stems at 45° angle under cool water and refresh vase water every 2 days.",
      "Strawberries: Best enjoyed within 48 hours. Keep chilled until ready to serve."
    ],
    sizes: [
      { id: "standard", name: "Complete Gift Set (Save $8)", stems: "Bouquet + 6 Dipped Strawberries", price: 86, default: true }
    ],
    vases: [
      { id: "none", name: "Luxury Gift Presentation Wrap & Box", price: 0 }
    ]
  },
  {
    id: "combo-birthday-delights",
    slug: "combo-birthday-delights",
    name: "The Birthday Delights Gift Set",
    subtitle: "Birthday Bloom Box + 12 French Macarons + Keepsake Card",
    category: "combo",
    isCombo: true,
    occasion: "Birthday & Anniversaries",
    tag: "Save $9 (Top Seller)",
    featured: true,
    rating: 4.9,
    reviewCount: 118,
    comboSavings: 9,
    originalPrice: 104,
    comboItems: [
      { slug: "birthday-bloom-box", sizeId: "standard", vaseId: "hatbox" },
      { slug: "french-macarons", sizeId: "standard", vaseId: "none" },
      { slug: "photo-keepsake-card", sizeId: "standard", vaseId: "none" }
    ],
    comboIncludes: [
      "Birthday Bloom Hat Box (Standard)",
      "12-pc French Macaron Collection",
      "Personalized Keepsake Greeting Card"
    ],
    images: {
      primary: "images/combo-birthday-delights.webp",
      gallery: [
        "images/combo-birthday-delights.webp",
        "images/macarons.webp",
        "images/photo-card.webp"
      ]
    },
    shortDescription: "Signature pastel rose hat box with a dozen Parisian macarons and a gold foil letterpress card.",
    description: "Everything needed for an unforgettable birthday milestone. A dense, lush arrangement of pastel garden roses in our signature keepsake round hat box, paired with 12 artisan French macarons and your personalized gold-foil greeting card.",
    stems: [
      { name: "Pastel Garden Roses", count: 10 },
      { name: "Pink Hydrangea Accents", count: 4 },
      { name: "French Pastel Macarons", count: 12 },
      { name: "Personalized Keepsake Card", count: 1 }
    ],
    careGuide: [
      "Bloom Box: Add 1/2 cup cool water to center foam every 2 days.",
      "Macarons: Store at room temperature away from heat; enjoy within 5 days."
    ],
    sizes: [
      { id: "standard", name: "Complete Birthday Set (Save $9)", stems: "Hat Box + 12 Macarons + Card", price: 95, default: true }
    ],
    vases: [
      { id: "none", name: "Round Keepsake Hat Box & Silk Ribbon", price: 0 }
    ]
  },
  {
    id: "combo-pamper-me",
    slug: "combo-pamper-me",
    name: "The Botanical Pamper Me Set",
    subtitle: "Cloud Nine Baby's Breath + Spa Trio + Silk Scrunchies",
    category: "combo",
    isCombo: true,
    occasion: "Self-Care & Comfort",
    tag: "Save $7 (Spa Favorite)",
    featured: true,
    rating: 5.0,
    reviewCount: 64,
    comboSavings: 7,
    originalPrice: 69,
    comboItems: [
      { slug: "cloud-nine-babys-breath", sizeId: "standard", vaseId: "none" },
      { slug: "botanical-spa-trio", sizeId: "standard", vaseId: "none" },
      { slug: "silk-scrunchies", sizeId: "standard", vaseId: "none" }
    ],
    comboIncludes: [
      "Cloud Nine Baby's Breath Bunch",
      "Botanical Spa Trio Ritual (3-pc)",
      "Mulberry Silk Scrunchie Trio (3-pack)"
    ],
    images: {
      primary: "images/combo-pamper-me.webp",
      gallery: [
        "images/combo-pamper-me.webp",
        "images/spa-trio.webp",
        "images/silk-scrunchies.webp"
      ]
    },
    shortDescription: "A relaxing botanical spa ritual: ethereal cloud nine blooms, artisan bath bomb & soap trio, and mulberry silk scrunchies.",
    description: "A restorative home sanctuary in a box. Features a generous cloud of fluffy white baby's breath, a handmade botanical bath bomb and lavender soap trio, and 3 pure mulberry silk hair scrunchies in botanic watercolor tones.",
    stems: [
      { name: "Voluminous White Baby's Breath", count: 12 },
      { name: "Botanical Spa Trio", count: 3 },
      { name: "Mulberry Silk Scrunchies", count: 3 }
    ],
    careGuide: [
      "Flowers: Display fresh in cold water or hang upside down to dry into an everlasting cloud.",
      "Spa items: Suitable for sensitive skin, made with organic botanical oils."
    ],
    sizes: [
      { id: "standard", name: "Complete Pamper Set (Save $7)", stems: "Blooms + Spa Trio + Scrunchies", price: 62, default: true }
    ],
    vases: [
      { id: "none", name: "Signature Kraft Wrap & Gift Box", price: 0 }
    ]
  },
  {
    id: "combo-cozy-evening",
    slug: "combo-cozy-evening",
    name: "The Cozy Evening Kit",
    subtitle: "Petite Parisian Posy + Belgian Hot Cocoa + Rose Santal Candle",
    category: "combo",
    isCombo: true,
    occasion: "Everyday",
    tag: "Save $9 (Cozy Favorite)",
    featured: true,
    rating: 4.9,
    reviewCount: 52,
    comboSavings: 9,
    originalPrice: 64,
    comboItems: [
      { slug: "petite-parisian-posy", sizeId: "standard", vaseId: "none" },
      { slug: "hot-chocolate-kit", sizeId: "standard", vaseId: "none" },
      { slug: "botanical-candle", sizeId: "standard", vaseId: "none" }
    ],
    comboIncludes: [
      "Petite Parisian Posy",
      "Luxe Belgian Hot Chocolate Kit",
      "Rose & Santal Botanical Candle (50-hr)"
    ],
    images: {
      primary: "images/combo-cozy-evening.webp",
      gallery: [
        "images/combo-cozy-evening.webp",
        "images/hot-chocolate.webp",
        "images/candle.webp"
      ]
    },
    shortDescription: "Charming French posy bouquet, rich Belgian cocoa with marshmallows, and an amber glass botanical candle.",
    description: "The cozy retreat gift. A fresh pocket posy of spray roses and chamomile, paired with artisanal Belgian hot cocoa mix, vanilla bean marshmallows, chocolate stirrer spoon, and our bestselling Rose & Santal amber glass candle.",
    stems: [
      { name: "Pink Spray Roses & Chamomile", count: 8 },
      { name: "Belgian Hot Chocolate Kit", count: 1 },
      { name: "Rose & Santal Soy Candle", count: 1 }
    ],
    careGuide: [
      "Posy: Keep in a petite water vessel away from direct heaters.",
      "Candle: Trim wick to 1/4 inch before lighting; burn for 2-3 hours per session."
    ],
    sizes: [
      { id: "standard", name: "Complete Cozy Set (Save $9)", stems: "Posy + Hot Cocoa + Candle", price: 55, default: true }
    ],
    vases: [
      { id: "none", name: "Kraft Posy Wrap & Ribbon", price: 0 }
    ]
  },
  {
    id: "combo-little-ones-welcome",
    slug: "combo-little-ones-welcome",
    name: "Little One's Welcome Gift Set",
    subtitle: "Sunday Tulips + Petite Bloom Bear + Champagne Truffles",
    category: "combo",
    isCombo: true,
    occasion: "Celebrations",
    tag: "Save $8 (New Baby)",
    featured: true,
    rating: 4.9,
    reviewCount: 71,
    comboSavings: 8,
    originalPrice: 80,
    comboItems: [
      { slug: "sunday-tulips", sizeId: "standard", vaseId: "none" },
      { slug: "bloom-bear", sizeId: "standard", vaseId: "none" },
      { slug: "champagne-truffles", sizeId: "standard", vaseId: "none" }
    ],
    comboIncludes: [
      "Sunday Tulips Bouquet (Standard)",
      "Petite Bloom Bear with Preserved Posy",
      "Artisanal Champagne Truffles (8-pc)"
    ],
    images: {
      primary: "images/combo-little-ones-welcome.webp",
      gallery: [
        "images/combo-little-ones-welcome.webp",
        "images/bloom-bear.webp",
        "images/truffles.webp"
      ]
    },
    shortDescription: "Cheerful fresh tulips, a plush keepsake bloom bear with dried flowers, and artisan Belgian truffles.",
    description: "Celebrate life's sweetest arrivals. Vibrant Dutch tulips for the nursery, a cuddly heirloom plush bear holding an everlasting dried posy, and decadent dark chocolate champagne truffles for the proud parents.",
    stems: [
      { name: "Dutch Pastel Tulips", count: 15 },
      { name: "Petite Plush Bloom Bear", count: 1 },
      { name: "Champagne Truffles Box", count: 8 }
    ],
    careGuide: [
      "Tulips: Trim 1 inch straight across and replenish with cold water daily.",
      "Bloom Bear: Surface washable; keep preserved mini posy dry."
    ],
    sizes: [
      { id: "standard", name: "Complete Welcome Set (Save $8)", stems: "Tulips + Bear + Truffles", price: 72, default: true }
    ],
    vases: [
      { id: "none", name: "Pastel Kraft Wrap & Satin Ribbon", price: 0 }
    ]
  },
  {
    id: "combo-garden-retreat",
    slug: "combo-garden-retreat",
    name: "The Garden Retreat Set",
    subtitle: "Sweet Carnation & Lavender + Raw Honey & Tea + Scented Candle",
    category: "combo",
    isCombo: true,
    occasion: "Get Well & Cheer",
    tag: "Save $7 (Long Lasting)",
    featured: true,
    rating: 4.8,
    reviewCount: 43,
    comboSavings: 7,
    originalPrice: 65,
    comboItems: [
      { slug: "sweet-carnation-lavender", sizeId: "standard", vaseId: "none" },
      { slug: "artisan-honey-tea", sizeId: "standard", vaseId: "none" },
      { slug: "botanical-candle", sizeId: "standard", vaseId: "none" }
    ],
    comboIncludes: [
      "Sweet Carnation & Lavender Bunch",
      "Artisan Honey & Chamomile Tea Duo",
      "Rose & Santal Botanical Candle"
    ],
    images: {
      primary: "images/combo-garden-retreat.webp",
      gallery: [
        "images/combo-garden-retreat.webp",
        "images/honey-tea.webp",
        "images/candle.webp"
      ]
    },
    shortDescription: "Fragrant English lavender and peach carnations with raw wildflower honey, chamomile tea, and a botanical candle.",
    description: "Send warm wishes and pastoral comfort. Long-lasting peach carnations and aromatic English lavender paired with pure wildflower honey with wooden dipper, herbal chamomile lavender tea sachets, and a hand-poured soy candle.",
    stems: [
      { name: "Peach Carnations & English Lavender", count: 14 },
      { name: "Wildflower Honey & Tea Duo", count: 1 },
      { name: "Rose & Santal Soy Candle", count: 1 }
    ],
    careGuide: [
      "Bouquet: Carnations have outstanding 14-day vase life; refresh water every 2 days.",
      "Honey & Tea: Store honey at room temp; steep tea bag in hot water for 5 minutes."
    ],
    sizes: [
      { id: "standard", name: "Complete Garden Set (Save $7)", stems: "Bunch + Honey/Tea + Candle", price: 58, default: true }
    ],
    vases: [
      { id: "none", name: "Vintage Botanical Wrap", price: 0 }
    ]
  }
];

/**
 * Boutique Gift Add-Ons & Standalone Pairing Products
 */
export const GIFT_ADDONS = [
  {
    id: "kingsbite-medium-pack",
    slug: "kingsbite-medium-pack",
    name: "Medium Kingsbite Chocolate Pack",
    subtitle: "A Thoughtful Ghanaian Chocolate Gift",
    category: "gift",
    occasion: "Everyday",
    tag: "Ghana Favourite",
    rating: 4.8,
    reviewCount: 18,
    images: {
      primary: "images/kingsbite.webp",
      gallery: ["images/kingsbite.webp"]
    },
    shortDescription: "A medium Kingsbite chocolate pack, ready to pair with fresh flowers.",
    description: "A medium Kingsbite chocolate pack selected for easy, thoughtful gifting alongside fresh flowers.",
    sizes: [
      { id: "standard", name: "Medium Pack", stems: "Chocolate Gift Pack", price: 9, default: true }
    ],
    vases: [
      { id: "none", name: "Gift Presentation", price: 0 }
    ],
    stems: []
  },
  {
    id: "chocolate-strawberries",
    slug: "chocolate-strawberries",
    name: "Belgian Chocolate-Dipped Strawberries",
    subtitle: "Handcrafted Dark & Milk Chocolate (6-Piece)",
    category: "gift",
    occasion: "Romantic",
    tag: "Bestseller Pair",
    rating: 5.0,
    reviewCount: 112,
    images: {
      primary: "images/strawberries.webp",
      gallery: ["images/strawberries.webp"]
    },
    shortDescription: "6 hand-dipped gourmet strawberries in Belgian chocolate with artisan drizzle and crushed pistachio.",
    description: "Our signature florist delicacy: 6 ripe, succulent strawberries hand-dipped in rich Belgian dark and creamy milk chocolate, crowned with white chocolate drizzle and crushed Sicilian pistachios. Presented in a luxury keepsake box.",
    sizes: [
      { id: "standard", name: "6-Piece Luxury Box", stems: "6 Confections", price: 22, default: true }
    ],
    vases: [
      { id: "none", name: "Gold-Foil Keepsake Box", price: 0 }
    ],
    stems: []
  },
  {
    id: "french-macarons",
    slug: "french-macarons",
    name: "French Macaron Collection",
    subtitle: "Assorted Parisian Pastel Macarons (12-Piece)",
    category: "gift",
    occasion: "Celebrations",
    tag: "Artisanal",
    rating: 4.9,
    reviewCount: 84,
    images: {
      primary: "images/macarons.webp",
      gallery: ["images/macarons.webp"]
    },
    shortDescription: "12 delicate French macarons in rose petal, pistachio, lavender, vanilla, and salted caramel.",
    description: "Crisp almond meringue shells with luscious ganache centers. Flavors include Rose Petal, Roasted Pistachio, Earl Grey Lavender, Tahitian Vanilla, Fleur de Sel Caramel, and 70% Dark Chocolate. Packed in an elegant sliding sleeve box.",
    sizes: [
      { id: "standard", name: "12-Piece Collection", stems: "12 Macarons", price: 18, default: true }
    ],
    vases: [
      { id: "none", name: "Pastel Gift Sleeve", price: 0 }
    ],
    stems: []
  },
  {
    id: "hot-chocolate-kit",
    slug: "hot-chocolate-kit",
    name: "Luxe Belgian Hot Chocolate Kit",
    subtitle: "Single-Origin Cocoa, Marshmallows & Stirring Spoon",
    category: "gift",
    occasion: "Everyday",
    tag: "Winter Warmth",
    rating: 4.9,
    reviewCount: 47,
    images: {
      primary: "images/hot-chocolate.webp",
      gallery: ["images/hot-chocolate.webp"]
    },
    shortDescription: "Artisanal Belgian hot cocoa blend with gourmet vanilla bean marshmallows and solid dark chocolate stirring spoon.",
    description: "The ultimate cozy treat. Single-origin Belgian cocoa powder mix, fluffy vanilla bean marshmallows, and a hand-dipped dark chocolate stirring spoon in a rustic craft gift cylinder tied with satin ribbon.",
    sizes: [
      { id: "standard", name: "Gourmet Hot Cocoa Kit", stems: "Full Kit", price: 16, default: true }
    ],
    vases: [
      { id: "none", name: "Botanical Kraft Tube", price: 0 }
    ],
    stems: []
  },
  {
    id: "botanical-spa-trio",
    slug: "botanical-spa-trio",
    name: "Botanical Spa Trio Ritual",
    subtitle: "Rose Bath Bomb, Lavender Soap & Shower Steamer",
    category: "gift",
    occasion: "Self-Care",
    tag: "Pampering",
    rating: 5.0,
    reviewCount: 56,
    images: {
      primary: "images/spa-trio.webp",
      gallery: ["images/spa-trio.webp"]
    },
    shortDescription: "Handmade botanical bath ritual: English rose petal bath bomb, lavender oat milk soap, and eucalyptus shower steamer.",
    description: "Turn any evening into a serene botanical retreat. Formulated with organic botanical oils, real dried rose petals, soothing colloidal oatmeal, and pure eucalyptus essential oils. Arranged in a woven bamboo fiber tray.",
    sizes: [
      { id: "standard", name: "3-Piece Spa Set", stems: "3 Spa Items", price: 20, default: true }
    ],
    vases: [
      { id: "none", name: "Natural Fiber Gift Tray", price: 0 }
    ],
    stems: []
  },
  {
    id: "silk-scrunchies",
    slug: "silk-scrunchies",
    name: "Floral Mulberry Silk Scrunchies",
    subtitle: "100% Mulberry Silk in Botanical Print Shades (3-Pack)",
    category: "gift",
    occasion: "Everyday",
    tag: "Keepsake",
    rating: 4.9,
    reviewCount: 39,
    images: {
      primary: "images/silk-scrunchies.webp",
      gallery: ["images/silk-scrunchies.webp"]
    },
    shortDescription: "Set of 3 Grade 6A mulberry silk hair scrunchies in blush peony, sage eucalyptus, and cream dahlia.",
    description: "Ultra-gentle on hair and wrist. Made from 100% 22-momme pure mulberry silk printed with delicate botanical watercolors. Comes in an ivory sheer organza pouch with gold drawstring.",
    sizes: [
      { id: "standard", name: "Set of 3 Silk Scrunchies", stems: "3 Scrunchies", price: 14, default: true }
    ],
    vases: [
      { id: "none", name: "Sheer Organza Pouch", price: 0 }
    ],
    stems: []
  },
  {
    id: "artisan-honey-tea",
    slug: "artisan-honey-tea",
    name: "Artisan Wildflower Honey & Tea Duo",
    subtitle: "Raw Floral Honey (4 oz) & Loose Chamomile Lavender",
    category: "gift",
    occasion: "Get Well & Cheer",
    tag: "Farmhouse",
    rating: 4.8,
    reviewCount: 42,
    images: {
      primary: "images/honey-tea.webp",
      gallery: ["images/honey-tea.webp"]
    },
    shortDescription: "Small-batch raw wildflower honey with wooden dipper paired with relaxing chamomile lavender tea blend.",
    description: "A soothing garden harvest. Includes a 4 oz hexagonal jar of pure unpasteurized wildflower blossom honey, mini beechwood honey dipper, and 10 biodegradable pyramid sachets of soothing chamomile and lavender blossom tea.",
    sizes: [
      { id: "standard", name: "Honey & Tea Pairing", stems: "Honey + 10 Sachets", price: 15, default: true }
    ],
    vases: [
      { id: "none", name: "Rustic Kraft Window Box", price: 0 }
    ],
    stems: []
  },
  {
    id: "photo-keepsake-card",
    slug: "photo-keepsake-card",
    name: "Personalized Keepsake Greeting Card",
    subtitle: "Gold Foil Cotton Cardstock & Wax-Sealed Envelope",
    category: "gift",
    occasion: "Celebrations",
    tag: "Bespoke",
    rating: 5.0,
    reviewCount: 78,
    images: {
      primary: "images/photo-card.webp",
      gallery: ["images/photo-card.webp"]
    },
    shortDescription: "Heavy cotton greeting card with gold foil trim, personalized printed message, and real wax seal.",
    description: "Elevate your heartfelt message. Printed on 350gsm textured Italian cotton cardstock with embossed gold foil borders and sealed inside a translucent vellum envelope with a botanical wax medallion.",
    sizes: [
      { id: "standard", name: "Keepsake Card & Wax Seal", stems: "Custom Stationery", price: 8, default: true }
    ],
    vases: [
      { id: "none", name: "Vellum Envelope & Wax Seal", price: 0 }
    ],
    stems: []
  },
  {
    id: "bloom-bear",
    slug: "bloom-bear",
    name: "Petite Bloom Bear with Preserved Posy",
    subtitle: "10-Inch Plush Bear with Handcrafted Everlasting Flower",
    category: "gift",
    occasion: "Celebrations",
    tag: "Keepsake",
    rating: 4.9,
    reviewCount: 65,
    images: {
      primary: "images/bloom-bear.webp",
      gallery: ["images/bloom-bear.webp"]
    },
    shortDescription: "Ultra-soft 10\" plush keepsake bear holding a miniature bouquet of preserved baby's breath and blush spray rose.",
    description: "The sweetest companion for milestone celebrations and welcoming new arrivals. Crafted with velvety plush fur in heirloom cream, gently clutching a real preserved mini floral posy that lasts indefinitely.",
    sizes: [
      { id: "standard", name: "10-Inch Plush Bear", stems: "Plush + Preserved Posy", price: 16, default: true }
    ],
    vases: [
      { id: "none", name: "Signature Taupe Ribbon", price: 0 }
    ],
    stems: []
  },
  {
    id: "champagne-truffles",
    slug: "champagne-truffles",
    name: "Artisanal Champagne Truffles",
    subtitle: "Belgian Dark Chocolate & Marc de Champagne",
    category: "gift",
    occasion: "Celebrations",
    tag: "Add-On",
    rating: 4.9,
    reviewCount: 94,
    images: {
      primary: "images/truffles.webp",
      gallery: ["images/truffles.webp"]
    },
    shortDescription: "8-piece artisan Belgian dark chocolate truffles with champagne ganache.",
    description: "Handcrafted Belgian dark chocolate truffles infused with authentic French Marc de Champagne and dusted with fine cocoa powder. The ultimate sweet complement to any fresh bouquet.",
    sizes: [
      { id: "standard", name: "8-Piece Keepsake Box", stems: "8 Confections", price: 12, default: true }
    ],
    vases: [
      { id: "none", name: "Luxury Gift Box & Ribbon", price: 0 }
    ],
    stems: []
  },
  {
    id: "botanical-candle",
    slug: "botanical-candle",
    name: "Rose & Santal Botanical Candle",
    subtitle: "Hand-Poured Coconut Soy Wax (50-hr Burn)",
    category: "gift",
    occasion: "Everyday",
    tag: "Add-On",
    rating: 5.0,
    reviewCount: 62,
    images: {
      primary: "images/candle.webp",
      gallery: ["images/candle.webp"]
    },
    shortDescription: "Hand-poured coconut soy candle with Bulgarian rose and warm Australian sandalwood.",
    description: "An artisanal hand-poured botanical candle blending Damascus rose petals, velvet santal, and cedarwood notes in a luxury amber glass vessel. Clean 50-hour burn.",
    sizes: [
      { id: "standard", name: "8 oz Amber Glass Jar", stems: "50-Hour Burn", price: 16, default: true }
    ],
    vases: [
      { id: "none", name: "Signature Kraft Box", price: 0 }
    ],
    stems: []
  },
  {
    id: "brass-shears",
    slug: "brass-shears",
    name: "Florist Brass Pruning Shears",
    subtitle: "Heavy-Gauge Botanical Conditioning Shears",
    category: "gift",
    occasion: "Care",
    tag: "Essential",
    rating: 4.9,
    reviewCount: 48,
    images: {
      primary: "images/shears.webp",
      gallery: ["images/shears.webp"]
    },
    shortDescription: "Precision brass-plated shears for clean 45-degree floral stem conditioning.",
    description: "Designed for floral care enthusiasts. Heavy-gauge brass alloy construction with razor-sharp carbon steel blades, ensuring clean 45-degree angle cuts for optimal stem hydration.",
    sizes: [
      { id: "standard", name: "Classic 7-Inch Shears", stems: "Carbon Steel Blade", price: 18, default: true }
    ],
    vases: [
      { id: "none", name: "Cotton Storage Pouch", price: 0 }
    ],
    stems: []
  }
];

/**
 * Get product by slug identifier (checks main catalog and gift add-ons)
 */
export function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) || GIFT_ADDONS.find(p => p.slug === slug) || null;
}

/**
 * Get only Featured & Best-Selling arrangements for homepage curation (excluding combo sets which have their own showcase)
 */
export function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.category !== "combo" && (p.featured || p.tag === "Bestseller" || p.rating >= 4.9)).slice(0, 6);
}

/**
 * Get all curated gift combos
 */
export function getGiftCombos() {
  return PRODUCTS.filter(p => p.category === "combo" || p.isCombo);
}

/**
 * Get gift sets intended for the standard multi-card homepage showcase.
 */
export function getGiftCombosForGrid() {
  return getGiftCombos().filter(combo => combo.homepagePlacement !== "banner");
}

/**
 * Get the singular gift set highlighted in the homepage feature banner.
 */
export function getHomepageComboBanner() {
  return getGiftCombos().find(combo => combo.homepagePlacement === "banner") || null;
}

/**
 * Get curated gift sets that include a given catalogue item.
 */
export function getGiftCombosForProduct(slug) {
  return getGiftCombos().filter(combo =>
    combo.comboItems?.some(item => item.slug === slug)
  );
}

/**
 * Get gift-set upgrades that can safely replace a single bag item. A set is
 * not offered when the bag already contains that set or another component of it.
 */
export function getGiftComboUpgradesForCartItem(item, cartItems = []) {
  if (!item || item.isCombo) return [];

  return getGiftCombosForProduct(item.slug).filter(combo => {
    const matchingComponent = combo.comboItems?.find(component => component.slug === item.slug);
    const matchesCuratedPresentation = matchingComponent
      && matchingComponent.sizeId === item.size?.id
      && matchingComponent.vaseId === item.vase?.id;
    const setOrComponentAlreadyInBag = cartItems.some(cartItem =>
      cartItem.id !== item.id && (
        cartItem.slug === combo.slug
        || combo.comboItems?.some(component => component.slug === cartItem.slug)
      )
    );
    return matchesCuratedPresentation && !setOrComponentAlreadyInBag;
  });
}

/**
 * Filter catalog products by category
 */
export function getProductsByCategory(category = "all") {
  if (!category || category === "all") return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * Get all unique categories
 */
export function getAllCategories() {
  return ["all", "bouquet", "combo", "luxury", "gift", "celebration"];
}

/**
 * Get all unique occasions
 */
export function getAllOccasions() {
  const occasions = new Set(PRODUCTS.map(p => p.occasion));
  return ["all", ...Array.from(occasions)];
}

/**
 * Search products by keyword
 */
export function searchProducts(keyword = "") {
  if (!keyword) return PRODUCTS;
  const term = keyword.toLowerCase().trim();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(term) ||
    p.subtitle.toLowerCase().includes(term) ||
    p.category.toLowerCase().includes(term) ||
    p.occasion.toLowerCase().includes(term) ||
    p.description.toLowerCase().includes(term) ||
    (p.stems && p.stems.some(s => s.name.toLowerCase().includes(term))) ||
    (p.comboIncludes && p.comboIncludes.some(c => c.toLowerCase().includes(term)))
  );
}

/**
 * Get affordable / petite luxury products (starting price <= $48)
 */
export function getAffordableProducts() {
  return PRODUCTS.filter(p => {
    const minPrice = Math.min(...p.sizes.map(s => s.price));
    return minPrice <= 48;
  }).sort((a, b) => {
    const minA = Math.min(...a.sizes.map(s => s.price));
    const minB = Math.min(...b.sizes.map(s => s.price));
    return minA - minB;
  });
}
