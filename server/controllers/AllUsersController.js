import UserSchema from "./../models/UserSchema.js";

export const getAllUsers = async (req, res) => {
    const allUsers = await UserSchema.find();
    res.json({ allUsers: allUsers });
};
