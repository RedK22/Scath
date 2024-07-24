const express = require("express");
const router = express.Router();
const ownersModel = require("../models/owners-model");

router.get("/", (req, res) => {
  res.send("Hey");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let owners = await ownersModel.find();
    if (owners.length > 0) {
      return res
        .status(504)
        .send("You don't have permission to create a new owner");
    }

    let {fullname, email, password} = req.body;

    let createdOwner = await ownersModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}

module.exports = router;
