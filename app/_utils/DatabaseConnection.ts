import mongoose from "mongoose";

const connect = async () => {

    const URI: string = process.env.MONGODB_URI!

    try {
        await mongoose.connect(URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        throw new Error(`MongoDB connection failed: ${error}`)
    }
}

export default connect;