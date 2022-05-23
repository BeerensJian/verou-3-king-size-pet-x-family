import express from "express";
const app = express();
app.set('view engine', 'ejs')
app.use(express.static("dist"));


app.get("/", (req, res) => {
    res.render("index")
})

app.listen(3000);