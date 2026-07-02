import deliveryDetailModel from "../models/deliveryInformation.js";
import productDetailmodel from "../models/productModel.js";
import userModel from '../models/user.js'

import Stripe from 'stripe'

//global variable
const currency = "USD"
const deliveryCharge = 10

//getway initialize

const stripe = new Stripe(process.env.STRIPE_KEY);

const placeOrderStripe = async (req, res) => {
    try {
        console.log(req.body);
        const { UserId, cartDetail, bill, Street } = req.body;
        const { origin } = req.headers;
        // console.log(UserId,cartDetail,bill,Street,origin);



        const newOrder = new deliveryDetailModel(req.body);
        await newOrder.save();
        // console.log("done");
        const product = await productDetailmodel.find();
        // console.log(product);


        const line_items = cartDetail.map((item) => {
            const val = product.find((data) => data._id.toString() === item._id.toString());

            return {
                price_data: {
                    currency: currency,
                    product_data: {
                        name: val.ProductName
                    },
                    unit_amount: val.ProductPrice * 100,
                },
                quantity: item.count,
            };
        });

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "delivery charges"
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        // console.log("session", session);


        res.json({ success: true, session_url: session.url });





    } catch (err) {
        console.log(err);

    }
}


const verifyStript = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success) {
            await orderDetailModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({
                success: true
            })
        }
        else {
            await orderDetailModel.findByIdAndDelete(orderId); res.json({ success: false });
        }
    } catch (err) {
        console.log(err);

    }
}



const addData = async (req, res) => {
    const data = req.body;
    // console.log(data);
    try {
        const delivery = new deliveryDetailModel(data);
        await delivery.save();
        return res.json({
            message: "Sucess"
        })
    } catch (err) {
        console.error(err);
    }

}


const deletedata = async (req, res) => {
    const { id } = req.body;
    // console.log(id);


    const detail = await userModel.findOne();
    // console.log("detail", detail.cartData);
    await userModel.updateOne({ _id: id }, { cartData: [] });

    return res.json({
        message: true
    })
}

const getData = async (req, res) => {
    const userLogin = await userModel.findOne({ IsLogin: true });
    const id = userLogin._id;

    const data = await deliveryDetailModel.find({ UserId: id });
    res.send(data);

}
const getAllData = async (req, res) => {
    const data = await deliveryDetailModel.find();
    res.send(data);
}

const updateStatus = async (req, res) => {
    // console.log(req.body);
    const { status, userId, productId, btnSize } = req.body;
    if (!status || !userId || !productId || !btnSize) return;

    const update = await deliveryDetailModel.updateOne(
        {
            _id: userId,
            "cartDetail._id": productId,
            "cartDetail.BtnSize": btnSize
        },
        {
            $set: { "cartDetail.$[ele].trackOrder1": status }
        }, {
        arrayFilters: [
            {
                "ele._id": productId,
                "ele.BtnSize": btnSize
            }
        ]
    }
    );
    if (update.acknowledged) {
        return res.send(await deliveryDetailModel.find());
    }



    // console.log(updateData);
};





export { addData, deletedata, getData, getAllData, updateStatus, placeOrderStripe, verifyStript };