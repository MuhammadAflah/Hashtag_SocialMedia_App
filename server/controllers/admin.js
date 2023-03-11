import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Admin from "../models/admin.js"
import User from "../models/User.js"
import mongoose, { Types } from "mongoose"
const ObjectId = mongoose.Types.ObjectId


export const login = async (req, res) => {
    const adminUsername = process.env.ADMIN_ID;
    const adminPassword = process.env.ADMIN_PSW;


    try {
        const { email, password } = req.body;
        const admin = (email === adminUsername) ? true : false;

        const msg = "Please enter correct email address"

        if (!admin) return res.status(400).json({ msg })

        const isMatch = (password === adminPassword) ? true : false;

        if (!isMatch) return res.status(400).json({ msg: "Incorrect Password entered" })

        const token = jwt.sign({ is: admin._id }, process.env.JWT_SECRET)

        delete admin.password

        res.status(200).json({ token, admin });
    }
    catch (err) {
        res.status(500).json({ msg: "Something went wrong in login " })
    }
}

export const getUsers = async (req, res) => {
    try {
        const user = await User.find().select("-password")
        if (!user) return res.status(500).json({ message: "user not found" })
        res.status(200).json({ message: "success", user })
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }
}

export const blockUser = (req, res) => {
    const { id } = req.params;
    const checked = req.body.checked;
    if (checked) {
        User.updateOne({ _id: ObjectId(id) }, { isBlocked: false }).then((response) => {
            return res.status(200).json({ isBlocked: false })
        })
    } else {
        User.updateOne({ _id: ObjectId(id) }, { isBlocked: true }).then((response) => {
            return res.status(200).json({ isBlocked: true })
        })


        // return res.status(200).json({isBlocked:true})

    }

}



