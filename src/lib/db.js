import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Force dotenv to load the .env file from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

console.log("DEBUG:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? '***' : null,
  database: process.env.DB_NAME
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(conn => {
    console.log('✅ Connected to Aiven MySQL successfully!');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });

export default pool;
