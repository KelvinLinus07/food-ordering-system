const express = require("express");

const {
    createFood,
    getFoods,
    getFood,
    updateFood,
    deleteFood
} = require("../controllers/foodController");

const router = express.Router();

// CREATE
router.post("/", createFood);

// GET ALL
router.get("/", getFoods);

// GET ONE
router.get("/:id", getFood);

// UPDATE
router.put("/:id", updateFood);

// DELETE
router.delete("/:id", deleteFood);

module.exports = router;