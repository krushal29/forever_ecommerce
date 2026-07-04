import deliveryDetailModel from "../models/deliveryInformation.js";
import productDetailmodel from "../models/productModel.js";
import userModel from '../models/user.js';
import Stripe from 'stripe';

const currency = "INR";
const deliveryCharge = 10;

const stripe = new Stripe(process.env.STRIPE_KEY);

const placeOrderStripe = async (req, res) => {
    try {
        const { UserId, cartDetail, bill, Street } = req.body;
        const userId = req.userId || UserId;
        const origin = req.headers.origin || process.env.FRONTEND_URL || "http://localhost:5173";

        if (!userId || !cartDetail || cartDetail.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid order parameters" });
        }

        const products = await productDetailmodel.find();

        for (const item of cartDetail) {
            const val = products.find((data) => data._id.toString() === item._id.toString());
            if (!val) {
                return res.status(404).json({ success: false, message: `Product not found` });
            }
            const stock = val.ProductStock !== undefined ? val.ProductStock : 0;
            if (stock < item.count) {
                return res.status(400).json({ success: false, message: `Insufficient stock for ${val.ProductName}. Only ${stock} items available.` });
            }
        }

        const newOrder = new deliveryDetailModel({
            ...req.body,
            UserId: userId,
            payment: false
        });
        await newOrder.save();

        const product = products;

        const line_items = cartDetail.map((item) => {
            const val = product.find((data) => data._id.toString() === item._id.toString());
            return {
                price_data: {
                    currency: currency.toLowerCase(),
                    product_data: {
                        name: val ? val.ProductName : "Product"
                    },
                    unit_amount: (val ? val.ProductPrice : 0) * 100,
                },
                quantity: item.count,
            };
        });

        line_items.push({
            price_data: {
                currency: currency.toLowerCase(),
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        return res.json({ success: true, session_url: session.url });

    } catch (err) {
        console.error("Stripe order error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

const verifyStript = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order ID required" });
        }
        
        const order = await deliveryDetailModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (success === true || success === "true") {
            await deliveryDetailModel.findByIdAndUpdate(orderId, { payment: true });
            
            // Clear cart in DB
            await userModel.findByIdAndUpdate(order.UserId, { cartData: [] });
            
            // Reduce stock
            for (const item of order.cartDetail) {
                await productDetailmodel.findByIdAndUpdate(item._id, {
                    $inc: { ProductStock: -item.count }
                });
            }
            
            return res.json({ success: true });
        } else {
            await deliveryDetailModel.findByIdAndDelete(orderId);
            return res.json({ success: false });
        }
    } catch (err) {
        console.error("Verify Stripe error:", err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

const addData = async (req, res) => {
    try {
        const userId = req.userId || req.body.UserId;
        const { cartDetail } = req.body;

        if (!cartDetail || cartDetail.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid order parameters" });
        }

        const products = await productDetailmodel.find();

        for (const item of cartDetail) {
            const val = products.find((data) => data._id.toString() === item._id.toString());
            if (!val) {
                return res.status(404).json({ success: false, message: `Product not found` });
            }
            const stock = val.ProductStock !== undefined ? val.ProductStock : 0;
            if (stock < item.count) {
                return res.status(400).json({ success: false, message: `Insufficient stock for ${val.ProductName}. Only ${stock} items available.` });
            }
        }

        const delivery = new deliveryDetailModel({
            ...req.body,
            UserId: userId
        });
        await delivery.save();

        // Reduce stock automatically for COD orders
        for (const item of cartDetail) {
            await productDetailmodel.findByIdAndUpdate(item._id, {
                $inc: { ProductStock: -item.count }
            });
        }

        return res.json({
            message: "Sucess",
            success: true
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

const deletedata = async (req, res) => {
    try {
        const userId = req.userId || req.body.id;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID required" });
        }
        await userModel.updateOne({ _id: userId }, { cartData: [] });
        return res.json({
            message: true,
            success: true
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

const getData = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const data = await deliveryDetailModel.find({ UserId: userId }).sort({ createdAt: -1 });
        return res.send(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

const getAllData = async (req, res) => {
    try {
        const data = await deliveryDetailModel.find().sort({ createdAt: -1 });
        return res.send(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status, userId, productId, btnSize } = req.body;
        if (!status || !userId || !productId || !btnSize) {
            return res.status(400).json({ success: false, message: "Missing parameter details" });
        }

        const update = await deliveryDetailModel.updateOne(
            {
                _id: userId,
                "cartDetail._id": productId,
                "cartDetail.BtnSize": btnSize
            },
            {
                $set: { "cartDetail.$[ele].trackOrder1": status }
            },
            {
                arrayFilters: [
                    {
                        "ele._id": productId,
                        "ele.BtnSize": btnSize
                    }
                ]
            }
        );

        if (update.acknowledged) {
            const data = await deliveryDetailModel.find().sort({ createdAt: -1 });
            return res.send(data);
        } else {
            return res.status(400).json({ success: false, message: "Could not update status" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

export { addData, deletedata, getData, getAllData, updateStatus, placeOrderStripe, verifyStript };