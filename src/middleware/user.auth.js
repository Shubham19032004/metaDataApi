/** @format */

import { pool } from "../db/index.js";
import jwt from "jsonwebtoken";
export const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization || "").replace("Bearer", "");
    if (!token) {
      res.status(401).json({ message: "unauthorized user " });
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const query = "SELECT * FROM Users WHERE id=$1";
    const data = await pool.query(query, [decodedToken._id]);
    if (!data) {
      res.status(404).json({ message: "User not Found" });
    }
    const user = data.rows[0];
    req.user = {
      userName: user.userName,
      userRole: user.role,
      id: user.id,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to validate user" });
  }
};
