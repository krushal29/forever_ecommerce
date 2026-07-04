import { Router } from "express";
import { addData, deletedata, getData, getAllData, updateStatus, placeOrderStripe, verifyStript } from "../controllers/deliveryController.js";
import { authUser, authAdmin } from "../middleware/auth.js";

const deliveryroute = Router();

deliveryroute.post('/addStripe', authUser, placeOrderStripe);
deliveryroute.post('/verifyStripe', verifyStript); // Callback verification, keep public for redirect handling
deliveryroute.get('/getAllData', authAdmin, getAllData);
deliveryroute.get("/getdata", authUser, getData);
deliveryroute.post("/adddata", authUser, addData);
deliveryroute.post("/deleteData", authUser, deletedata);
deliveryroute.post("/updateStatus1", authAdmin, updateStatus);  

export default deliveryroute;
