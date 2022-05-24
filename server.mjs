import express from "express";
import mainRouter from "./routes/main.mjs";
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("dist"));

/* Routes */
app.use("/", mainRouter);
app.listen(3000);