/** @format */

import { pool } from "../db/index.js";

export const createMetaData = async (req, res) => {
  const { userRole } = req.user;

  const {
    Product,
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
  try {
    if (userRole != "admin") {
      return res
        .status(400)
        .json({ error: "Only developers can create the metadata" });
    }
    const getQuery = `SELECT * FROM MetaData WHERE Product=$1`;
    const data = await pool.query(getQuery, [Product]);
    if (data.rowCount != 0) {
      return res.status(400).json({ error: "Metadata already exists" });
    }
    const query = `INSERT INTO MetaData (Product,title,category,geography,frequency,timePeriod,dataSource,description,lastUpdateDate,futureRelease,basePeriod,keyStatistics,NMDS,nmdslink,remarks) 
                   VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`;

    await pool.query(query, [
      Product,
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
    ]);
    return res.status(200).send({
      data: {},
      msg: "Metadata created successfully",
      statusCode: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Unable to create metadata" });
  }
};
