# Deployment Guide

## 1) Deploy Backend (Render)

1. Push your repo to GitHub.
2. In Render, create **New Web Service** and connect the repo.
3. Set:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = strong random secret
   - `PORT` = `5000`
   - `CORS_ORIGIN` = your frontend URL (example: `https://your-app.vercel.app`)
5. Deploy. Copy backend URL (example: `https://stock-dashboard-api.onrender.com`).

## 2) Deploy Frontend (Vercel)

1. In Vercel, import the same repo.
2. Set:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
3. Add environment variable:
   - `REACT_APP_API_BASE_URL` = backend URL from Render
4. Deploy.

## 3) Update Backend CORS for Frontend URL

In Render backend env vars, set:
- `CORS_ORIGIN=https://your-frontend.vercel.app`

If you use multiple domains:
- `CORS_ORIGIN=https://your-frontend.vercel.app,http://localhost:3000`

## 4) Redeploy Order

1. Deploy backend first.
2. Set frontend `REACT_APP_API_BASE_URL`.
3. Deploy frontend.

## 5) Quick Verification

- Open frontend URL
- Signup/Login works
- Search stock works
- Add transaction works
- Export CSV works
