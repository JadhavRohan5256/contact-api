const mongoose = require("mongoose");
const connectionString = process.env.CONNECTION_STRING;

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(connectionString);
        console.log("database connected");
    } catch (err) {
        console.log('database ', err);
        process.exit(1);
    }
}

module.exports = connectDB;