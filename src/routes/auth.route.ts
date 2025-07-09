import { Router } from "express";
import { register } from "../controllers/authControllers";

const router = Router();

router.post("/register", register);
router.get("/register", register);

export default router;
