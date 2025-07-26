const {Router} = require("express");
const SignUp= require("../controller/SignUp");
const login= require("../controller/login");
const auth = require("../controller/auth");

const router = Router();
router.post("/signup",SignUp);
router.post("/login",login);
router.post("/auth",auth);
module.exports = router;