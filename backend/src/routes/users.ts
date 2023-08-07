import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

router.get("/tags", requiresAuth, UserController.getTags);

router.patch("/tags", requiresAuth, UserController.addTag);

// router.delete("/tags", requiresAuth, UserController.deleteTag);

export default router;
