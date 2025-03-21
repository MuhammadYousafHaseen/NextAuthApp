import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.once("connected", () => {
            console.log("Connected to MongoDB");
        })

        connection.on("error", (error) => {
            console.log("Error connecting to MongoDB" + error);
            process.exit(1);
        })
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}