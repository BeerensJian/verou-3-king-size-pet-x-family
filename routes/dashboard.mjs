import express from 'express';
import isAuth from '../helpers/isAuth.mjs';
import { showDate, showAge, isActive, showDate2, getTime } from '../helpers/petHelpers.mjs';
import PetModel from "../Models/Pet.mjs";
import UserModel from "../Models/User.mjs"
import AppointmentModel from '../Models/Appointment.mjs';
import getGenderIcon from '../helpers/getGenderIcon.mjs';
import flash from 'connect-flash';




const router = express.Router()

router.get("/", isAuth, async (req, res) => {
    let twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 12)
    const appointments = await AppointmentModel.find({ ownerID : req.session.ownerID })
    .populate("petID")
    .select("doctor date notes petID")
    .where("date")

    let soonAppointments = []
    appointments.forEach(app => {
        const appdate = new Date(app.date)
        if (appdate < twoWeeksFromNow) {
            soonAppointments.push(app)
        }
    });
    
    
    const pets = await PetModel.find({ownerID: req.session.ownerID})
    res.render("dashboard", {
        pets: pets,
        getGenderIcon : getGenderIcon, 
        showAge : showAge, 
        msg : req.flash("msg"), 
        appointments : soonAppointments, 
        showDate: showDate, 
        getTime : getTime
    });
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
    const appointments =  await AppointmentModel.find({ petID : req.params.id })

    
    res.render("pet", {pet: pet, allPets : pets, appointments: appointments , showDate: showDate, getGenderIcon : getGenderIcon, isActive : isActive, getTime : getTime})
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
    await pet.save();

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

router.get("/appointment/:id", (req, res) => {

    res.render('appointment', { petid : req.params.id, err: req.flash("msg")})
})
router.post("/appointment/:id",(req, res) => {
    function addHoursToDate(date, hours) {
        let newDate = new Date(date)
        return newDate.setHours(newDate.getHours() + hours)
    }
    
    if (req.body.doctor == "") {
        req.flash("msg", "Please specify a doctor")
        return res.redirect(`/dashboard/appointment/${req.params.id}`)
    }
    if (req.body.appointment_time == "") {
        req.flash("msg", "Please select a date and time")
        return res.redirect(`/dashboard/appointment/${req.params.id}`)
    }
    const appDate = new Date(req.body.appointment_time)
    const today = new Date();
    if (appDate < today) {
        req.flash("msg", "Please select a time in the future")
        return res.redirect(`/dashboard/appointment/${req.params.id}`)
    }

    const appointment = new AppointmentModel({
        doctor : req.body.doctor,
        date : addHoursToDate(req.body.appointment_time, 2),
        notes : req.body.notes,
        ownerID : req.session.ownerID,
        petID : req.params.id,
    })

    appointment.save()
    res.redirect(`/dashboard/pet/${req.params.id}`)
})
router.get("/document", (req, res) => {
    res.render("document")
})

export default router;