import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a typed connection pool
const pool: Pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: false // set to true if using a remote DB like Render, Supabase, etc.
});

// Immediately Invoked Async Function to test the DB connection
(async () => {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL connected successfully');
    client.release(); // release the client back to the pool
  } catch (err: any) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
})();

// Export the pool for usage in other files
export default pool;
