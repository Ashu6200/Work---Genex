
const authRouter = require('express').Router();
const User = require('../model/userModel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWTSEC = "#2@!@$ndja45883 r7##";


authRouter.post('/register',
    body('firstname').isLength({ min: 4 }),
    body('lastname').isLength({ min: 4 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json("some error occured")
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(200).json("Please login with correct password")
        };
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: secpass,
            gender: req.body.gender,
            country: req.body.country
        })
        const accessToken = jwt.sign({
            id: user._id,
            username: user.username
        }, JWTSEC);
        await user.save();
        res.status(200).json({ user: user, accessToken: accessToken });
    })

authRouter.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(200).json({ msg: "This email is not present" });
            } else {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ msg: "Email or Password is incorrect." });
                }
                const accessToken = jwt.sign({
                    id: user._id,
                    username: user.username
                }, JWTSEC);
                const { ...other } = user._doc
                return res.status(200).json({ other, accessToken });
            }
        } catch (error) {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }
)
module.exports = authRouter;