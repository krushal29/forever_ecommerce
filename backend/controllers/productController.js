import productDetailmodel from "../models/productModel.js"
import userModel from "../models/user.js";
import { v2 as cloudinary } from 'cloudinary'




//add product
const addProduct = async (req, res) => {
   try {


      // console.log(req.files);

      //  res.send(req.body);
      const { ProductName, ProductDescription, ProductSizes, ProductCategory, SubCategor, ProductPrice, bestseller } = req.body;

      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];
      // console.log(image1, ProductName, ProductDescription, ProductSizes, ProductCategory, SubCategor, ProductPrice, bestseller);
      // console.log(image1, image2, image3, image4);
      const images = [image1, image2, image3, image4].filter((data) => data !== undefined && data !== null);
      // console.log("images",images);


      let imgurl = await Promise.all(images.map(async (item) => {
         let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
         return result.secure_url;
      }))

      const product = new productDetailmodel({
         images: imgurl,
         ProductName,
         ProductDescription,
         ProductSizes,
         ProductCategory,
         SubCategor,
         ProductPrice,
         bestseller
      })
      await product.save();
      res.send("sucess");

   } catch (error) {
      console.error('Error in addProduct:', error);
      res.status(500).json({ message: error.message });
   }
};






const latestproduct = async (req, res) => {
   const data = await productDetailmodel.find().limit(10);
   return res.send(data);
}

const bestProduct = async (req, res) => {
   const data = await productDetailmodel.find({ bestseller: true }).limit(5);
   return res.send(data);
}

const alldata = async (req, res) => {
   const data = await productDetailmodel.find();
   return res.send(data)
}

const deleteDataAdmin = async (req, res) => {
   const { id } = req.body;
   // console.log(id);

   const updeteData = await productDetailmodel.deleteOne({ _id: id });
   const data = await productDetailmodel.find();
   return res.send(data);
}


const addcard = async (req, res) => {
   console.log("body", req.body);

   const { _id } = req.body.filter[0];
   // console.log(_id);

   const btnSize = req.body.btn;
   // console.log("BtnSize", btnSize);

   // console.log(_id);
   const data = await userModel.findOne({ IsLogin: true });
   // console.log("data",data);

   const filterdata = data.cartData.find((val) => val._id === _id && val.BtnSize === btnSize);
   // console.log("filterdata", filterdata);
   let count1;
   if (filterdata) {
      count1 = filterdata.count;
   }
   else {
      count1 = 1;
   }
   // console.log(count1);
   if (!filterdata) {
      const updateResult = await userModel.updateOne({ IsLogin: true }, { $push: { cartData: { _id, count: 1, BtnSize: btnSize } } });
      // console.log(updateResult)
   }
   else {
      const updateResult = await userModel.updateOne(
         { IsLogin: true },
         {
            $set: { "cartData.$[item].count": count1 + 1 }
         },
         {
            arrayFilters: [
               {
                  "item._id": _id,
                  "item.BtnSize": btnSize
               }
            ]
         }
      );
      // console.log(updateResult)

   }


}

const addcart = async (req, res) => {
   const data1 = await userModel.findOne({ IsLogin: true });
   // console.log("data", data1);

   return res.send(data1);
}


const addcart1 = async (req, res) => {
   const id = req.body;


   const data1 = await productDetailmodel.find({ _id: id });
   // console.log("imformation", data1);
   return res.send(data1)


}

const deleteCart = async (req, res) => {

   const { id, btn } = req.body;
   // console.log("id", id);
   try {

      const updatedata = await userModel.updateOne({ IsLogin: true, "cartData._id": id }, { $pull: { "cartData": { _id: id, BtnSize: btn } } });

      const findUpdateData = await userModel.findOne({ IsLogin: true });
      res.send(findUpdateData);

   } catch (err) {
      console.log(err);
   }

   // console.log("delete");
}


const counter = async (req, res) => {

   // console.log(req.body);
   const { id, updatecount, btn1 } = req.body;
   // console.log("df", id, btn1, updatecount);


   const updatedata = await userModel.updateOne(
      {
         IsLogin: true,
         "cartData._id": id,
         "cartData.BtnSize": btn1
      },
      {
         $set: { "cartData.$[ele].count": updatecount }
      }, { arrayFilters: [{ "ele._id": id, "ele.BtnSize": btn1 }] }
   );
   res.send(updatedata);
}


export { addProduct, latestproduct, bestProduct, alldata, deleteDataAdmin, addcard, addcart, addcart1, deleteCart, counter };