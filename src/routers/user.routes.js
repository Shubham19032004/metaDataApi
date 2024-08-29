/** @format */

import { Router } from "express";
import { signIn, signOut } from "../controllers/signIn.js";
import { getMetaData, getMetaDataID } from "../controllers/getMeta.js";
import { verifyJwt } from "../middleware/user.auth.js";
import { createMetaData } from "../controllers/createMeta.js";
import { updateMetaData } from "../controllers/updateMeta.js";
import { deleteMetaData } from "../controllers/deleteMeta.js";

const router = Router();
router.route("/signin").post(signIn);
router.route("/signOut").get(signOut);
router.route("/create").post(verifyJwt, createMetaData);
router.route("/getMetaData").get(verifyJwt, getMetaData);
router.route("/:productId").get(verifyJwt,getMetaDataID)
router.route("/update/:productId").patch(verifyJwt,updateMetaData)
router.route("/deleteMeta/:productId").delete(verifyJwt,deleteMetaData)
export default router;
