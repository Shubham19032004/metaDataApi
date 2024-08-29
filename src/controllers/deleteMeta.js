/** @format */

import { pool } from "../db";

export const deleteMetaData = async (req, res) => {
  const { productId } = res.params;
  if (productId == "") {
    return res.status(400).json({ error: `${productId} is in value` });
  }
  try {
    const getQuery = "SELECT * FROM Metadata where Product =$1";
    const data = await pool.query(getQuery, [productId]);
    if (data.rowCount == 0) {
      return res.json(404, "unable to find data to delet");
    }
    
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: `Unable to get Meta Data for ${productId}` });
  }
};
