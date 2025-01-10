import { Request, Response } from "express";
import { User } from "../models";

// Set Hash request handler
export const getUserByHash = async (
  req: Request<{}, {}, { hash: string; email: string }>,
  res: Response
) => {
  try {
    const { hash } = req.body;

    User.findOne({ hash })
      .then((user) => {
        if (user) res.json({ isSuccess: true, email: user.email });
      })
      .catch((err) => {
        res.json({ isSuccess: false, err });
      });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error });
    return;
  }
};
