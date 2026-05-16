import express from "express";

import {
  createLead,
  deleteLead,
  getLead,
  getLeads,
  updateLead
} from "../controllers/lead-controller.js";

import { protect } from "../middlewares/auth-middleware.js";
import { authorizeRoles } from "../middlewares/role-middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getLeads);
router.get("/:id", getLead);
router.post("/", createLead);
router.put("/:id", updateLead);

router.delete(
  "/:id",
  authorizeRoles("admin"),
  deleteLead
);

export default router;