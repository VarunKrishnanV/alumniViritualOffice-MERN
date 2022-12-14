import CommentsSchema from "../models/CommentsSchema.js";

export const create = async (req, res) => {
    const { discussion_id, comment, status, commented_by_name } = req.body;
    const createComment = new CommentsSchema({
        commented_by: req.user._id,
        commented_by_name,
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

// nostes for specific discussion
export const getSpecific = async (req, res) => {
    console.log(req.params.id);
    const retriveComments = await CommentsSchema.find({
        discussion_id: req.params.id,
    });
    res.json({ data: retriveComments });
};

export const getUserCommentsCount = async (req, res) => {
    const commentsCount = await CommentsSchema.find({
        commented_by: req.user._id,
    }).count();
    res.json({ data: commentsCount });
};

export const updateStatus = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    const comment = await CommentsSchema.findOne({
        _id: req.params.id,
    });
    Object.assign(comment, req.body);
    comment.save();
    res.json({ comment: comment });
};
