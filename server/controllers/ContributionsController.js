import ContributionsSchema from "../models/ContributionsSchema.js";

export const get = async (req, res) => {
    const retriveContributions = await ContributionsSchema.find({
        alumni_id: req.user._id,
    }).sort({
        createdAt: -1,
    });
    res.json({ data: retriveContributions });
};

export const getInApproval = async (req, res) => {
    const retriveContributions = await ContributionsSchema.find({
        status: "in-approval",
    }).sort({
        createdAt: -1,
    });
    res.json({ data: retriveContributions });
};

export const getCompleted = async (req, res) => {
    const retriveContributions = await ContributionsSchema.find({
        alumni_id: req.user._id,
        status: "completed",
    }).sort({
        createdAt: -1,
    });
    res.json({ data: retriveContributions });
};

export const getAll = async (req, res) => {
    const retriveContributions = await ContributionsSchema.find({
        status: "published",
    }).sort({
        createdAt: -1,
    });
    res.json({ data: retriveContributions });
};

export const getOne = async (req, res) => {
    const retriveContributions = await ContributionsSchema.find({
        _id: req.params.id,
    });
    res.json({ data: retriveContributions });
};

export const getUserContributionsCount = async (req, res) => {
    const contributionsCount = await ContributionsSchema.find({
        alumni_id: req.user._id,
    }).count();
    res.json({ data: contributionsCount });
};

export const create = async (req, res) => {
    const { cont_type, cont_description, cont_by } = req.body;
    const createContribution = new ContributionsSchema({
        alumni_id: req.user._id,
        cont_by,
        cont_type,
        cont_description,
    });
    await createContribution.save();
    res.json({ data: req.body });
};

export const destroy = async (req, res) => {
    const deleteContribution = await ContributionsSchema.findOneAndDelete({
        _id: req.params.id,
    });
    res.json(`Deleted Successfully. ${deleteContribution}`);
};

export const updateStatus = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    const contribution = await ContributionsSchema.findOne({
        _id: req.params.id,
    });
    Object.assign(contribution, req.body);
    contribution.save();
    console.log("84", contribution);

    res.json({ contribution: contribution });
};
