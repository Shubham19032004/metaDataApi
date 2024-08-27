/** @format */

import { pool } from "../db/index.js";

export const createMetaData = async (req, res) => {
  const { userTitle } = req.user;
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
    if (userTitle != "dev") {
      res.status(500).json({ error: "Only developer can create the metadata" });
    }
    const query = `INSERT INTO MetaData (Product,title,category,geography,frequency,timePeriod,dataSource,description,lastUpdateDate,futureRelease,basePeriod,keyStatistics,NMDS,nmdslink,remarks) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`;
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
    res.status(200).send({
      data: {},
      msg: "Metadata created successfully",
      statusCode: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "unable to create metaDataa" });
  }
};
