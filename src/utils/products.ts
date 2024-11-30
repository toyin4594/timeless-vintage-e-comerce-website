import { Product } from '../types';

// Helper function to generate unique IDs
const generateId = (index: number) => `vintage-${index.toString().padStart(4, '0')}`;

// Helper function to get random measurements based on size
const getMeasurements = (size: string) => {
  const measurements = {
    'XS': { bust: '32"', waist: '24"', hips: '34"' },
    'S': { bust: '34"', waist: '26"', hips: '36"' },
    'M': { bust: '36"', waist: '28"', hips: '38"' },
    'L': { bust: '38"', waist: '30"', hips: '40"' },
    'XL': { bust: '40"', waist: '32"', hips: '42"' }
  };
  return measurements[size] || measurements['M'];
};

// Curated Unsplash collections for vintage fashion
const VINTAGE_COLLECTIONS = {
  dresses: [
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1583396060233-3d13dcd1e668?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80&fit=crop'
  ],
  suits: [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1598808503246-a4d89c389a4c?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=1200&q=80&fit=crop'
  ],
  outerwear: [
    'https://images.unsplash.com/photo-1578948856697-db91d246b7b8?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=1200&q=80&fit=crop'
  ],
  tops: [
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1200&q=80&fit=crop'
  ],
  bottoms: [
    'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=1200&q=80&fit=crop'
  ],
  accessories: [
    'https://images.unsplash.com/photo-1611923134239-b9be5b4d1b42?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1609178016676-dfec9c436b76?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1575891467811-49e2d8e0d1cc?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1612902456551-333ac5afa26e?w=1200&q=80&fit=crop'
  ],
  shoes: [
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1600054904350-1d493ae5f922?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1595341887894-73647c51c3b3?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=1200&q=80&fit=crop'
  ]
};

// Product categories with subcategories
const categories = {
  dresses: ['Evening', 'Cocktail', 'Day', 'Wedding', 'Party'],
  suits: ['Business', 'Formal', 'Tuxedo', 'Two-piece', 'Three-piece'],
  outerwear: ['Coats', 'Jackets', 'Blazers', 'Capes', 'Trenches'],
  tops: ['Blouses', 'Shirts', 'Sweaters', 'T-shirts', 'Vests'],
  bottoms: ['Skirts', 'Pants', 'Shorts', 'Jeans', 'Culottes'],
  accessories: ['Hats', 'Bags', 'Scarves', 'Belts', 'Jewelry'],
  shoes: ['Heels', 'Flats', 'Boots', 'Sandals', 'Oxfords']
};

// Materials by category
const materialsByCategory = {
  dresses: ['Silk', 'Chiffon', 'Velvet', 'Cotton', 'Lace', 'Satin'],
  suits: ['Wool', 'Tweed', 'Linen', 'Cotton', 'Polyester'],
  outerwear: ['Wool', 'Leather', 'Cotton', 'Polyester', 'Fur'],
  tops: ['Cotton', 'Silk', 'Linen', 'Polyester', 'Rayon'],
  bottoms: ['Denim', 'Cotton', 'Wool', 'Polyester', 'Linen'],
  accessories: ['Leather', 'Silk', 'Cotton', 'Metal', 'Plastic'],
  shoes: ['Leather', 'Suede', 'Canvas', 'Patent Leather', 'Satin']
};

// Era-specific design elements
const eraDetails = {
  '50s': {
    keywords: ['full skirt', 'peter pan collar', 'circle dress', 'pencil skirt', 'swing coat'],
    designers: ['Christian Dior', 'Coco Chanel', 'Claire McCardell', 'Jacques Fath']
  },
  '60s': {
    keywords: ['mini dress', 'go-go boots', 'shift dress', 'mod', 'space age'],
    designers: ['Mary Quant', 'Pierre Cardin', 'André Courrèges', 'Emilio Pucci']
  },
  '70s': {
    keywords: ['bell bottoms', 'platform shoes', 'maxi dress', 'bohemian', 'disco'],
    designers: ['Yves Saint Laurent', 'Halston', 'Diane von Furstenberg', 'Bill Gibb']
  },
  '80s': {
    keywords: ['power suit', 'shoulder pads', 'sequins', 'neon', 'oversized'],
    designers: ['Thierry Mugler', 'Christian Lacroix', 'Jean Paul Gaultier', 'Azzedine Alaïa']
  },
  '90s': {
    keywords: ['slip dress', 'grunge', 'minimalist', 'crop top', 'platform sneakers'],
    designers: ['Calvin Klein', 'Marc Jacobs', 'Versace', 'Alexander McQueen']
  }
};

// Helper function to get high-quality images for a category
const getHighQualityImage = (category: string, index: number) => {
  const images = VINTAGE_COLLECTIONS[category];
  return images[index % images.length];
};

// Generate 1000 products
export const vintageCollection: Product[] = Array.from({ length: 1000 }, (_, index) => {
  // Determine category and subcategory
  const categoryKeys = Object.keys(categories);
  const category = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
  const subcategories = categories[category];
  const subcategory = subcategories[Math.floor(Math.random() * subcategories.length)];

  // Determine era and get era-specific details
  const eras = ['50s', '60s', '70s', '80s', '90s'] as const;
  const era = eras[Math.floor(Math.random() * eras.length)];
  const { keywords, designers } = eraDetails[era];

  // Generate price based on condition and category
  const conditions = ['Excellent', 'Very Good', 'Good', 'Fair'] as const;
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const basePrice = {
    dresses: 200,
    suits: 300,
    outerwear: 250,
    tops: 100,
    bottoms: 150,
    accessories: 80,
    shoes: 120
  }[category];
  const conditionMultiplier = {
    'Excellent': 1.5,
    'Very Good': 1.2,
    'Good': 1.0,
    'Fair': 0.7
  }[condition];
  const price = Math.round(basePrice * conditionMultiplier * (0.8 + Math.random() * 0.4));

  // Generate sizes and stock
  const allSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const availableSizes = allSizes.map(size => ({
    name: size,
    available: Math.random() > 0.3,
    quantity: Math.floor(Math.random() * 3)
  }));

  // Select material
  const materials = materialsByCategory[category];
  const material = materials[Math.floor(Math.random() * materials.length)];

  // Generate description
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];
  const designer = Math.random() > 0.7 ? designers[Math.floor(Math.random() * designers.length)] : null;
  const description = designer
    ? `Authentic ${era} ${material} ${subcategory.toLowerCase()} featuring ${keyword} design. Created by ${designer}.`
    : `Vintage ${era} ${material} ${subcategory.toLowerCase()} featuring ${keyword} design. A perfect example of ${era} fashion.`;

  return {
    id: generateId(index),
    name: `${era} ${material} ${subcategory}`,
    description,
    price,
    images: [getHighQualityImage(category, index)],
    category,
    era,
    condition,
    sizes: availableSizes,
    measurements: getMeasurements(availableSizes[0].name),
    material,
    provenance: Math.random() > 0.8 
      ? `Sourced from a private collection in ${['Paris', 'London', 'New York', 'Milan', 'Tokyo'][Math.floor(Math.random() * 5)]}` 
      : undefined,
    inStock: availableSizes.some(size => size.available && size.quantity > 0)
  };
});

export const getProducts = (): Product[] => vintageCollection;

export const getProduct = (id: string): Product | undefined => 
  vintageCollection.find(product => product.id === id);

export const getProductsByCategory = (category: string): Product[] =>
  category === 'all' 
    ? vintageCollection 
    : vintageCollection.filter(product => 
        product.category.toLowerCase() === category.toLowerCase() ||
        product.era.toLowerCase() === category.toLowerCase()
      );

export const searchProducts = (query: string): Product[] =>
  vintageCollection.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.era.toLowerCase().includes(query.toLowerCase()) ||
    product.material.toLowerCase().includes(query.toLowerCase())
  );