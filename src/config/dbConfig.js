import mongoose from 'mongoose';
import serverConfig from './serverConfig.js'; // Ensure the `.js` extension is included

/**
 * The below function helps us to connect to a MongoDB server
 */
async function connectDB() {
    try {
        await mongoose.connect(serverConfig.DB_URL);
        console.log("Successfully connected to the MongoDB server .....");
    } catch (error) {
        console.log("Not able to connect to the MongoDB server");
        console.log(error);
    }
}

export default connectDB; // Exporting as ES Module
