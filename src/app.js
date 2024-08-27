import express from "express"

import cors from "cors"
import cookieParser from "cookie-parser"

const app=express();
app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
app.use(express.json({limit:"16kb"}));
app.use(cookieParser());

import UserRouter from "./routers/user.routes.js"
app.use("/api/user",UserRouter)
export {app};