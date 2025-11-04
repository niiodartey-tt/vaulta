# Vaulta Escrow Payment App - Setup Guide

## Overview
Vaulta is a complete escrow payment application for Ghana, featuring real-time messaging, KYC verification, wallet management, and secure payment processing via Paystack.

## Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL 12+ (running locally on your laptop)
- Paystack account for payment processing

## PostgreSQL Setup (Local)

### 1. Install PostgreSQL
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- **macOS**: `brew install postgresql@15`
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

### 2. Start PostgreSQL Service
- **Windows**: PostgreSQL should run as a service automatically
- **macOS**: `brew services start postgresql@15`
- **Linux**: `sudo service postgresql start`

### 3. Create Database and User
\`\`\`bash
# Connect to PostgreSQL
psql -U postgres

# In psql shell, run:
CREATE DATABASE vaulta;
CREATE USER vaulta_user WITH PASSWORD 'vaulta_password';
GRANT ALL PRIVILEGES ON DATABASE vaulta TO vaulta_user;
\q
\`\`\`

### 4. Verify Connection
\`\`\`bash
psql -U vaulta_user -d vaulta -h localhost
\`\`\`

## Backend Setup

### 1. Install Dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

### 2. Configure Environment Variables
Create a `.env` file in the backend directory (adjust credentials if you used different values):

\`\`\`env
PORT=3000
DATABASE_URL=postgresql://vaulta_user:vaulta_password@localhost:5432/vaulta
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
NODE_ENV=development
\`\`\`

### 3. Start Backend Server
\`\`\`bash
npm run dev
\`\`\`

The server will automatically create all tables on startup. You should see: "Database tables ensured to exist"

### 4. Seed Sample Data (Optional)
In a new terminal:
\`\`\`bash
cd backend
npm run seed
\`\`\`

This creates test users and sample listings for development.

## Frontend Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:

\`\`\`env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_WS_URL=http://localhost:3000
\`\`\`

For production, update these URLs to your deployed backend.

### 3. Install Required Packages
\`\`\`bash
npm install @react-native-async-storage/async-storage socket.io-client
\`\`\`

### 4. Run the App
\`\`\`bash
# Start Expo dev server
npx expo start

# Scan QR code with Expo Go app on your phone
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user (accepts email or username)
- `POST /api/auth/login` - Login user (accepts email or username)
- `GET /api/auth/me` - Get current user

### KYC
- `POST /api/kyc/submit` - Submit KYC verification
- `GET /api/kyc/status` - Get KYC status

### Wallet
- `GET /api/wallet/balance` - Get wallet and escrow balance
- `POST /api/payments/topup/initialize` - Initialize Paystack payment
- `POST /api/payments/topup/verify` - Verify payment and update wallet
- `POST /api/payments/withdraw/initialize` - Initiate withdrawal

### Deals
- `POST /api/deals/create` - Create escrow deal
- `GET /api/deals/my-deals` - Get user's deals
- `GET /api/deals/:dealId` - Get deal details
- `POST /api/deals/:dealId/release` - Release escrow funds

### Messages
- `POST /api/messages/send` - Send chat message
- `GET /api/messages/deal/:dealId` - Get deal messages
- `PUT /api/messages/:messageId/read` - Mark message as read

### Listings
- `GET /api/listings` - Browse all listings
- `GET /api/listings/my-listings` - Get user's listings
- `POST /api/listings/create` - Create new listing
- `PUT /api/listings/:listingId` - Update listing
- `DELETE /api/listings/:listingId` - Delete listing

### Transactions
- `GET /api/transactions` - Get transaction history
- `GET /api/transactions/:transactionId` - Get transaction details

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile/update` - Update profile
- `POST /api/profile/change-password` - Change password

### Notifications
- `GET /api/notifications` - Get all notifications
- `PUT /api/notifications/:notificationId/read` - Mark as read

## Real-Time Features

The app uses Socket.IO for real-time updates:

### Events
- `join-deal` - Join deal chat room
- `send-message` - Send chat message
- `receive-message` - Listen for new messages
- `notify` - Send notification
- `notification` - Listen for notifications
- `deal-status-change` - Update deal status
- `deal-updated` - Listen for deal updates

## Test Credentials

After seeding:
- Email: `buyer@example.com` | Username: `buyer` | Password: `password123`
- Email: `seller@example.com` | Username: `seller` | Password: `password123`

## Troubleshooting

### Database Connection Error
\`\`\`bash
# Check if PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Verify your connection string matches .env
DATABASE_URL=postgresql://vaulta_user:vaulta_password@localhost:5432/vaulta
\`\`\`

### Cannot Connect to PostgreSQL
- Ensure PostgreSQL service is running
- Verify database `vaulta` exists: `psql -U postgres -l`
- Check credentials in .env file
- Restart PostgreSQL service

### Authentication Failed
- Clear Expo cache: `npx expo r -c`
- Verify JWT_SECRET in .env
- Check token expiration (7 days default)

### WebSocket Connection Failed
- Verify EXPO_PUBLIC_WS_URL is correct
- Ensure backend is running on port 3000
- Check firewall settings

## Development Tips

### Database Queries
Connect directly to database for debugging:
\`\`\`bash
psql -U vaulta_user -d vaulta -h localhost

# Common queries:
\dt                  # List all tables
SELECT * FROM users; # View users
\q                   # Exit psql
\`\`\`

### Reset Database
\`\`\`bash
# Connect to postgres (not vaulta database)
psql -U postgres

# Drop and recreate
DROP DATABASE vaulta;
CREATE DATABASE vaulta;
GRANT ALL PRIVILEGES ON DATABASE vaulta TO vaulta_user;

# Server will recreate tables on next start
\`\`\`

## Deployment

When ready to deploy:
1. Set up PostgreSQL on your server (AWS RDS, DigitalOcean, etc.)
2. Update DATABASE_URL to production database
3. Deploy backend to Vercel, Heroku, or your preferred platform
4. Build mobile app with `eas build` and submit to app stores

## Security Notes

1. Never commit `.env` file to Git (use `.env.example` instead)
2. Always use HTTPS in production
3. Rotate JWT_SECRET regularly
4. Store Paystack keys in environment variables only
5. Use strong PostgreSQL password
6. Enable PostgreSQL encryption in production

## Support

For issues or questions, check the backend logs with `npm run dev` for detailed error messages.
\`\`\`

```env file="" isHidden
