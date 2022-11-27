import UserSchema from "./../models/UserSchema.js";

export const getAllUsers = async (req, res) => {
    const allUsers = await UserSchema.find();
    res.json({ allUsers: allUsers });
};

export const getLatestUsers = async (req, res) => {
    const latestUsers = await UserSchema.find().limit(10);
    res.json({ latestUsers: latestUsers });
};
