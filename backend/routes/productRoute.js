import { Router } from "express";
import { addProduct, latestproduct, bestProduct, alldata, deleteDataAdmin, addcard, addcart, addcart1, deleteCart, counter, updateStock, updateProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { authUser, authAdmin } from "../middleware/auth.js";

const productroute = Router();

productroute.post(
    '/add',
    authAdmin,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
    ]),
    addProduct
);

productroute.post(
    '/update',
    authAdmin,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
    ]),
    updateProduct
);

productroute.get('/alldata', alldata);
productroute.get('/latest', latestproduct);
productroute.get('/best', bestProduct);
productroute.post('/delete', authAdmin, deleteDataAdmin);
productroute.post('/addcard', authUser, addcard);
productroute.get('/getcart', authUser, addcart);
productroute.post('/addcart1', addcart1); // Fetching product info for items in cart (can be public or authenticated, let's keep it public as it only queries product model based on array of IDs)
productroute.post('/deleteCart', authUser, deleteCart);
productroute.post('/countercart', authUser, counter);
productroute.post('/update-stock', authAdmin, updateStock);

export default productroute;