const formRouter = require('express').Router();
const Form = require('../model/formModel');
const { body, validationResult } = require('express-validator');


formRouter.get('/all', async (req, res) => {
    try {
        const form = await Form.find();
        res.status(200).json(form)

    } catch (error) {
        res.status(500).json(err);
    }
})
formRouter.post("/add",
    body('aadharcard').isLength({ max: 12, min: 12 }), async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json("some error occured")
        }
        let form = await Form.findOne({ aadharcard: req.body.aadharcard });
        if (form) {
            return res.status(200).json("Can't add aadharcard")
        };
        const newForm = new Form({
            aadharcard: req.body.aadharcard,
            aadharcardfile: req.body.aadharcardfile
        })
        form = await newForm.save()
        res.send({
            _id: form._id,
            aadharcard: form.aadharcard,
            aadharcardfile: form.aadharcardfile
        });
    })

module.exports = formRouter;