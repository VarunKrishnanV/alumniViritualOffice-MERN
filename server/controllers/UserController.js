export const get = async (req, res) => {
    res.json({ user: req.user });
};
