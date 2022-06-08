import mongoose from "mongoose";
import mongoURI from "../config.js"

const connectMongoDB = () => {
    mongoose.connect("mongodb+srv://admin:admin@cluster0.j6lwd.mongodb.net/" + "sessions" , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(res => {
        console.log("Mongo connected")
    })
}
export default connectMongoDB;