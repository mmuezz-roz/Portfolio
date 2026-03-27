import { Router } from "express";
import { getBlogPosts } from "../controllers/blogController.js";
import { submitContact } from "../controllers/contactController.js";
import { getProjects } from "../controllers/projectController.js";

const router = Router();

router.get("/projects", getProjects);
router.get("/blog", getBlogPosts);
router.post("/contact", submitContact);

export default router;
