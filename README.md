# Vaulta - Secure Escrow Payment Platform for Ghana

A complete mobile and web application for secure escrow-based transactions in Ghana, featuring KYC verification, real-time messaging, wallet management, and Paystack integration.

## Features

- **Secure Authentication**: JWT-based authentication with password hashing
- **KYC Verification**: 4-step identity verification process
- **Wallet Management**: Top-up via mobile money and bank transfers
- **Escrow Deals**: Create, manage, and track escrow transactions
- **Real-Time Chat**: Socket.IO powered messaging between counterparties
- **Payment Processing**: Paystack integration for deposits and withdrawals
- **Transaction History**: Complete audit trail of all transactions
- **Notifications**: Real-time alerts for deal updates
- **Buy/Sell Listings**: Browse and create product/service listings

## Tech Stack

### Frontend
- React Native + Expo
- TypeScript
- Zustand (State Management)
- Socket.IO Client (Real-time)
- Axios (HTTP Client)

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL (Neon)
- Socket.IO (WebSockets)
- JWT Authentication
- Paystack API

## Quick Start

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions.

\`\`\`bash
# Backend
cd backend
npm install
npm run dev

# Frontend
npm install
npx expo start
\`\`\`

## Project Structure

\`\`\`
.
├── src/
│   ├── screens/          # React Native screens
│   ├── components/       # Reusable components
│   ├── navigation/       # React Navigation
│   ├── services/         # API & WebSocket
│   ├── store/           # Zustand stores
│   ├── types/           # TypeScript types
│   └── styles/          # Theme & colors
├── backend/
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Auth & validators
│   │   ├── services/    # Business logic
│   │   ├── config/      # Database & env
│   │   └── utils/       # Helpers
│   └── scripts/         # Database seeding
└── docs/               # Documentation
\`\`\`

## License

MIT License - See LICENSE file for details
