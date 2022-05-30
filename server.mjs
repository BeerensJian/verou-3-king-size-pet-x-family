import express from "express";
import mainRouter from "./routes/main.mjs";
import mongoose from "mongoose";
import connectMongoDB from "./database/db.mjs";
import userModel from "./Models/User.mjs"

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("dist"));

connectMongoDB();

/* Routes */
app.use("/", mainRouter);
app.listen(3000);