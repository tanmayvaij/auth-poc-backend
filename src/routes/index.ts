import { Router } from "express";

import { setHash, signIn, signUp, verifyUser } from "../controllers";
import { passwordHasher, verifyToken } from "../middlewares";

import { getUserByHash } from "../controllers/getUserByHash.controller";
import { signInWithPin } from "../controllers/signInWithPin.controller";

export const authRouter = Router();

authRouter.route("/sign-up").post(passwordHasher, signUp);

authRouter.route("/sign-in").post(signIn);

authRouter.route("/sign-in-with-pin").post(signInWithPin)

authRouter.route("/verify-user").get(verifyToken, verifyUser);

authRouter.route("/set-hash").post(setHash);

authRouter.route("/get-user-by-hash").post(getUserByHash);
