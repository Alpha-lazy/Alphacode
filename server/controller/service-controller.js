const Service = require("../model/service-model")

const service = async (req, res) => {
    try {
    const responce = await Service.find();
    
     
       
       
        if (responce.length === 0) {
            return res.status(401).json({ message: "No any service found" })

        }
        res.status(200).json({message:responce});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })

    }

}

module.exports = service;