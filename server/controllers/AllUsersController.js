import UserSchema from "./../models/UserSchema.js";

export const getAllUsers = async (req, res) => {
    const allUsers = await UserSchema.find();
    res.json({ allUsers: allUsers });
};

export const getInApprovalUsers = async (req, res) => {
    const allUsers = await UserSchema.find({
        alumni_status: "in-approval",
    });
    res.json({ allUsers: allUsers });
};

export const getLatestUsers = async (req, res) => {
    const latestUsers = await UserSchema.find().limit(10);
    res.json({ latestUsers: latestUsers });
};

export const getSpecificUser = async (req, res) => {
    const specificUser = await UserSchema.findOne({ _id: req.params.id });
    res.json({ user: specificUser });
};

export const updateUserStatus = async (req, res) => {
    const userData = await UserSchema.findOne({ _id: req.params.id });
    Object.assign(userData, req.body);
    userData.save();
    res.json({ user: userData });
};