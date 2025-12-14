import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
  deleteProfileUser,
  getProfile,
  updateProfileUser,
} from "../controllers/user.controller";
import { validateUpdateProfile } from "../middleware/validate";

const router = Router();

router.use(requireAuth);

router.get("/me", getProfile);
router.put("/me", validateUpdateProfile, updateProfileUser);
router.delete("/me", deleteProfileUser);

export default router;
