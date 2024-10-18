import { Router } from "express";
import { signup, signin } from "../controllers/Teachercontroller.js";

const router = Router();

router.route("/signin").post(signin);
router.route("/signup").post(signup);

export default router;
