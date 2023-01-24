const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");
const cors = require("cors");
const app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

//routes
app.use("/api/auth", authRouter)

const URL = process.env.MONGODBURL;
mongoose.set('strictQuery', true);
mongoose.connect(URL, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});