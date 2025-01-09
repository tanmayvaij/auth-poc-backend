import { Request, Response } from "express";
import { User } from "../models";

// Set Hash request handler
export const setHash = async (
  req: Request<{}, {}, { hash: string; email: string }>,
  res: Response
) => {
  try {
    const { email, hash } = req.body;

    User.findOneAndUpdate({ email }, { $set: { hash } })
      .then(() => {
        res.json({ isSuccess: true, message: "Hash has been set" });
      })
      .catch((err) => {
        res.json({ isSuccess: false, err });
      });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error });
    return;
  }
};
