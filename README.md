## Proof Backend (Express + Postgres)

Minimal backend to demo live endpoints:
- `/api/status` — health check (no DB required)
- `/api/users` — returns 1–2 demo users from Postgres (auto-seeded)

### Local Setup
1. Install Node.js 18+.
2. Install deps:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and set `DATABASE_URL` if you have Postgres.
   - If you skip `DATABASE_URL`, the app still runs and returns demo users from memory.
4. Start dev server:
   ```bash
   npm run dev
   ```
5. Test endpoints:
   - `http://localhost:9000/api/status`
   - `http://localhost:9000/api/users`

### Deploy to Render
1. Push this repo to GitHub.
2. In Render, create a new Web Service:
   - Build Command: `npm install`
   - Start Command: `npm start`
3. (Optional) Create a Render Postgres instance and copy its `DATABASE_URL` into your service env vars.
   - Add `PGSSLMODE=require` in env vars.
4. Deploy. Then visit:
   - `https://yourapp.onrender.com/api/status`
   - `https://yourapp.onrender.com/api/users`

### Notes
- Never share real credentials. Mask passwords when showing the URL.
- On first boot with a real DB, the `users` table is created and seeded if empty.


