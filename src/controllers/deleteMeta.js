/** @format */

import { pool } from "../db/index.js";

export const deleteMetaData = async (req, res) => {
  const { userRole } = req.user;

  if (userRole != "admin") {
    return res
      .status(400)
      .json({ error: "Only developers can delete  the metadata" });
  }
  const { productId } = req.params;
  if (productId == "") {
    return res.status(400).json({ error: `${productId} is in value` });
  }
  const query = "DELETE FROM MetaData WHERE Product=$1";
  try {
    const getQuery = "SELECT * FROM Metadata where Product =$1";
    const data = await pool.query(getQuery, [productId]);
    if (data.rowCount == 0) {
      return res
        .status(404)
        .json({ error: `Unable to find ${productId} in database ` });
    }
    const result = await pool.query(query, [productId]);
    res.status(200).send({ msg: "deleted", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: `Unable to get Meta Data for ${productId}` });
  }
};
