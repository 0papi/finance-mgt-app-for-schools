import express from "express";
import {
  Login,
  RefreshToken,
  Register,
  AccessToken,
  Logout,
  LogoutAll,
} from "../controllers";

const router = express.Router();

router.post("/signup", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/logoutAll", LogoutAll);
router.post("/accesstoken", AccessToken);
router.post("/refreshtoken", RefreshToken);

export default router;
