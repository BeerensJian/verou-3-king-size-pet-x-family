import mongoose from "mongoose";
import mongoURI from "../config.js"

const connectMongoDB = () => {
    mongoose.connect(mongoURI + "sessions" , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(res => {
        console.log("Mongo connected")
    })
}
export default connectMongoDB;