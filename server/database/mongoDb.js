import mongoose from "mongoose";

// connecting to database
async function connectToDb() {
    const username = process.env.MONGO_DB_USERNAME;
    const password = process.env.MONGO_DB_PASSWORD;
    const url = process.env.MONGO_DB_URL;

    await mongoose.connect(
        `mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority`
    );
    console.log("DB Connected");
}

export default connectToDb;
