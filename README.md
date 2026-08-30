<div align="center">

  <img src="public/images/logo.svg" alt="Tipora Logo" width="180" height="auto" />

  # Tipora Dashboard
  
  **The Modern, High-Performance Admin & Operations Platform for the Tipora Tipping Ecosystem**

  <p align="center">
    <b>Tipora</b> is a next-generation tip-sharing ecosystem enabling users to give individual or multi-person split tips seamlessly via QR code scans with <b>0% platform fee</b> during tipping. This dashboard provides administrators with real-time financial tracking, Stripe payout monitoring, user management, and a token-based live support center.
  </p>

 

</div>

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Business Model & Monetization](#business-model--monetization)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API & Real-Time Socket Integration](#api--real-time-socket-integration)
- [Security & Authentication](#security--authentication)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Tipora Dashboard** is the command center of the Tipora platform. It connects with the mobile application backend to give operations, finance, and support teams 360-degree control over all financial transactions, user accounts, platform revenues, and customer service operations.

### Key Highlights

- **Zero Platform Fee on Tipping**: 100% of sent tips go to recipients (or split dynamically among multiple recipients via QR code scan) without any platform deductions.
- **Stripe Connect & Flexible Withdrawals**: Receivers onboard to Stripe Connect to withdraw funds. Tipora supports:
  - **Standard Payout**: 100% Free (0% platform fee, standard bank clearing).
  - **Instant Payout**: 3% Platform Fee for immediate liquidity.
- **Token-Based Support System**: Comprehensive ticket lifecycle management with real-time bidirectional Socket.io messaging, agent assignments, staff notes, and user satisfaction ratings.
- **Advanced Financial Intelligence**: Dynamic charting for platform revenue, gross tip volume, weekly/monthly/yearly growth comparisons, and real-time ledger auditing.

---

## Core Features

### 1. Executive KPI & Analytics Dashboard
- **Financial Metric Cards**: Real-time totals for Gross Tip Volume, Platform Revenue, Total Users, Active Withdrawals, and Net Flows.
- **Period-Over-Period Comparisons**: Automated weekly, monthly, and yearly growth comparisons against previous periods.
- **Interactive Revenue & Growth Charts**: Built with `Recharts`, providing visual drill-downs by time windows (`weekly`, `monthly`, `yearly`).
- **Recent Activity Ledger**: Quick glance at new user signups and transaction milestones.

### 2. Tip Management & Multi-Split Tracking
- **Individual & Multi-Person Split Tips**: Complete audit trail of single-recipient tips and group split tips generated through QR code scanning.
- **Fee Transparency**: Verified 0% platform fee calculation at tip transmission.
- **Transaction Life Cycle**: Track statuses: `PENDING`, `COMPLETED`, `FAILED`, and `REFUNDED`.
- **Granular Tip Dialog**: Detailed modal breaking down sender info, multiple receiver allocations, net amounts, payment methods, and timestamps.
- **Advanced Filtering**: Filter by date range, tip status, sender/receiver, or keyword search.

### 3. Stripe Payouts & Withdraw Management
- **Stripe Connect Verification**: Real-time visibility into user Stripe Account onboarding status (`Verified` vs `Not Verified`).
- **Payout Mode Discrimination**:
  - **Standard Withdraw**: Free / 0% Platform Fee.
  - **Instant Withdraw**: Automated 3% Platform Fee calculation.
- **Financial Breakdown Modal**: Inspect gross withdraw amount, platform fee revenue, Stripe processing fee, and net payout amount.
- **Stripe Tracking IDs**: View `stripeTransferId` and `stripePayoutId` for dispute resolution and banking reconciliation.

### 4. Platform Revenue Center
- **Revenue Accounting**: Track all income generated from the 3% instant withdrawal monetization engine.
- **Reference Auditing**: Every revenue record links directly to the underlying `WithdrawTransection` ID.
- **Summary Cards & Exportable Logs**: Review cumulative revenue, daily run rates, and monthly totals.

### 5. User & Wallet Administration
- **Complete User Directory**: Searchable list of all registered senders, service staff, and creators.
- **Wallet Balances & Histories**: Instant view of `totalEarned`, `totalWithdrawn`, and `availableBalance`.
- **Status & Moderation Controls**: Instant account suspension (`ACTIVE` / `BLOCKED`) with server synchronization.
- **Identity & Verification Badges**: Phone, email, and Stripe verification status checks.

### 6. Token-Based Support & Live Chat Hub
- **Unique Token / Ticket IDs**: Every inquiry receives an auto-generated tokenized ticket ID (e.g., `#TICK-1024`).
- **Real-Time Messaging**: Built-in Socket.io integration (`connectSocket`, `disconnectSocket`) for instantaneous live chat between admins and users.
- **Internal Staff Notes**: Add private internal notes visible only to admins and support agents.
- **Ticket Workflow**:
  - **Priorities**: `LOW`, `MEDIUM`, `HIGH`, `URGENT`
  - **Statuses**: `OPEN`, `IN_PROGRESS`, `WAITING_ON_USER`, `RESOLVED`, `CLOSED`, `REOPENED`
  - **Categories**: `PAYMENT_ISSUE`, `WITHDRAWAL_ISSUE`, `TIP_ISSUE`, `ACCOUNT_ISSUE`, `TECHNICAL_ISSUE`, `FEEDBACK`, `OTHER`
- **File Attachments & Ratings**: Support for screenshots, receipts, error logs, and customer satisfaction ratings (1–5 stars + review).

### 7. Live Notifications & Alerts
- **Real-Time Push & Socket Alerts**: Immediate notification badges for new withdrawal requests, high-priority support tickets, and system events.
- **Notification Drawer**: Filter unread alerts, mark single/all as read, or purge history.

### 8. Enterprise Security & Admin Controls
- **JWT & Role-Based Middleware**: Route protection via Next.js middleware checking for `ADMIN` role.
- **Credential & Password Management**: Dedicated interface for password change and session revocation.
- **Secure Cookie Storage**: Tokens handled via secure `accessToken` cookies.

---

## Business Model & Monetization

```
                               ┌───────────────────────────┐
                               │     Tipora Ecosystem      │
                               └─────────────┬─────────────┘
                                             │
             ┌───────────────────────────────┴───────────────────────────────┐
             │                                                               │
             ▼                                                               ▼
   ┌───────────────────┐                                           ┌───────────────────┐
   │    Tipping Flow   │                                           │  Withdrawal Flow  │
   │  (QR Scan / Split)│                                           │  (Stripe Connect) │
   └─────────┬─────────┘                                           └─────────┬─────────┘
             │                                                               │
             ▼                                             ┌─────────────────┴─────────────────┐
   ┌───────────────────┐                                   ▼                                   ▼
   │  0% Platform Fee  │                         ┌───────────────────┐               ┌───────────────────┐
   │ (Free for users)  │                         │  Standard Payout  │               │  Instant Payout   │
   └───────────────────┘                         │  0% Platform Fee  │               │  3% Platform Fee  │
                                                 │ (Regular Timeline)│               │(Instant Liquidity)│
                                                 └───────────────────┘               └─────────┬─────────┘
                                                                                               │
                                                                                               ▼
                                                                                     ┌───────────────────┐
                                                                                     │  Platform Revenue │
                                                                                     │ (Tipora Business) │
                                                                                     └───────────────────┘
```

| Action / Flow | Platform Fee | Description |
| :--- | :--- | :--- |
| **Peer-to-Peer Tip (Single)** | **0% (Free)** | Sender sends tip directly to receiver via QR scan. |
| **Multi-Person Split Tip** | **0% (Free)** | Tip is split proportionally among group members with zero platform cut. |
| **Standard Withdrawal** | **0% (Free)** | Payout transferred via Stripe Connect within normal ACH/banking days. |
| **Instant Withdrawal** | **3% Platform Fee** | Immediate transfer to debit card / bank; 3% deducted as platform revenue. |

---

## Tech Stack

| Domain | Technology / Library | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Core SSR & React Server/Client framework |
| **Library** | [React 19](https://react.dev/) | UI component library |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end type safety |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first, responsive design system |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) | Accessible dialogs, selects, dropdowns, collapsibles |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent UI iconography |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) | Global state, API caching, optimistic updates |
| **Persistence** | [Redux Persist](https://github.com/rt2zz/redux-persist) | Auth and session persistence |
| **Real-Time Sockets** | [Socket.io Client 4.8](https://socket.io/) | Live chat in support tickets & instant notifications |
| **Charts** | [Recharts 3](https://recharts.org/) | Responsive analytics and revenue graphs |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod 4](https://zod.dev/) | Form controls and robust schema validation |
| **Date Utilities** | [date-fns](https://date-fns.org/) + [react-day-picker](https://react-day-picker.js.org/) | Calendar filters and formatted dates |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | Premium toast alerts |

---

## Folder Structure

```text
tipora-dashboard/
├── public/                     # Static assets (images, branding logos, icons)
│   └── images/
│       ├── logo.svg            # Tipora vector logo
│       └── logo2.png           # Tipora sidebar badge
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Authentication route group
│   │   │   └── login/          # Admin authentication page
│   │   ├── (default-layout)/   # Protected dashboard pages
│   │   │   ├── page.tsx        # Overview analytics dashboard
│   │   │   ├── users/          # User and wallet management
│   │   │   ├── tips/           # Tips & split transactions ledger
│   │   │   ├── withdraw/       # Stripe withdrawals & fee tracking
│   │   │   ├── platform-revenue/# Platform revenue reports
│   │   │   ├── support/        # Token-based support tickets & [id] chat
│   │   │   └── change-password/# Admin profile & security
│   │   ├── globals.css         # Global stylesheet & Tailwind CSS variables
│   │   └── layout.tsx          # Root HTML layout with providers
  ├── components/             # Modular React components
│   │   ├── auth/               # Login forms & credential helpers
│   │   ├── dashboard/          # Summary cards, comparison charts, Recharts
│   │   ├── notifications/      # Notification drawer & real-time badge
│   │   ├── platform-revenue/   # Revenue breakdown & filter tables
│   │   ├── shared/             # Section headers, pagination, date pickers
│   │   ├── support/            # Ticket detail card, live messages, reply modal
│   │   ├── tips/               # Tip summary cards, filter, table, details dialog
│   │   ├── ui/                 # Accessible Radix/shadcn UI primitives
│   │   ├── users/              # User summary, table, status toggle dialog
│   │   ├── withdraw/           # Payout table, Stripe status, fee dialog
│   │   ├── app-sidebar.tsx     # Collapsible navigation sidebar
│   │   └── nav-main.tsx        # Dynamic sidebar navigation links
│   ├── constant/               # Status mappings, theme styles, helpers
│   ├── hooks/                  # Custom React hooks (useDebounce, etc.)
│   ├── lib/
│   │   ├── socket.ts           # Socket.io connection manager
│   │   └── utils.ts            # Class merge & Tailwind utilities
│   ├── providers/              # ReduxProvider, SocketProvider wrappers
│   ├── proxy.ts                # Edge auth verification & route guards
│   ├── redux/                  # State management layer
│   │   ├── api/                # RTK Query API slices
│   │   │   ├── authApi.ts
│   │   │   ├── baseApi.ts
│   │   │   ├── dashboardApi.ts
│   │   │   ├── notificationApi.ts
│   │   │   ├── platformRevenueApi.ts
│   │   │   ├── supportApi.ts
│   │   │   ├── tipApi.ts
│   │   │   ├── userApi.ts
│   │   │   └── withdrawApi.ts
│   │   ├── features/           # Redux slices (authSlice, etc.)
│   │   ├── hooks.ts            # Typed Redux dispatch and selector hooks
│   │   └── store.ts            # Root Redux store configuration
│   ├── type/                   # Full TypeScript interfaces & enums
│   ├── utils/                  # Date and formatters
│   └── validation/             # Zod validation schemas
├── .env.example                # Environment variables template
├── components.json             # Shadcn component configuration
├── next.config.ts              # Next.js build configuration
├── package.json                # Project dependencies & npm scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

---

## Getting Started

### 1. Prerequisites
Ensure you have the following installed on your development environment:
- **Node.js**: `v18.18.0` or higher (`v20.x` or `v22.x` recommended)
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`

### 2. Clone the Repository
```bash
git clone https://github.com/shouravpaul01/tipora-dashboard.git
cd tipora-dashboard
```

### 3. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 4. Configure Environment Variables
Copy `.env.example` to create `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the required backend and socket URLs:
```env
NEXT_PUBLIC_BASE_URL="http://localhost:5000/api/v1"
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

### 5. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### 6. Build for Production
To create an optimized production build:
```bash
npm run build
npm run start
```

---

## Environment Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_BASE_URL` | Base REST API endpoint for the Tipora backend | `https://api.tipora.com/api/v1` |
| `NEXT_PUBLIC_API_URL` | Base Socket.io server endpoint for real-time events | `https://api.tipora.com` |

---

## API & Real-Time Socket Integration

### RTK Query Tag Caching
The application uses RTK Query with automatic cache invalidation:
- `Dashboard`: Overview KPIs, growth metrics, and revenue charts.
- `Tip`: Real-time tip feed and single-tip modal caching.
- `Withdraw`: Payout statuses and Stripe transfer audit caches.
- `PlatformRevenue`: Platform income updates when withdrawals complete.
- `Support`: Real-time ticket updates, new replies, status modifications.
- `User`: User profile data and block/unblock states.
- `Notifications` & `UnreadNotificationCount`: Live notification counter.

### Socket.io Events
Real-time features run through the centralized `SocketProvider`:
- **Support Chat**: Bidirectional real-time chat between admin support agents and users.
- **Instant Notifications**: Automated alert broadcasts on new ticket submissions or withdrawal status updates.

---

## Security & Authentication

- **Role Guard**: Access to dashboard pages requires `role === "ADMIN"` extracted from a valid JWT.
- **Next.js Proxy / Route Protection**: Unauthenticated requests are intercepted and redirected to `/login`.
- **Credential Storage**: Access tokens are stored securely in browser cookies (`accessToken`) and synchronized in Redux state with persistence.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is proprietary software developed for the **Tipora** platform. All rights reserved.

<div align="center">
  <sub>Built with ❤️ for the Tipora Operations & Admin Team</sub>
</div>