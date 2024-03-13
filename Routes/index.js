const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const auth = require('http-auth');

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});


const { check, validationResult } = require("express-validator");

const router = express.Router();

const Registration = mongoose.model("Registration");

router.get("/", (req, res) => {
  res.render("form", { title: "Registration Form" });
});

router.post(
  "/",
  [
    check("name").isLength({ min: 1 }).withMessage("Please enter your name"),
    check("email").isLength({ min: 1 }).withMessage("Please enter an email"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const registration = new Registration(req.body);

      registration
        .save()
        .then(() => {
          res.send("Thank you for your registration!");
        })
        .catch((err) => {
          console.log(err);
          res.send("Sorry! Something went wrong.");
        });
    } else {
      res.render("form", {
        title: "Registration form",
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

router.get("/registrations", basic.check((req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render("index", { title: "Listing registrations",registrations });
    })
    .catch(() => {
      res.send("sorry! something went wrong");
    });
}));

module.exports = router;
