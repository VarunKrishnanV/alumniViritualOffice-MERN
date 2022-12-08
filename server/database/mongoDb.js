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


//         mongodb+srv://alumniVirtualOffice:Alumni2022@alumni.tqsozd4.mongodb.net/?retryWrites=true&w=majority
// MONGO_DB_USERNAME = "alumniVirtualOffice";
// MONGO_DB_PASSWORD = "Alumni2022";
// MONGO_DB_URL = "alumni.tqsozd4.mongodb.net";