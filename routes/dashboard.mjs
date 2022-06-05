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
    res.render("dashboard", {pets: pets, getGenderIcon : getGenderIcon, showAge : showAge, msg : req.flash("msg")});
})
router.get("/addpet", isAuth, (req, res) => {
    res.render("addpet", {err : req.flash("msg")});
})
router.post("/addpet", isAuth, async (req, res) => {
    const {name, gender, birthday, neutered, microshipNr, breed, typeOfAnimal, status} = req.body;

    if (name == "" || gender == "" || birthday == "" || !neutered  || typeOfAnimal == "") {
        req.flash("msg", "Please fill in all the fields");
        return res.redirect("/dashboard/addpet");
    }
    
    const pet = new PetModel({
        name,
        gender,
        birthday,
        neutered,
        microshipNr,
        breed : breed || "None Specified",
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

    res.render("pet", {pet: pet, owner : owner, showDate: showDate,})
})

router.post("/delete/:id", async (req, res) => {
    
    let pet = await PetModel.findOneAndRemove({ _id : req.params.id}).where({ ownerID : req.session.ownerID })
    console.log(pet)
    if ( pet == null ) {
        req.flash("msg", "No pet found or you're not the owner")
        return res.redirect("/dashboard")
    }
    req.flash("msg", "Pet deleted succesfully!")
    res.redirect("/dashboard")

    // if (req.session.ownerID == pet.ownerID) {
    //     pet = await PetModel.deleteOne({ id : req.params.id})
    //     req.flash("confirm", "Pet succesfully deleted")
    //     res.redirect("/dashboard")
    // } else {
    //     res.redirect("/dashboard/pet/" + pet.id)
    // }
    
})


export default router;