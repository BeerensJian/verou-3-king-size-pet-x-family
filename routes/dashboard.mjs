import express from 'express';
import isAuth from '../helpers/isAuth.mjs';
const router = express.Router()

router.get("/", isAuth, (req, res) => {
    res.render("dashboard");
})
router.get("/addpet", isAuth, (req, res) => {
    res.render("addpet");
})

export default router;