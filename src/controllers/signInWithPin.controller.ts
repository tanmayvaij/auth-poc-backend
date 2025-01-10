import { Request, Response } from "express";
import { User } from "../models";
import { sign } from "jsonwebtoken";

// Sign with pin in request handler
export const signInWithPin = async (
  req: Request<{}, {}, { email: string; pin: string }>,
  res: Response
) => {
  try {
    // Checking if the user with given email exists or not
    const userExist = await User.findOne({ email: req.body.email });

    // Throwing 404 not found error if user does not exist
    if (!userExist) {
      res.status(404).json({ isSuccess: false, error: "Invalid user" });
      return;
    }

    if (userExist.pin !== req.body.pin) {
      res.status(404).json({ isSuccess: false, error: "Invalid pin" });
      return;
    }

    // Creating a payload
    const payload = { userId: userExist._id };

    // Generating auth token
    const authToken = sign(payload, process.env.SECRET_KEY!);

    res.json({ isSuccess: true, authToken });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error });
    return;
  }
};
