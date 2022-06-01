import express from "express";
import mainRouter from "./routes/main.mjs";
import dashboardRouter from "./routes/dashboard.mjs"
import mongoSession from "connect-mongodb-session";
import connectMongoDB from "./database/db.mjs";
import userModel from "./Models/User.mjs"
import session from "express-session";
import mongoURI from "./config.js";
import flash from "connect-flash";

const mongodbStore = mongoSession(session);
const app = express();
// connect to mongo DB with mongoose
connectMongoDB();

// creates a session object to stored on the DB
const store = new mongodbStore({
    uri: mongoURI,
    databaseName: "sessions",
    collection: "mySessions"
})
// parse info from forms
app.use(express.urlencoded({extended:true}))

//create cookie and store the session object we created before in our DB
app.use(session({
    secret: 'Key that will sign the cookie',
    resave: true,
    saveUninitialized: true,
    store: store
}))

app.use(flash())



app.set('view engine', 'ejs');
app.use(express.static("dist"));
app.use("/dashboard", express.static("dist"))



/* Routes */
app.use("/", mainRouter);
app.use("/dashboard", dashboardRouter)


app.listen(3000);