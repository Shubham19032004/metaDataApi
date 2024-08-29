/** @format */

import { pool } from "../db/index.js";

export const updateMetaData = async (req, res) => {
  const { userTitle } = req.user;
  const {
    title,
    category,
    geography,
    frequency,
    timePeriod,
    dataSource,
    description,
    lastUpdateDate,
    futureRelease,
    basePeriod,
    keyStatistics,
    NMDS,
    nmdslink,
    remarks,
  } = req.body;
  const { productId } = req.params;
  try {
    if (userTitle !== "DEV" && userTitle != productId) {
        return res
        .status(400)
        .json({ error: " cannot update  the metadata invalid user" });
    }
    const getQuery = "SELECT * FROM MetaData WHERE Product=$1";
    const data = await pool.query(getQuery, [productId]);
    if (data.rowCount == 0) {
      res.status(400).json({ error: `Unable to find Product=${productId}` });
    }
    const query = `UPDATE MetaData 
    SET
        title = $1,
        category = $2,
        geography = $3,
        frequency = $4,
        timePeriod = $5,
        dataSource = $6,
        description = $7,
        lastUpdateDate = $8,
        futureRelease = $9,
        basePeriod = $10,
        keyStatistics = $11,
        NMDS = $12,
        nmdslink = $13,
        remarks = $14
    WHERE product = $15`;
    await pool.query(query, [
      title,
      category,
      geography,
      frequency,
      timePeriod,
      dataSource,
      description,
      lastUpdateDate,
      futureRelease,
      basePeriod,
      keyStatistics,
      NMDS,
      nmdslink,
      remarks,
      productId,
    ]);
    return res.status(200).json({
      data: {},
      msg: "Metadata updated successfully",
      statusCode: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "unable to update metaDataa" });
  }
};
