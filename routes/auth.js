const router = require("express").Router();
const User = require("../model/User");
const validate = require("../validation");
const bcrypt = require("bcryptjs");

router.post("/register", async(req, res) => {
    //validate data
    const checked = validate.checkRegister(req.body);
    if (checked != true) return res.status(400).send(checked);

    //already exist?
    //try {
    //     const emailExists = await User.findOne({ email: req.body.email });
    //       if (emailExists) return res.status(400).send("email already exist");
    ///   } catch (err) {
    ///      console.log(err);
    ///  }

    //has the password
    // const salt = await bcrypt.genSalt(10);
    //const hashPassword = await bcrypt.hash(req.body.password, salt);hashPassword

    //add new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.post("/login", async(req, res) => {
    //validate data
    const checked = validate.checkLogin(req.body);
    if (checked != true) return res.status(400).send(checked);

    //already exist?
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("email/password incorrect ");

    //has the password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("email/password incorrect ");

    //add new user

    try {
        res.send("logged in");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;