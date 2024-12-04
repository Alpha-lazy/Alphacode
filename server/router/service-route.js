const express = require('express');
const service = require('../controller/service-controller');
const serviceRouter = express.Router();

serviceRouter.route("/service").get(service)

module.exports = serviceRouter;