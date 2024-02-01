const app = require("express");
const authHandler = require("./../middleware/auth-handler.js");

const router = app.Router();
const {getUser, postRegister, postLogin} = require("./../controllers/user-controller.js");

router.route("/").get(authHandler, getUser);
router.route("/register").post(postRegister);
router.route("/login").post(postLogin);

module.exports = router;