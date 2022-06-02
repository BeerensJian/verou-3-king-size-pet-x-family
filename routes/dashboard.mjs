import express from 'express';
import isAuth from '../helpers/isAuth.mjs';
import { showDate, showAge } from '../helpers/petHelpers.mjs';
import PetModel from "../Models/Pet.mjs";
import UserModel from "../Models/User.mjs"
import getGenderIcon from '../helpers/getGenderIcon.mjs';
import flash from 'connect-flash';

const router = express.Router()

router.get("/", isAuth, async (req, res) => {

    const pets = await PetModel.find({ownerID: req.session.ownerID})
    res.render("dashboard", {pets: pets, getGenderIcon : getGenderIcon, showAge : showAge});
})
router.get("/addpet", isAuth, (req, res) => {
    res.render("addpet", {err : req.flash("msg")});
})
router.post("/addpet", isAuth, async (req, res) => {
    const {name, gender, birthday, neutered, microshipNr, breed, typeOfAnimal, status} = req.body;

    if (name == "" || gender == "" || birthday == "" || !neutered || breed == "" || typeOfAnimal == "") {
        req.flash("msg", "Please fill in all the fields");
        return res.redirect("/dashboard/addpet");
    }
    
    const pet = new PetModel({
        name,
        gender,
        birthday,
        neutered,
        microshipNr,
        breed,
        typeOfAnimal,
        status,
        ownerID: req.session.ownerID
    })

    await pet.save();
    console.log(pet)
    res.redirect("/dashboard")

})

router.get("/pet/:id", async (req, res) => {
    
    const pet = await PetModel.findOne({ _id : req.params.id})
    const owner = await UserModel.find({ _id : pet.ownerID})

    res.render("test", { pet: pet, user: owner, getGenderIcon : getGenderIcon, showDate: showDate})
})


export default router;