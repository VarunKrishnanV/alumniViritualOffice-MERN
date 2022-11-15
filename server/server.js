import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import DiscussionSchema from "./models/discussionSchema.js";

const app = express();
const PORT = 5050;

app.use(cors());
app.use(bodyParser.json());

// connecting to database
await mongoose.connect(
    "mongodb+srv://alumniVirtualOffice:Alumni2022@alumni.tqsozd4.mongodb.net/?retryWrites=true&w=majority"
);

console.log("db connected");

// setting the root
app.get("/", (req, res) => {
    res.send("Happy world");
});

// Creating new discussion
app.post("/discussion", async (req, res) => {
    const { dis_title, dis_description, dis_likes } = req.body;

    const createDiscussion = new DiscussionSchema({
        dis_title,
        dis_description,
        dis_likes,
    });

    await createDiscussion.save();
    res.json({ data: req.body });
    console.log(req.body);
});

// to retrieve all discussions
app.get("/discussion", async (req, res) => {
    const retriveDiscussions = await DiscussionSchema.find();
    res.json({ data: retriveDiscussions });
});

// starting the server
app.listen(PORT, (req, res) => {
    console.log(`server started at port http://localhost:${PORT}`);
});
