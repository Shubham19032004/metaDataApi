/** @format */

import { pool } from "../db/index.js";

export const getMetaData = async (req, res) => {
  try {
    const query = "SELECT * FROM MetaData";
    const data = await pool.query(query);
    if (data.rowCount == 0) {
      res.status(404).json({ error: "Data not found" });
    }
    const metaData = data.rows;
    res.status(200).send({
      data: metaData,
      msg: "Meta data",
      statusCode: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get Meta Data" });
  }
};

export const getMetaDataID = async (req, res) => {
  const { userTitle } = req.user;
  console.log(userTitle);
  const { productId } = req.params;

  try {
    if (userTitle != productId && userTitle != "dev") {
      res.status(403).json({
        error: `only developer or ${userTitle} can change the produuct`,
      });
    }
    const query = "SELECT * FROM MetaData WHERE product=$1";
    const result = await pool.query(query, [productId]);
    if (result.rowCount == 0) {
      res.status(404).json({ error: `Data not found` });
    }
    res.status(200).send({
      data: result.rows,
      msg: "Meta data",
      statusCode: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Unable to get Meta Data for ${productId}` });
  }
};
