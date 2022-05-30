import express from "express";
import mainRouter from "./routes/main.mjs";
import mongoose from "mongoose";
import mongoURI from "./config.mjs"
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("dist"));

mongoose.connect(mongoURI + "sessions" , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log("Mongo connected")
})

/* Routes */
app.use("/", mainRouter);
app.listen(3000);