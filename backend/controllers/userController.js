import userModel from '../models/user.js';
import validator from 'validator'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const data = await userModel.findOne({ email: email });
        // console.log("data1", data);
        if (password.length < 8) return res.send({ message: false, data: "Password must be at least 8 characters" })
        
        if (data) {
            const isMatch = await bcrypt.compare(password, data.password);
            if (isMatch) {
                res.send({
                    message: true,
                    data: "login Suncess"
                })
                await userModel.updateOne({ email: email }, { IsLogin: true })
            }
            else {
                return res.send({ message: false, data: "UserName and Password not same" });
            }
        }
        else {
            return res.send({
                message: false,
                data: "user doesnot exits"
            })
        }

    }
    catch (e) {
        res.json({
            message: "error!!",
            err: e.message
        })
    }

}


const createToken = (id) => {
    return jwt.sign({ id }, process.env.secretKey);
}

//Route for user signup
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // console.log(req.body);

        const data = await userModel.findOne({ email: email });
        // console.log(data);
        if (!name || !email || !password) {
            return res.send({ message: false, data: "All fields are required" });
        }
        else if (data) {
            return res.send({ message: false, data: "Email already exists" })
        }
        else if (!validator.isEmail(email)) {
            return res.send({ message: false, data: "Invalid email" })
        }
        else if (password.length < 8) {
            return res.send({ message: false, data: "Password must be at least 8 characters" })
        }

        else {
            const hashedPassword = await bcrypt.hash(password, 12);
            // console.log(hashedPassword);
            req.body.password = hashedPassword;
            const newUser = new userModel(req.body);
            const user = await newUser.save();
            const token = createToken(user._id);
            res.json({ message: true, data: "Sucess", token });
        }
    } catch (e) {
        res.json({
            message: "error!!",
            err: e.message
        })
    }
}


//Route for admin login
const AdminUser = async (req, res) => {
    try {
        const { email, password, isLogin } = req.body;
        const data = await userModel.findOne({ email: email, IsAdmin: "admin" });
        if (data) {
            const isValid = await bcrypt.compare(password, data.password);
            // console.log(isValid);
            if (isValid && isLogin) {
                await userModel.updateOne({ email: email, IsAdmin: "admin" }, { IsLogin: true })
                res.status(200).json({
                    isLogin, data
                })
            }
            else {
                res.status(400).json({
                    message: "password not match"
                })
            }
        }
        else {
            return res.status(400).json({
                message: "Admin doesnot exits"
            })
        }


    } catch (err) {
        res.json({
            message: "error!!",
            error: err.message
        })
    }
}
const adminLogout = async (req, res) => {
    try {
        const update = await userModel.updateOne({ IsAdmin: "admin", IsLogin: true }, { IsLogin: false });
        return res.send(update);
    } catch (err) {
        console.error(err);
    }
}

const LogOut = async (req, res) => {
    // console.log("logout");
    // console.log(req.body);

    const { isLoginout } = req.body;
    if (isLoginout) {
        await userModel.updateOne({ IsLogin: true }, { IsLogin: false });
    }

}

const adminlogin = async (req, res) => {
    try {
        const data = await userModel.findOne({ IsAdmin: "admin", IsLogin: true });
        res.send(data);
    } catch (err) {
        console.error(err);
    }
}

const userlogin = async (req, res) => {
    const data = await userModel.findOne({ IsLogin: true });
    // console.log(data);

    res.send(data);
}
export { loginUser, signupUser, AdminUser, LogOut, userlogin, adminLogout, adminlogin };