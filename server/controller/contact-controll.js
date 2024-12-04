
const contact = require('../model/contact-model');


const contactForm = async(req, res) => {
    try {
        const { username, email, message } = req.body;
        const contactdData = await contact.create({ username, email, message });
        res.status(200).json({ message: contactdData });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = contactForm;
