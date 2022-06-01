import express from 'express';
import isAuth from '../helpers/isAuth.mjs';
import PetModel from "../Models/Pet.mjs";
import getAge from '../helpers/getAge.mjs';
import flash from 'connect-flash';

const router = express.Router()

router.get("/", isAuth, async (req, res) => {

    const pets = await PetModel.find({ownerID: req.session.ownerID})
    
    res.render("dashboard", {pets: pets});
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


export default router;