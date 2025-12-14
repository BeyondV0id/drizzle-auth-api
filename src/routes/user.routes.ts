import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { deleteProfileUser, getProfile, updateProfileUser } from "../controllers/user.controller";
import { validateUpdateProfile } from "../middleware/validate";

const router = Router();

router.use(requireAuth);

router.get("/profile", getProfile);
router.put("/profile",validateUpdateProfile, updateProfileUser);
router.delete("/profile", deleteProfileUser);

export default router;
