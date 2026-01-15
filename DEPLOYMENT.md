# Deployment Guide - Expense Tracker

This guide will help you deploy the Expense Tracker application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **MongoDB Atlas**: A MongoDB database (get free tier at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))

## Environment Variables

You'll need to configure these environment variables in Vercel:

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/expensetracker` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-jwt-key-here` |
| `CLIENT_URL` | Frontend URL (auto-set by Vercel) | `https://your-app.vercel.app` |
| `PORT` | Port number (optional, Vercel sets this) | `5000` |

## Deployment Steps

### Step 1: Push Code to GitHub

```bash
cd /Users/yashraghubanshi/Desktop/Expense-Tracker
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### Step 2: Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your `Expense-Tracker` repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `frontend/expense-tracker/dist`

### Step 3: Configure Environment Variables

In the Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add each variable from the table above
3. Make sure to add them for **Production**, **Preview**, and **Development** environments

### Step 4: Deploy

1. Click **Deploy**
2. Wait for the build to complete (2-5 minutes)
3. Once deployed, you'll get a URL like `https://your-app.vercel.app`

## Verifying Deployment

### Test the Frontend
- Visit your Vercel URL
- You should see the login/signup page

### Test the Backend API
- Visit `https://your-app.vercel.app/api/health`
- You should see: `{"status":"ok","message":"Server is running"}`

### Test Full Functionality
1. Sign up for a new account
2. Log in
3. Add an income entry
4. Add an expense entry
5. Check the dashboard

## Troubleshooting

### Build Fails

**Error**: `Module not found` or dependency errors
- **Solution**: Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error**: `Build exceeded maximum duration`
- **Solution**: Check if there are large files in your repo. Add them to `.gitignore`

### API Routes Not Working

**Error**: 404 on `/api/v1/*` routes
- **Solution**: Check `vercel.json` routing configuration
- Verify environment variables are set correctly

### Database Connection Issues

**Error**: `MongooseError: connect ECONNREFUSED`
- **Solution**: 
  - Verify `MONGODB_URI` is set correctly in Vercel
  - Check MongoDB Atlas network access (allow all IPs: `0.0.0.0/0`)
  - Verify database user credentials

### CORS Errors

**Error**: `Access-Control-Allow-Origin` errors
- **Solution**: Set `CLIENT_URL` environment variable to your Vercel domain
- Example: `https://your-app.vercel.app`

## Alternative: Deploy Backend Separately

If you prefer to deploy the backend separately:

### Option 1: Railway

1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Select the `backend` folder as root
4. Add environment variables
5. Deploy

### Option 2: Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Set root directory to `backend`
5. Add environment variables
6. Deploy

Then update your frontend to point to the backend URL:
- Create a `.env` file in `frontend/expense-tracker`:
  ```
  VITE_API_URL=https://your-backend-url.com
  ```

## Monitoring

After deployment:
- Check Vercel Dashboard for logs
- Monitor function execution times
- Set up error tracking (optional: Sentry, LogRocket)

## Updating Your Deployment

To deploy updates:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically redeploy on every push to `main` branch.

## Need Help?

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- MongoDB Atlas Docs: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- Check Vercel deployment logs for specific errors
