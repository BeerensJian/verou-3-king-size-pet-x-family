import express from "express";
import mainRouter from "./routes/main.mjs";
import mongoSession from "connect-mongodb-session";
import connectMongoDB from "./database/db.mjs";
import userModel from "./Models/User.mjs"
import session from "express-session";
import mongoURI from "./config.js"

const mongodbStore = mongoSession(session);
const app = express();
// connect to mongo DB with mongoose
connectMongoDB();

const store = new mongodbStore({
    uri: mongoURI,
    databaseName: "sessions",
    collection: "mySessions"
})

app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: 'Key that will sign the cookie',
    resave: false,
    saveUninitialized: false,
    store: store
}))



app.set('view engine', 'ejs');
app.use(express.static("dist"));



/* Routes */
app.use("/", mainRouter);
app.listen(3000);