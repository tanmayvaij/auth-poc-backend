import { Router } from "express";

import { setHash, signIn, signUp, verifyUser } from "../controllers";
import { passwordHasher, verifyToken } from "../middlewares";

export const authRouter = Router();

authRouter.route("/sign-up").post(passwordHasher, signUp);

authRouter.route("/sign-in").post(signIn);

authRouter.route("/verify-user").get(verifyToken, verifyUser);

authRouter.route("/set-hash").post(setHash);
