import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// const pool = new Pool({
// 	user: "postgres",
// 	password: "Grey?02092006",
// 	host: "localhost",
// 	port: "5432",
// 	database: "todo",
// });

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false }, // required for Supabase
});

export default pool;
