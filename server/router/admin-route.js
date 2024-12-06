const express = require("express");
const admincontroller = require("../controller/admin-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const router = express.Router();


router.route("/user/data").get(authMiddleware, adminMiddleware, admincontroller.userdata);
router.route("/user/delete/:id").delete(authMiddleware, adminMiddleware, admincontroller.deleteUser)
router.route("/user/edit/:id").put(authMiddleware,adminMiddleware, admincontroller.editUser)
router.route("/contact").get(authMiddleware ,adminMiddleware, admincontroller.contactdata)
router.route("/contact/delete/:id").delete(authMiddleware ,adminMiddleware, admincontroller.deleteContact)
router.route("/user/block/:id").post(authMiddleware ,adminMiddleware, admincontroller.blockUser)

module.exports = router;