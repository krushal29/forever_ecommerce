import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';

export const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "No token provided, authorization denied" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({ success: false, message: "Token is invalid or expired" });
    }
};

export const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "No token provided, authorization denied" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);
        if (!user || user.IsAdmin !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied. Admin role required." });
        }

        req.userId = decoded.id;
        req.user = user;
        next();
    } catch (error) {
        console.error("Admin Auth Middleware Error:", error.message);
        return res.status(401).json({ success: false, message: "Token is invalid or expired" });
    }
};
