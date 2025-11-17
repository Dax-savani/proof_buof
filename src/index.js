import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createPool, ensureUsersTableAndSeed, getUsers } from './lib/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 9000;

// Initialize DB pooll
const pool = createPool();

// Health/status endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

// Users endpoint (reads first 2 rows)
app.get('/api/users', async (req, res) => {
  try {
    const users = await getUsers(pool, 2);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.type('text/plain').send('Proof backend is running. Try /api/status and /api/users');
});

// Start server after ensuring schema/seed
(async () => {
  try {
    await ensureUsersTableAndSeed(pool);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Startup error', error);
    process.exit(1);
  }
})();


