import { Request, Response } from "express";
import { User } from "../models";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

// Sign in request handler
export const signIn = async (
  req: Request<{}, {}, { email: string; password: string, hash: string }>,
  res: Response
) => {
  try {

    const { email, password, hash } = req.body

    // Checking if the user with given email exists or not
    const userExist = await User.findOne({ email });

    // Throwing 404 not found error if user does not exist
    if (!userExist) {
      res
        .status(404)
        .json({ isSuccess: false, error: "Invalid username or password" });
      return;
    }

    // Comparing the passwords
    const passwordMatched = await compare(
      password.trim(),
      userExist.password
    );

    // Throwing 401 error if passwords not match
    if (!passwordMatched) {
      res
        .status(401)
        .json({ status: false, message: "Invalid username or password" });
      return;
    }

    await User.findOneAndUpdate({ email }, { $set: { hash } })

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
