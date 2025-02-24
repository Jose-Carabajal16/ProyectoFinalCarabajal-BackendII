import { Router } from "express";
import UserDTO from "../dtos/UserDTO.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/current", auth, (req, res) => {
  res.json(new UserDTO(req.user));
});

export default router;