const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const foodRoutes = require("./routes/foodRoutes");

app.use("/api/foods", foodRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Food Ordering API is running!"
    });
});

const PORT = process.env.PORT || 5000;

// On Vercel, this file is imported as a serverless function (see api/index.js)
// instead of being run directly, so it must not call app.listen() there.
// Locally (and on any traditional Node host) this runs exactly as before.
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;