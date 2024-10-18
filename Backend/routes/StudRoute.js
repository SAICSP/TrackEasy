import { Router } from "express";
import { signup, signin,students } from "../controllers/Studcontroller.js"; // Ensure correct case for file name

const router = Router();

router.route("/signin").post(signin);
router.route("/signup").post(signup);
router.route("/students").post(students);

export default router;
