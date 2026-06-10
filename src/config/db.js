const mongoose = require('mongoose');


if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('node:dns').setServers(["1.1.1.1", "8.8.8.8"]);
}
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Stop app if DB fails
    }
};

module.exports = connectDB;
