/** @format */

import pg from "pg";
import { app } from "../app.js";
const pool = new pg.Pool({
  host: 'localhost',        // PostgreSQL server host (if running locally)
  port: 5432,               // PostgreSQL port
  user: 'postgres',         // PostgreSQL username
  password: 'mysecretpassword', // PostgreSQL password
  database: 'mydatabase'
});
export default async function connectdb() {
  try {
    await pool.connect();
    app.listen(3000, () => {
      console.log("http://localhost:3000");
    });
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}
export { pool };
