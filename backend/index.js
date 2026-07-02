import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productroute from './routes/productRoute.js';
import deliveryroute from './routes/deliveryRoute.js';







//App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


//middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); 





//API endpoints
app.use('/api/user', userRouter);
app.use('/api/product',productroute);
app.use("/api/delivery", deliveryroute);


app.get('/', (req, res) => {
  res.send('API IS RUNNING')
});

app.listen(port, () => {
  console.log(`server is runing on ${port}`);
})