import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import DiscussionRoutes from "./routes/discussionRoutes.js";
import connectToDb from "./database/mongoDb.js";

// initializing the app
const app = express();
const PORT = 5050;

// Cross-Origin Resource Sharing
app.use(cors());

// Body parser to get user inputs from frontend
app.use(bodyParser.json());

// connect to MongoDB Database
await connectToDb();

// Discussion Routes
app.use("/discussion", DiscussionRoutes);

// serverConfiguration
//1. setting the root
app.get("/", (req, res) => {
    res.send("Happy world");
});

//2. starting the server
app.listen(PORT, (req, res) => {
    console.log(`server started at port http://localhost:${PORT}`);
});
