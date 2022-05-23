import express from "express";
import mainRouter from "./routes/main.mjs"
const app = express();

app.set('view engine', 'ejs')
app.use(express.static("dist"));


// app.get("/", (req, res) => {
//     res.render("index");
// })
// app.get("/login", (req, res) => {
//     res.render("login");
// })
// app.get("/signup", (req, res) => {
//     res.render("signup");
// })

app.use("/", mainRouter)
app.listen(3000);