import { Router } from "express";
import { addData, deletedata, getData, getAllData, updateStatus,placeOrderStripe,verifyStript } from "../controllers/deliveryController.js";

const deliveryroute = Router();


deliveryroute.post('/addStripe',placeOrderStripe);
deliveryroute.post('/verifyStripe',verifyStript);
deliveryroute.get('/getAllData', getAllData);
deliveryroute.get("/getdata", getData);
deliveryroute.post("/adddata", addData);
deliveryroute.post("/deleteData", deletedata);
deliveryroute.post("/updateStatus1", updateStatus);  

export default deliveryroute;
