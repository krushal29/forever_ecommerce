import { Router } from "express";
import {addProduct,latestproduct,bestProduct,alldata,deleteDataAdmin,addcard,addcart,addcart1,deleteCart,counter} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productroute=Router();

productroute.post(
    '/add',
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
    ]),
    addProduct
);
productroute.get('/alldata',alldata);
productroute.get('/latest',latestproduct);
productroute.get('/best',bestProduct);
productroute.post('/delete',deleteDataAdmin);
productroute.post('/addcard',addcard);
productroute.get('/getcart',addcart);
productroute.post('/addcart1',addcart1);
productroute.post('/deleteCart',deleteCart);
productroute.post('/countercart',counter);
export default productroute;