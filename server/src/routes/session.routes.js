import express from "express";
const router = express.Router();
import sessionC from "../controllers/session.controller.js";
import jwtAuthenticate from "../../config/jwt.config.js"

router.post("/login", sessionC.login);
router.delete("/logout", sessionC.logout);
router.get("/session", jwtAuthenticate, sessionC.session);

export default router;