import express from "express";
const router = express.Router();
import sessionC from "../controllers/session.controller.js";

router.post("/login", sessionC.login);
router.delete("/logout", sessionC.logout);
router.get("/session", sessionC.session);

export default router;