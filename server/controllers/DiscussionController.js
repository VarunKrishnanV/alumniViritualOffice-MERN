import DiscussionSchema from "../models/DiscussionSchema.js";

export const get = async (req, res) => {
    const retriveDiscussions = await DiscussionSchema.find({
        alumni_id: req.user._id,
    }).sort({
        createdAt: -1,
    });
    res.json({ data: retriveDiscussions });
};
export const getAll = async (req, res) => {
    const retriveDiscussions = await DiscussionSchema.find({
        status: "published",
    }).sort({
        createdAt: -1,
    });
    res.json({ data: retriveDiscussions });
};

export const getLatest = async (req, res) => {
    const retriveDiscussions = await DiscussionSchema.find({
        status: "published",
    })
        .limit(4)
        .sort({
            createdAt: -1,
        });
    res.json({ data: retriveDiscussions });
};

export const getOne = async (req, res) => {
    const retriveDiscussions = await DiscussionSchema.find({
        _id: req.params.id,
    });
    res.json({ data: retriveDiscussions });
};

export const create = async (req, res) => {
    const { dis_title, dis_description, dis_likes } = req.body;

    const createDiscussion = new DiscussionSchema({
        alumni_id: req.user._id,
        dis_title,
        dis_description,
        dis_likes,
    });

    await createDiscussion.save();
    res.json({ data: req.body });
};

export const destroy = async (req, res) => {
    const deleteDiscussion = await DiscussionSchema.findOneAndDelete({
        _id: req.params.id,
    });
    res.json(`Deleted Successfully. ${deleteDiscussion}`);
};
