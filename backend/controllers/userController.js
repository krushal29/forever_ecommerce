import userModel from '../models/user.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

//Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: false, data: "All fields are required" });
        }

        const cleanEmail = email.trim().toLowerCase();
        const user = await userModel.findOne({ email: cleanEmail });

        if (!user) {
            return res.status(404).json({
                message: false,
                data: "User does not exist"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: false, data: "Password must be at least 8 characters" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            return res.json({
                message: true,
                data: "Login Success",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.IsAdmin
                }
            });
        } else {
            return res.status(400).json({ message: false, data: "Invalid email or password" });
        }
    }
    catch (e) {
        console.error("Login error:", e);
        return res.status(500).json({
            message: false,
            data: "Server Error",
            err: e.message
        });
    }
}

//Route for user signup
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: false, data: "All fields are required" });
        }

        const cleanEmail = email.trim().toLowerCase();
        const cleanName = name.trim();

        const data = await userModel.findOne({ email: cleanEmail });
        if (data) {
            return res.status(400).json({ message: false, data: "Email already exists" });
        }

        if (!validator.isEmail(cleanEmail)) {
            return res.status(400).json({ message: false, data: "Invalid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: false, data: "Password must be at least 8 characters" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new userModel({
            name: cleanName,
            email: cleanEmail,
            password: hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id);

        return res.json({
            message: true,
            data: "Signup Success",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.IsAdmin
            }
        });
    } catch (e) {
        console.error("Signup error:", e);
        return res.status(500).json({
            message: false,
            data: "Server Error",
            err: e.message
        });
    }
}

//Route for admin login
const AdminUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const cleanEmail = email.trim().toLowerCase();
        const data = await userModel.findOne({ email: cleanEmail, IsAdmin: "admin" });

        if (data) {
            const isValid = await bcrypt.compare(password, data.password);
            if (isValid) {
                const token = createToken(data._id);
                return res.status(200).json({
                    isLogin: true,
                    token,
                    data: {
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        role: data.IsAdmin
                    }
                });
            } else {
                return res.status(400).json({
                    message: "Invalid credentials"
                });
            }
        } else {
            return res.status(400).json({
                message: "Admin does not exist"
            });
        }
    } catch (err) {
        console.error("Admin login error:", err);
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
}

const adminLogout = async (req, res) => {
    try {
        return res.json({ message: true, data: "Logout Success" });
    } catch (err) {
        console.error("Admin logout error:", err);
        return res.status(500).json({ message: false, error: err.message });
    }
}

const LogOut = async (req, res) => {
    return res.json({ message: true, data: "Logout Success" });
}

const adminlogin = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const data = await userModel.findOne({ _id: userId, IsAdmin: "admin" }).select("-password");
        return res.json(data);
    } catch (err) {
        console.error("Admin check error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
}

const userlogin = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const data = await userModel.findById(userId).select("-password");
        return res.json(data);
    } catch (err) {
        console.error("User check error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
}

export { loginUser, signupUser, AdminUser, LogOut, userlogin, adminLogout, adminlogin };