/** @format */

import pg from "pg";
import { app } from "../app.js";
const pool = new pg.Pool({
  user: "myuser", // The username you set in the Docker run command
  host: "localhost", // Since the PostgreSQL server is running in Docker on your machine
  database: "mydatabase", // The database name you set in the Docker run command
  password: "mypassword", // The password you set in the Docker run command
  port: 5432, // The port number you mapped in the Docker run command
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
