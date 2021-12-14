const express = require("express")

const User = require("../models/user.model")

const upload = require("../middlewares/upload")

const router = express.Router()

router.post("/", upload.single("profile_pic"), async(req,res) => {
    try {
        const user = await User.create({
            first_name: req.body.first_name,
           last_name: req.body.last_name,
            profile_pic: req.file.path,
        })
         return res.status(201).json({user})
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message})
    }
})

router.post("/multiple", upload.any("profile_pic"), async(req,res) => {

    const filePaths = req.files.map((file) => file.path)
    try {
        const user = await User.create({
            first_name: req.body.first_name,
           last_name: req.body.last_name,
           profile_pic:  filePaths,
        })
         return res.status(201).json({user})
    } catch (e) {
        return res.status(500).json({status: "failed", message: e.message})
    }
})

module.exports = router