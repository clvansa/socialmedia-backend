const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
//Register
router.post('/register', async (req, res) => {

    try {
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const user = await newUser.save();
        const token = user.getSignedToken()
        res.status(201).json(user);
    } catch (err) {
        console.log(err)
        res.status(404).json(err.message)
    }
})


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select('password')
        !user && res.status(404).json('User not found')
        // const vaildPassword = await bcrypt.compare(req.body.password, user.password)
        const isMatch = await user.matchPassword(req.body.password)
        if (!isMatch) return res.status(404).json('Worng Password');
        // const { password, ...other } = user._doc
        const token = user.getSignedToken()
        res.status(200).json({ token })
    } catch (err) {
        //    return res.status(404).json('Wrong user or Password')
        console.log(err)
    }
})

module.exports = router