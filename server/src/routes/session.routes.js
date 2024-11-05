import express from "express";
const router = express.Router();
import sessionC from "../controllers/session.controller.js";
//importar controlador  de autenticación para verificar si un usuario puede tener acceso o no a una página.

router.post("/login", sessionC.login);
router.delete("/logout", sessionC.logout);
router.get("/session"/* , controlador de autenticación */, sessionC.session);

export default router;