import pg from 'pg';

const { Pool } = pg;

export function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }

  const isUsingSSL = process.env.PGSSLMODE === 'require' || process.env.NODE_ENV === 'production';

  const pool = new Pool({
    connectionString,
    ssl: isUsingSSL ? { rejectUnauthorized: false } : false
  });
  return pool;
}

export async function ensureUsersTableAndSeed(pool) {
    if (!pool) {
        return; // No DB configured; skip
    }

  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50)
  );`);

  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM users;');

  if (rows[0].count === 0) {
    await pool.query(
      `INSERT INTO users (name, email) VALUES
      ('John Doe', 'john@example.com'),
      ('Jane Smith', 'jane@example.com');`
    );
  }
}

export async function getUsers(pool, limit = 2) {
  if (!pool) {
    return [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
  }
  const result = await pool.query('SELECT id, name, email FROM users ORDER BY id ASC LIMIT $1;', [limit]);
  return result.rows;
}


