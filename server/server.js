import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import DiscussionRoutes from "./routes/discussionRoutes.js";
import AuthRoutes from "./routes/authRoutes.js";
import connectToDb from "./database/mongoDb.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from "dotenv";
import UserRoutes from "./routes/userRoutes.js";

dotenv.config();
// initializing the app
const app = express();
const PORT = 5050;

// Cross-Origin Resource Sharing
app.use(cors());

// Body parser to get user inputs from frontend
app.use(bodyParser.json());

// connect to MongoDB Database
await connectToDb();

// passport auth
app.use(passport.initialize());
passportConfig(passport);

// Discussion Routes
app.use("/discussion", DiscussionRoutes);
app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);

// serverConfiguration
//1. setting the root
app.get("/", (req, res) => {
    res.send("Happy world");
});

//2. starting the server
app.listen(PORT, (req, res) => {
    console.log(`server started at port http://localhost:${PORT}`);
});
