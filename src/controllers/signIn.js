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
    ) 
    {
      res.status(403).json({ error: "Both email and password are required" });
    }
    const query = "SELECT * FROM Users WHERE email=$1";
    const userrows = await pool.query(query, [email]);
    if (userrows.rowCount == 0) {
      res.status(404).json({ error: "User not found" });
    }
    const user = userrows.rows[0];
    const correctpassword = await bcrypt.compare(password, user.password);
    if (!correctpassword) {
      res.status(400).json({ error: "Incorrect password" });
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
    res.status(200).send({
        data:  {
            email:email
        },
        msg: "User Verified",
        statusCode: true
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "unable to SignIn" });
  }
};
