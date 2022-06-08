import express from 'express';
import isAuth from '../helpers/isAuth.mjs';
import { showDate, showAge, isActive, showDate2 } from '../helpers/petHelpers.mjs';
import PetModel from "../Models/Pet.mjs";
import UserModel from "../Models/User.mjs"
import getGenderIcon from '../helpers/getGenderIcon.mjs';
import flash from 'connect-flash';



const router = express.Router()

router.get("/", isAuth, async (req, res) => {

    const pets = await PetModel.find({ownerID: req.session.ownerID})
    res.render("dashboard", {pets: pets, getGenderIcon : getGenderIcon, showAge : showAge, msg : req.flash("msg")});
})

/* ADDPET */

router.get("/addpet", isAuth, (req, res) => {
    res.render("addpet", {err : req.flash("msg"), maxdate : new Date()});
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

/* PET DASHBOARD */ 

router.get("/pet/:id", async (req, res) => {
    
    const pet = await PetModel.findOne({ _id : req.params.id})
    const pets = await PetModel.find({ownerID: req.session.ownerID})

    
    res.render("pet", {pet: pet, allPets : pets, showDate: showDate, getGenderIcon : getGenderIcon, isActive : isActive})
})

/* EDIT PET DETAILS */

router.get("/edit/:id", async (req, res) => {
    const pet = await PetModel.findOne({_id : req.params.id});
    res.render("editpet", {err : req.flash("msg"), pet : pet, showDate : showDate2});
})

router.post("/edit/:id", async (req, res) => {
    const {name, gender, birthday, neutered, microshipNr, breed, typeOfAnimal, status} = req.body;
    
    if ( name === "" || birthday == "" || neutered == "" || typeOfAnimal == "" || status == "") {
        req.flash("msg", "Please fill in all the required fields!");
        return res.redirect("/dashboard/edit/" + req.params.id);
    }
    console.log(req.params.id)
    let pet = await PetModel.findOne({_id : req.params.id})
    console.log(pet)
    pet.name = name;
    pet.gender = gender;
    pet. birthday = birthday;
    pet.neutered = neutered;
    pet.microshipNr = microshipNr;
    pet.breed = breed;
    pet.typeOfAnimal = typeOfAnimal;
    pet.status = status;
    pet.save();

    res.redirect("/dashboard")
})

/* DELETE PET*/

router.post("/delete/:id", async (req, res) => {
    
    let pet = await PetModel.findOneAndRemove({ _id : req.params.id}).where({ ownerID : req.session.ownerID })
    console.log(pet)
    if ( pet == null ) {
        req.flash("msg", "No pet found or you're not the owner");
        return res.redirect("/dashboard");
    }
    req.flash("msg", "Pet deleted succesfully!");
    res.redirect("/dashboard");

    // if (req.session.ownerID == pet.ownerID) {
    //     pet = await PetModel.deleteOne({ id : req.params.id})
    //     req.flash("confirm", "Pet succesfully deleted")
    //     res.redirect("/dashboard")
    // } else {
    //     res.redirect("/dashboard/pet/" + pet.id)
    // }
})

// ADD APPOINTMENT & DOCUMENT ROUTEs

router.get("/appointment", (req, res) => {
    res.render('appointment')
})
router.get("/document", (req, res) => {
    res.render("document")
})

export default router;