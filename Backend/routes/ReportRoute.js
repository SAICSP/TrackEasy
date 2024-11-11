import { Router } from "express";
import { save, getreports } from "../controllers/Reportcontroller.js";

const router = Router();

router.post("/save", save);
router.get("/getreports", getreports);

export default router;
