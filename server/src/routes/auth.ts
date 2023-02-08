import express from "express";
// const controllers = require("../controllers");
const router = express.Router();

const testFunc = () => {};

router.post("/signup", testFunc);
router.post("/login", testFunc);
router.post("/logout", testFunc);
router.post("/logoutAll", testFunc);
router.post("/accessToken", testFunc);
router.post("/refreshToken", testFunc);

export default router;
