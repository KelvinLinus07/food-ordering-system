const Food = require("../models/Food");

const createFood = async (req, res) => {
    try {
        const food = await Food.create(req.body);

        res.status(201).json(food);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create food",
            error: error.message
        });
    }
};

module.exports = {
    createFood
};