import { createBrowserRouter } from 'react-router-dom';

import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/admin/AdminLayout';

import Home from '../pages/public/Home';
import FindBlood from '../pages/public/FindBlood';
import HowItWorks from '../pages/public/HowItWorks';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

import Dashboard from '../pages/user/Dashboard';
import Profile from '../pages/user/Profile';
import DonorProfile from '../pages/user/DonorProfile';
import BloodRequests from '../pages/user/BloodRequests';
import CreateBloodRequest from '../pages/user/CreateBloodRequest';
import DonationHistory from '../pages/user/DonationHistory';
import Notifications from '../pages/user/Notifications';
import Donate from '../pages/user/Donate';

import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminDonors from '../pages/admin/Donors';
import AdminBloodRequests from '../pages/admin/BloodRequests';
import AdminDonations from '../pages/admin/Donations';
import AdminReports from '../pages/admin/Reports';
import AdminNotifications from '../pages/admin/Notifications';
import AdminAuditLogs from '../pages/admin/AuditLogs';
import AdminSettings from '../pages/admin/Settings';

import NotFound from '../pages/public/NotFound';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/find-blood', element: <FindBlood /> },
      { path: '/how-it-works', element: <HowItWorks /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/request-blood', element: <CreateBloodRequest /> },
      { path: '/donor/:id', element: <DonorProfile /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/donate', element: <Donate /> },
      { path: '/profile', element: <Profile /> },
      { path: '/blood-requests', element: <BloodRequests /> },
      { path: '/my-donations', element: <DonationHistory /> },
      { path: '/notifications', element: <Notifications /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'donors', element: <AdminDonors /> },
      { path: 'blood-requests', element: <AdminBloodRequests /> },
      { path: 'donations', element: <AdminDonations /> },
      { path: 'notifications', element: <AdminNotifications /> },
      { path: 'reports', element: <AdminReports /> },
      { path: 'audit-logs', element: <AdminAuditLogs /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
]);
