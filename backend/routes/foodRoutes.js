const express = require("express");
const { createFood } = require("../controllers/foodController");

const router = express.Router();

router.post("/", createFood);

module.exports = router;