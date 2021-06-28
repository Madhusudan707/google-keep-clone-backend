const express = require("express");
const router = express.Router();
const { User } = require("../models/users.model");

router
  .route("/")

  .post(async (req, res) => {
    try {
      const user = req.body;
      const NewUser = new User(user);
      const savedUser = await NewUser.save();
      res.json({
        success: true,
        message: "User Added Successfully",
        user: savedUser,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "unable to add User",
        errorMessage: err.message,
      });
    }
  });

router.route("/:uid").get(async (req, res) => {
  try {
    const uid = req.params.uid;
    const data = await User.findOne({ uid: uid })
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to load User Profile",
      errorMessage: err.message,
    });
  }
});

module.exports = router;
