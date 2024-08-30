/** @format */

import jwt from "jsonwebtoken";

export default function generateAccessToken({ userName, id }) {
  return jwt.sign(
    {
      _id: id,
      userName: userName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
}
