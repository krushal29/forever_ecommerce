import productDetailmodel from "../models/productModel.js";
import userModel from "../models/user.js";
import { v2 as cloudinary } from 'cloudinary';

//add product
const addProduct = async (req, res) => {
   try {
      const { ProductName, ProductDescription, ProductSizes, ProductCategory, SubCategory, SubCategor, ProductPrice, bestseller, ProductStock } = req.body;

      if (!ProductName || !ProductDescription || !ProductCategory || !ProductPrice) {
         return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      const activeSubCategory = SubCategory || SubCategor || "Topwear";

      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];
      
      const images = [image1, image2, image3, image4].filter((data) => data !== undefined && data !== null);

      let imgurl = [];
      if (images.length > 0) {
         imgurl = await Promise.all(images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
            return result.secure_url;
         }));
      }

      // Parse sizes if sent as JSON string or string array
      let parsedSizes = ProductSizes;
      if (typeof ProductSizes === 'string') {
         try {
            parsedSizes = JSON.parse(ProductSizes);
         } catch (e) {
            parsedSizes = ProductSizes.split(',').map(s => s.trim());
         }
      }

      const product = new productDetailmodel({
         images: imgurl,
         ProductName: ProductName.trim(),
         ProductDescription: ProductDescription.trim(),
         ProductSizes: parsedSizes || [],
         ProductCategory: ProductCategory.trim(),
         SubCategory: activeSubCategory.trim(),
         ProductPrice: Number(ProductPrice),
         ProductStock: Number(ProductStock) || 0,
         bestseller: bestseller === 'true' || bestseller === true
      });
      
      await product.save();
      return res.status(201).json({ success: true, message: "Product added successfully" });

   } catch (error) {
      console.error('Error in addProduct:', error);
      return res.status(500).json({ success: false, message: error.message });
   }
};

const latestproduct = async (req, res) => {
   try {
      const data = await productDetailmodel.find().sort({ createdAt: -1 }).limit(10);
      return res.send(data);
   } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
   }
}

const bestProduct = async (req, res) => {
   try {
      const data = await productDetailmodel.find({ bestseller: true }).limit(5);
      return res.send(data);
   } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
   }
}

const alldata = async (req, res) => {
   try {
      const data = await productDetailmodel.find().sort({ createdAt: -1 });
      return res.send(data);
   } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
   }
}

const deleteDataAdmin = async (req, res) => {
   try {
      const { id } = req.body;
      if (!id) {
         return res.status(400).json({ success: false, message: "Product ID required" });
      }
      await productDetailmodel.deleteOne({ _id: id });
      const data = await productDetailmodel.find().sort({ createdAt: -1 });
      return res.send(data);
   } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
   }
}

const addcard = async (req, res) => {
   try {
      const userId = req.userId;
      const { filter, btn, qty } = req.body;

      if (!filter || filter.length === 0 || !btn) {
         return res.status(400).json({ success: false, message: "Invalid product parameters or size selection" });
      }

      const productId = filter[0]._id;
      const btnSize = btn;
      const quantity = Number(qty) || 1;

      const user = await userModel.findById(userId);
      if (!user) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      const filterdata = user.cartData.find((val) => val._id === productId && val.BtnSize === btnSize);
      let count1 = filterdata ? filterdata.count : 0;

      if (!filterdata) {
         await userModel.updateOne(
            { _id: userId },
            { $push: { cartData: { _id: productId, count: quantity, BtnSize: btnSize } } }
         );
      } else {
         await userModel.updateOne(
            { _id: userId },
            { $set: { "cartData.$[item].count": count1 + quantity } },
            { arrayFilters: [{ "item._id": productId, "item.BtnSize": btnSize }] }
         );
      }
      
      const updatedUser = await userModel.findById(userId);
      return res.json({ success: true, cartData: updatedUser.cartData });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
   }
}

const addcart = async (req, res) => {
   try {
      const userId = req.userId;
      const user = await userModel.findById(userId);
      if (!user) {
         return res.status(404).json({ success: false, message: "User not found" });
      }
      return res.send(user);
   } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
   }
}

const addcart1 = async (req, res) => {
   try {
      const cartItems = req.body; // array of cart item details
      if (!Array.isArray(cartItems)) {
         return res.status(400).json({ success: false, message: "Invalid payload format" });
      }
      const productIds = cartItems.map(item => item._id);
      const data1 = await productDetailmodel.find({ _id: { $in: productIds } });
      return res.send(data1);
   } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
   }
}

const deleteCart = async (req, res) => {
   try {
      const userId = req.userId;
      const { id, btn } = req.body;

      if (!id || !btn) {
         return res.status(400).json({ success: false, message: "Product ID and size required" });
      }

      await userModel.updateOne(
         { _id: userId },
         { $pull: { cartData: { _id: id, BtnSize: btn } } }
      );

      const findUpdateData = await userModel.findById(userId);
      return res.send(findUpdateData);
   } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
   }
}

const counter = async (req, res) => {
   try {
      const userId = req.userId;
      const { id, updatecount, btn1 } = req.body;

      if (!id || updatecount === undefined || !btn1) {
         return res.status(400).json({ success: false, message: "Missing required update parameters" });
      }

      const updatedata = await userModel.updateOne(
         {
            _id: userId,
            "cartData._id": id,
            "cartData.BtnSize": btn1
         },
         {
            $set: { "cartData.$[ele].count": updatecount }
         }, 
         { arrayFilters: [{ "ele._id": id, "ele.BtnSize": btn1 }] }
      );
      return res.send(updatedata);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
   }
}

const updateStock = async (req, res) => {
   try {
      const { id, stock } = req.body;
      if (!id || stock === undefined) {
         return res.status(400).json({ success: false, message: "Product ID and stock value required" });
      }
      
      const updatedProduct = await productDetailmodel.findByIdAndUpdate(
         id,
         { ProductStock: Number(stock) },
         { new: true }
      );
      
      if (!updatedProduct) {
         return res.status(404).json({ success: false, message: "Product not found" });
      }
      
      return res.json({ success: true, message: "Stock updated successfully", product: updatedProduct });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
   }
}

const updateProduct = async (req, res) => {
   try {
      const { id, ProductName, ProductDescription, ProductSizes, ProductCategory, SubCategory, ProductPrice, ProductStock, bestseller } = req.body;

      if (!id) {
         return res.status(400).json({ success: false, message: "Product ID required" });
      }

      // Handle sizes
      let parsedSizes = ProductSizes;
      if (typeof ProductSizes === 'string') {
         try {
            parsedSizes = JSON.parse(ProductSizes);
         } catch (e) {
            parsedSizes = ProductSizes.split(',').map(s => s.trim());
         }
      }

      // Check if new images are uploaded
      let imgurl = undefined;
      if (req.files) {
         const image1 = req.files.image1 && req.files.image1[0];
         const image2 = req.files.image2 && req.files.image2[0];
         const image3 = req.files.image3 && req.files.image3[0];
         const image4 = req.files.image4 && req.files.image4[0];
         
         const images = [image1, image2, image3, image4].filter((data) => data !== undefined && data !== null);
         if (images.length > 0) {
            imgurl = await Promise.all(images.map(async (item) => {
               let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
               return result.secure_url;
            }));
         }
      }

      const updateData = {
         ProductName: ProductName ? ProductName.trim() : undefined,
         ProductDescription: ProductDescription ? ProductDescription.trim() : undefined,
         ProductCategory: ProductCategory ? ProductCategory.trim() : undefined,
         SubCategory: SubCategory ? SubCategory.trim() : undefined,
         ProductPrice: ProductPrice !== undefined ? Number(ProductPrice) : undefined,
         ProductStock: ProductStock !== undefined ? Number(ProductStock) : undefined,
         bestseller: bestseller !== undefined ? (bestseller === 'true' || bestseller === true) : undefined,
         ProductSizes: parsedSizes
      };

      // Clean undefined keys
      Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

      if (imgurl && imgurl.length > 0) {
         updateData.images = imgurl;
      }

      const updatedProduct = await productDetailmodel.findByIdAndUpdate(
         id,
         updateData,
         { new: true }
      );

      if (!updatedProduct) {
         return res.status(404).json({ success: false, message: "Product not found" });
      }

      const data = await productDetailmodel.find().sort({ createdAt: -1 });
      return res.json({ success: true, message: "Product updated successfully", products: data });

   } catch (error) {
      console.error('Error in updateProduct:', error);
      return res.status(500).json({ success: false, message: error.message });
   }
};

export { addProduct, latestproduct, bestProduct, alldata, deleteDataAdmin, addcard, addcart, addcart1, deleteCart, counter, updateStock, updateProduct };