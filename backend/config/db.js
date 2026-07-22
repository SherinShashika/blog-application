const mongoose = require('mongoose');

async function dbConnect() {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("Successfully connected to MongoDB Atlas");
    } catch (error) {
        console.error("Unable to connect to MongoDB Atlas");
        console.error(error);
        process.exit(1);
    }
}

module.exports = dbConnect;
