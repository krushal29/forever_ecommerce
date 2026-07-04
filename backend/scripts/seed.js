import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productDetailmodel from '../models/productModel.js';

dotenv.config();

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/forever';

// Sample high-quality Unsplash clothing images
const imagesMap = {
  Men: {
    Topwear: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503341455253-b2bc71f093f6?w=600&auto=format&fit=crop&q=80"
    ],
    Bottomwear: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
    ],
    Winterwear: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608063615781-e5ef7bb7abd9?w=600&auto=format&fit=crop&q=80"
    ]
  },
  Women: {
    Topwear: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80"
    ],
    Bottomwear: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=600&auto=format&fit=crop&q=80"
    ],
    Winterwear: [
      "https://images.unsplash.com/photo-1608063615781-e5ef7bb7abd9?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80"
    ]
  },
  Kids: {
    Topwear: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1622273509386-7a1309ec9881?w=600&auto=format&fit=crop&q=80"
    ],
    Bottomwear: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80"
    ],
    Winterwear: [
      "https://images.unsplash.com/photo-1608063615781-e5ef7bb7abd9?w=600&auto=format&fit=crop&q=80"
    ]
  }
};

const adjectives = ["Premium", "Classic", "Urban", "Casual", "Luxury", "Smart", "Slim Fit", "Vintage", "Designer", "Modern"];
const categories = ["Men", "Women", "Kids"];
const subcategories = ["Topwear", "Bottomwear", "Winterwear"];
const sizes = ["S", "M", "L", "XL", "XXL"];

const generateProducts = () => {
  const products = [];
  
  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const subCategory = subcategories[Math.floor(Math.random() * subcategories.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    // Choose correct image list
    const categoryImages = imagesMap[category][subCategory] || imagesMap["Men"]["Topwear"];
    // Shuffle and pick 2-3 images
    const images = [...categoryImages].sort(() => 0.5 - Math.random()).slice(0, 3);

    // Pick 2-4 random sizes
    const productSizes = [...sizes].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2);

    const price = Math.floor(Math.random() * 1900) + 199; // Rs. 199 to Rs. 2098
    const bestseller = Math.random() > 0.7; // 30% bestsellers

    products.push({
      ProductName: `${adj} ${category} ${subCategory === 'Topwear' ? 'Shirt' : subCategory === 'Bottomwear' ? 'Trousers' : 'Jacket'} ${i}`,
      ProductDescription: `A high-quality and durable ${category.toLowerCase()} ${subCategory.toLowerCase()} item designed for daily wear. Made with premium breathable fabrics to ensure maximum comfort throughout the day. Perfect for casual, smart-casual, or festive styling options.`,
      ProductCategory: category,
      SubCategory: subCategory,
      ProductPrice: price,
      ProductSizes: productSizes,
      images: images,
      bestseller: bestseller,
      date: Date.now() - (i * 3600000) // Staggered creation time
    });
  }
  
  return products;
};

const seedDB = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(mongoUrl);
    console.log("Database Connected Successfully.");

    // Delete existing products to avoid duplicate noise
    console.log("Cleaning existing products...");
    await productDetailmodel.deleteMany({});
    console.log("Database cleaned.");

    const seedProducts = generateProducts();
    console.log(`Inserting ${seedProducts.length} new products...`);
    await productDetailmodel.insertMany(seedProducts);
    
    console.log("Database seeded successfully with 50 products!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
