const router = require('express').Router();
const Catagories = require('../models/catagories');

// CREATE CATAGORIES
router.post("/", async (req, res) => {
    try {
        const newCat = await new Catagories(req.body);
        const saveCat = await newCat.save();
        res.status(200).json(saveCat);
    } catch (error) {
        res.status(400).json(error);
    }
});

// GET ALL CARAGORIES
router.get("/", async (req, res) => {
    try {
        const cats = await Catagories.find();
        res.status(200).json(cats);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;