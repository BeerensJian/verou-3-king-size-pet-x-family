import mongoose from "mongoose";
import mongoURI from "../config.js"

const connectMongoDB = () => {
    mongoose.connect(process.env.MONGO_URI || mongoURI + "sessions" , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(res => {
        console.log("Mongo connected")
    })
}
export default connectMongoDB;