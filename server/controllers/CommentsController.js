import CommentsSchema from "../models/CommentsSchema.js";

export const create = async (req, res) => {
    const { commented_by, discussion_id, comment, status } = req.body;
    const createComment = new CommentsSchema({
        commented_by: req.user._id,
        discussion_id,
        comment,
        status,
    });

    await createComment.save();
    res.json({ data: req.body });
};

export const get = async (req, res) => {
    const retriveComments = await CommentsSchema.find().sort({
        createdAt: -1,
    });
    res.json({ data: retriveComments });
};

export const getSpecific = async (req, res) => {
    console.log(req.params.id);
    const retriveComments = await CommentsSchema.find({
        discussion_id: req.params.id,
    }).sort({
        createdAt: -1,
    });
    console.log(retriveComments);
    res.json({ data: retriveComments });
};