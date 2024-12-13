const express = require('express');
const router = express.Router();
const PostControllr = require('../controller/post-controller')

router.route("/").get(PostControllr.post);
router.route("/addpost").post(PostControllr.addpost);
router.route("/deletepost:id").delete(PostControllr.deletePost);


module.exports = router;


