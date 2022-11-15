import mongoose from "mongoose";

// connecting to database
async function connectToDb() {
    await mongoose.connect(
        "mongodb+srv://alumniVirtualOffice:Alumni2022@alumni.tqsozd4.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("DB Connected");
}

export default connectToDb;
