const employRouter = require('express').Router();
const Empylo = require('../model/employModel')



employRouter.get('/all', async (req, res) => {
    try {
        const form = await Empylo.find();
        res.status(200).json(form)

    } catch (error) {
        res.status(500).json(err);
    }
})
employRouter.post("/addemployment", async (req, res) => {
    const newForm = new Empylo({
        company: req.body.company,
        joiningDate: req.body.joiningDate,
        lastDate: req.body.lastDate,
        file: req.body.file,
    })
    const form = await newForm.save()
    res.send({
        _id: form._id,
        company: form.company,
        joiningDate: form.joiningDate,
        lastDate: form.lastDate,
        file: form.file
    });
})
employRouter.put("/update", async (req, res) => {
    const employ = await Empylo.findById(req.body._id);
    if (employ) {
        employ.company = req.body.company || employ.company;
        employ.joiningDate = req.body.joiningDate || employ.joiningDate;
        employ.lastDate = req.body.lastDate || employ.lastDate;
        employ.file = req.body.file || employ.file;

        const updatedemploy = await employ.save();
        res.send({

            _id: updatedemploy._id,
            company: updatedemploy.company,
            joiningDate: updatedemploy.joiningDate,
            lastDate: updatedemploy.lastDate,
            file: updatedemploy.file
        });
    }

})

module.exports = employRouter;