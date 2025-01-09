import { connect } from "mongoose";

export const connectToDatabase = async () => {
  try {
    await connect(process.env.MONGODB_URL as string);
    console.log("connected to database successfully");
  } catch (error) {
    console.log(error);
  }
};