import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productroute from './routes/productRoute.js';
import deliveryroute from './routes/deliveryRoute.js';

//App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Security Middlewares
app.use(helmet());

// Specific CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Request size limit & JSON parser
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static('uploads')); 

// Rate limiter for API routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  message: { success: false, message: "Too many requests, please try again later" }
});
app.use('/api', limiter);

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productroute);
app.use("/api/delivery", deliveryroute);

app.get('/', (req, res) => {
  res.send('API IS RUNNING');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});