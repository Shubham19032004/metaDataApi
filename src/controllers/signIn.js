/** @format */
import generateAccessToken from "../utils/genrateAccessToken.js";
import { pool } from "../db/index.js";
import bcrypt from "bcrypt";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email == "" ||
      email == null ||
      email == undefined ||
      password == "" ||
      password == null ||
      password == undefined
    ) {
      return res
        .status(403)
        .json({ error: "Both email and password are required" });
    }
    const query = "SELECT * FROM Users WHERE email=$1";
    const userrows = await pool.query(query, [email]);
    if (userrows.rowCount == 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = userrows.rows[0];
    const correctpassword = await bcrypt.compare(password, user.password);
    if (!correctpassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    const accessToken = generateAccessToken({
      email: email,
      id: user.id,
    });
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    return res.status(200).json({
      data: {
        email: email,
      },
      msg: "User Verified",
      statusCode: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "unable to SignIn" });
  }
};

export const signOut=async(req,res)=>{
  res.clearCookie("accessToken");
  return res.status(200).json({
    data: {},
    msg: "Logout",
    statusCode: true,
  });
}