import UserSchema from "./../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    // get all the detials
    const {
        firstName,
        lastName,
        email,
        phone,
        college,
        identity_number,
        dept,
        batch,
        password,
        alumni_status,
        user_type,
    } = req.body;

    const userExists = await UserSchema.findOne({ email: email });
    // check the user already exists
    if (userExists) {
        res.status(406).json({ meassage: "User already exists" });
        return;
    }

    // hassing the password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log("hashedPassword: ", hashedPassword);

    // inserting data into the database
    const user = await UserSchema({
        firstName,
        lastName,
        email,
        phone,
        college,
        identity_number,
        dept,
        batch,
        password: hashedPassword,
        alumni_status,
        user_type,
    });
    const savedUser = await user.save();

    res.status(201).json({ message: "signed up" });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email: email });
    // check the user already exists
    if (!user) {
        res.status(406).json({ meassage: "Credentials not found" });
        return;
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
        res.status(406).json({ message: "credentails not found" });
        return;
    }

    // jwt
    const payload = {
        username: email,
        _id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    console.log(token);

    res.json({ token, user });
};
