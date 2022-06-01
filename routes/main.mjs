import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose"
import UserModel from "../Models/User.mjs"

const router = express.Router();
import isAuth from "../helpers/isAuth.mjs"


router.get("/", (req, res) => {
    res.render("index");
})
router.get("/login", (req, res) => {
    //check if the user is already logged in
    if (req.session.isAuth) {
        return res.redirect("/dashboard")
    }

    const error = req.session.error;
    delete req.session.error;
    res.render("login", {err: error});
})
router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await UserModel.findOne({email})
    // if there isn't a user with that email, "refresh the page"
    if (!user) {
        req.session.error = "Email not found";
        return res.redirect("/login");
    }
    // check if the the password matches the on in the DB
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.redirect("/login");
    }
    // Create a variable that authenicates the user on each visit
    req.session.isAuth = true;
    req.session.ownerID = user._id;
    res.redirect("/dashboard")
})
router.get("/signup", (req, res) => {
    if (req.session.isAuth) {
        return res.redirect("/dashboard");
    }

    const error = req.session.error;
    delete req.session.error;
    console.log(error)
    res.render("signup", {err: error});
})
router.post("/signup", async (req, res) => {
    const {firstname, lastname, email, password} = req.body;
    // Check if there's already a user with that email
    let user = await UserModel.findOne({email});

    if (user) {
        req.session.error = "There is already a user with this email";
        return res.redirect('/signup');
    }

    const hashedPass = await bcrypt.hash(password, 12);

    user = new UserModel({
        firstname,
        lastname,
        email,
        password: hashedPass
    })
    await user.save()

    res.redirect("/login")
})


export default router;