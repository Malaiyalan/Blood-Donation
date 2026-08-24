# LifeDrop — Blood Donation Management UI

**Donate Blood. Save Lives.**

A complete, responsive frontend for a blood donation platform, built with React, TypeScript, Vite, and Tailwind CSS. This is a **UI-only** project — it runs entirely on mock data and is structured so a Node.js/Express/MongoDB backend can be dropped in later without touching component code.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS (custom design system — see `tailwind.config.js`)
- React Router (data router)
- Zustand for state (auth, notifications)
- React Hook Form + Zod for form validation
- Axios (pre-wired client, currently unused by mock services)
- Lucide React icons
- Recharts for admin analytics

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. No backend is required — everything works from `src/data/mockData.ts`.

To build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/
├── components/
│   ├── common/        Button, Input, Select, Modal, Card, Badge, Avatar,
│   │                   Loader, Skeleton, EmptyState/ErrorState, Toast,
│   │                   ConfirmDialog, SearchBar, FilterPanel, Pagination, StatsCard
│   ├── layout/         Navbar, Footer, MobileMenu, Logo, EmergencyButton, PublicLayout
│   ├── donor/           DonorCard
│   ├── blood-request/   BloodRequestCard, BloodGroupCard
│   ├── notification/    NotificationBell, NotificationCard
│   └── admin/           AdminLayout, AdminSidebar
├── pages/
│   ├── public/   Home, FindBlood, HowItWorks, Login, Register, NotFound
│   ├── user/     Dashboard, Profile, DonorProfile, BloodRequests,
│   │              CreateBloodRequest, DonationHistory, Notifications, Donate
│   └── admin/    Dashboard, Users, Donors, BloodRequests, Donations,
│                  Reports, Notifications, AuditLogs, Settings
├── hooks/
├── services/     api.ts, auth.service.ts, donor.service.ts,
│                  bloodRequest.service.ts, notification.service.ts
├── store/        authStore.ts, notificationStore.ts (Zustand)
├── types/        Shared TypeScript interfaces
├── utils/        cn.ts, format.ts
├── data/
│   └── mockData.ts   All mock users, donors, requests, donations, notifications
├── routes/
│   └── AppRoutes.tsx  Route table (React Router data router)
├── App.tsx
└── main.tsx
```

## Available Routes

### Public
| Path | Page |
|---|---|
| `/` | Home |
| `/find-blood` | Find Blood (search + filters) |
| `/how-it-works` | How It Works |
| `/login` | Login |
| `/register` | Register (4-step donor sign-up) |
| `/request-blood` | Create a blood request |
| `/donor/:id` | Donor profile |

### Authenticated (donor)
| Path | Page |
|---|---|
| `/dashboard` | User dashboard |
| `/donate` | Donor availability & scheduling |
| `/profile` | Profile management |
| `/blood-requests` | Browse open requests |
| `/my-donations` | Donation history |
| `/notifications` | Notification center |

### Admin (`/admin`)
| Path | Page |
|---|---|
| `/admin` | Admin dashboard (charts) |
| `/admin/users` | Users table |
| `/admin/donors` | Donors table |
| `/admin/blood-requests` | Requests table |
| `/admin/donations` | Donations table |
| `/admin/notifications` | Notification log |
| `/admin/reports` | Reports & analytics |
| `/admin/audit-logs` | Audit log |
| `/admin/settings` | Platform settings |

## Mock Credentials

There's no real authentication yet — any email/password on the **Login** page signs you in as the mock donor **John Doe**. To view the admin console, use the **"Continue to admin demo console"** link on the Login page instead of submitting the form.

- **Donor demo:** any email + any password → redirects to `/dashboard`
- **Admin demo:** click "Continue to admin demo console" → redirects to `/admin`

## How to Connect a Node.js Backend Later

1. Create your backend (Express/MongoDB or otherwise) exposing a REST API.
2. Copy `.env.example` to `.env` and set `VITE_API_URL` to your API's base URL.
3. Open `src/services/api.ts` — the Axios instance already reads `VITE_API_URL` and attaches a bearer token from `localStorage` if present.
4. In each file under `src/services/` (`auth.service.ts`, `donor.service.ts`, `bloodRequest.service.ts`, `notification.service.ts`), replace the mock-data logic with real Axios calls, e.g.:

   ```ts
   // Before (mock)
   async login(payload: LoginPayload) {
     return mockDelay({ user: currentUser, token: 'mock-jwt-token' });
   }

   // After (real API)
   async login(payload: LoginPayload) {
     const { data } = await api.post('/auth/login', payload);
     return data;
   }
   ```

5. No component or page needs to change — they all call the service layer, not mock data directly.

## How to Replace Mock Data With API Data

- `src/data/mockData.ts` is the single source of mock data. Once services call real endpoints, this file is only used as fallback/dev seed data and can eventually be deleted.
- Pages currently import mock data directly in a few read-heavy views (e.g. `Home.tsx`, `Dashboard.tsx`) for simplicity. To fully switch to live data, replace those direct imports with calls to the corresponding service (e.g. `donorService.search()`, `bloodRequestService.list()`) inside a `useEffect`, following the pattern already used in `DonorProfile.tsx` and `Notifications.tsx`.
- The Zustand stores (`authStore`, `notificationStore`) already fetch through the service layer, so once the services are wired to a real API, those stores work unchanged.

## Notes

- This is a **frontend-only** deliverable — no Node.js, Express, MongoDB, or JWT implementation is included, per the brief.
- Forms use React Hook Form + Zod for validation with inline error messages.
- Toast notifications, loading/empty/error states, and confirmation dialogs are implemented as reusable components.
- The design system (colors, type, motion) lives in `tailwind.config.js` and `src/index.css`.
