const express = require('express');
const contactForm = require('../controller/contact-controll');
const contactrouter = express.Router()

contactrouter.route("/contact").post(contactForm);



module.exports = contactrouter;