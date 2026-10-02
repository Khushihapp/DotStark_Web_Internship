import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.js";
const register = async (req, res) => {
    try {
        const { name, email, password ,role} = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role : role||"user"
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = jwt.sign(
            { userId: user._id,
                role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({message: "Login successful",token: token});

    } catch (error) {
        console.log(error);

        res.status(500).json({message: "Server error"});
    }
};
export{register,login};


