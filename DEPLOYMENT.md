# Vaulta Deployment Guide

## Backend Deployment (Vercel)

### 1. Prepare Backend
\`\`\`bash
cd backend
npm run build
\`\`\`

### 2. Create Vercel Configuration
Create `vercel.json`:
\`\`\`json
{
  "version": 2,
  "builds": [
    { "src": "dist/server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "dist/server.js" }
  ]
}
\`\`\`

### 3. Deploy to Vercel
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### 4. Set Environment Variables
In Vercel dashboard:
- DATABASE_URL
- JWT_SECRET
- PAYSTACK_SECRET_KEY
- PAYSTACK_PUBLIC_KEY
- NODE_ENV=production

## Frontend Deployment (Expo EAS)

### 1. Create EAS Config
\`\`\`bash
eas init
\`\`\`

### 2. Build App
\`\`\`bash
# For preview
eas build --platform ios --profile preview
eas build --platform android --profile preview

# For production
eas build --platform ios --profile production
eas build --platform android --profile production
\`\`\`

### 3. Submit to App Stores
\`\`\`bash
eas submit --platform ios
eas submit --platform android
\`\`\`

## Database Setup (Neon)

### 1. Create Neon Project
- Go to console.neon.tech
- Create new project
- Copy connection string

### 2. Run Migrations
\`\`\`bash
PGPASSWORD=your_password psql -h host -U user -d database -f backend/scripts/init-db.sql
\`\`\`

### 3. Seed Data
\`\`\`bash
cd backend
npm run seed
\`\`\`

## Post-Deployment

### 1. Test Endpoints
\`\`\`bash
curl https://your-backend.vercel.app/api/health
\`\`\`

### 2. Update Frontend URLs
Update `.env.local`:
\`\`\`env
EXPO_PUBLIC_API_URL=https://your-backend.vercel.app/api
EXPO_PUBLIC_WS_URL=https://your-backend.vercel.app
\`\`\`

### 3. Monitor Logs
- Vercel Dashboard: Deployments → Logs
- Backend: Check error logs
- Frontend: Use Expo dashboard

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] JWT secret rotated
- [ ] Database backups enabled
- [ ] Error logs monitored
\`\`\`
