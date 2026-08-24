import type {
  User,
  Donor,
  BloodRequest,
  Donation,
  AppNotification,
  BloodGroupStat,
  AdminStats,
  MonthlyDonation,
  UrgencyBreakdown,
  BloodGroup,
} from '../types';

export const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const currentUser: User = {
  id: 'u-001',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  dateOfBirth: '1996-03-14',
  gender: 'Male',
  bloodGroup: 'O+',
  role: 'donor',
  verified: true,
  status: 'Active',
  joinedAt: '2024-11-02',
  location: {
    address: '14 Anna Salai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600002',
  },
  donorInfo: {
    isDonor: true,
    available: true,
    donationCount: 12,
    lastDonation: '2026-06-15',
  },
  preferences: {
    availableForDonation: true,
    emergencyNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
  },
};

export const donors: Donor[] = [
  { id: 'd-001', userId: 'u-002', name: 'Ananya Rao', bloodGroup: 'O+', city: 'Chennai', distanceKm: 2.1, available: true, verified: true, donationCount: 8, lastDonation: '2026-05-02' },
  { id: 'd-002', userId: 'u-003', name: 'Vikram Nair', bloodGroup: 'O-', city: 'Chennai', distanceKm: 3.4, available: true, verified: true, donationCount: 15, lastDonation: '2026-07-01' },
  { id: 'd-003', userId: 'u-004', name: 'Priya Sundar', bloodGroup: 'A+', city: 'Chennai', distanceKm: 4.2, available: true, verified: false, donationCount: 3, lastDonation: '2026-01-18' },
  { id: 'd-004', userId: 'u-005', name: 'Arjun Mehta', bloodGroup: 'B+', city: 'Chennai', distanceKm: 5.6, available: false, verified: true, donationCount: 21, lastDonation: '2025-12-11' },
  { id: 'd-005', userId: 'u-006', name: 'Deepika Menon', bloodGroup: 'AB+', city: 'Chennai', distanceKm: 6.0, available: true, verified: true, donationCount: 5, lastDonation: '2026-04-22' },
  { id: 'd-006', userId: 'u-007', name: 'Karthik Iyer', bloodGroup: 'A-', city: 'Chennai', distanceKm: 1.5, available: true, verified: true, donationCount: 9, lastDonation: '2026-06-30' },
  { id: 'd-007', userId: 'u-008', name: 'Meera Pillai', bloodGroup: 'B-', city: 'Chennai', distanceKm: 7.8, available: true, verified: false, donationCount: 2, lastDonation: null },
  { id: 'd-008', userId: 'u-009', name: 'Rohan Kapoor', bloodGroup: 'O+', city: 'Chennai', distanceKm: 3.9, available: true, verified: true, donationCount: 12, lastDonation: '2026-03-09' },
  { id: 'd-009', userId: 'u-010', name: 'Sneha Reddy', bloodGroup: 'AB-', city: 'Chennai', distanceKm: 9.2, available: false, verified: true, donationCount: 6, lastDonation: '2025-11-05' },
  { id: 'd-010', userId: 'u-011', name: 'Farhan Ali', bloodGroup: 'O-', city: 'Chennai', distanceKm: 2.8, available: true, verified: true, donationCount: 18, lastDonation: '2026-07-14' },
];

export const bloodRequests: BloodRequest[] = [
  {
    id: 'r-001', patientName: 'Ramesh Kumar', bloodGroup: 'O-', units: 2, urgency: 'Critical',
    hospitalName: 'Apollo Hospital', hospitalAddress: 'Greams Road', city: 'Chennai', distanceKm: 3.5,
    requiredDate: '2026-08-21', requiredTime: '18:00', contactNumber: '+91 90000 11111',
    additionalInfo: 'Emergency surgery scheduled tonight.', status: 'Open', createdAt: '2026-08-21T08:10:00',
    requesterName: 'Sunita Kumar', responders: 4,
  },
  {
    id: 'r-002', patientName: 'Lakshmi Iyer', bloodGroup: 'B+', units: 1, urgency: 'Urgent',
    hospitalName: 'Fortis Malar Hospital', hospitalAddress: 'Adyar', city: 'Chennai', distanceKm: 6.1,
    requiredDate: '2026-08-22', requiredTime: '10:00', contactNumber: '+91 90000 22222',
    status: 'Open', createdAt: '2026-08-21T06:45:00', requesterName: 'Anand Iyer', responders: 2,
  },
  {
    id: 'r-003', patientName: 'Suresh Babu', bloodGroup: 'A+', units: 3, urgency: 'Normal',
    hospitalName: 'MIOT International', hospitalAddress: 'Manapakkam', city: 'Chennai', distanceKm: 8.4,
    requiredDate: '2026-08-25', requiredTime: '09:00', contactNumber: '+91 90000 33333',
    status: 'Open', createdAt: '2026-08-20T14:20:00', requesterName: 'Divya Babu', responders: 1,
  },
  {
    id: 'r-004', patientName: 'Kavya Nair', bloodGroup: 'AB-', units: 2, urgency: 'Critical',
    hospitalName: 'Sri Ramachandra Hospital', hospitalAddress: 'Porur', city: 'Chennai', distanceKm: 10.2,
    requiredDate: '2026-08-21', requiredTime: '20:00', contactNumber: '+91 90000 44444',
    additionalInfo: 'Post-delivery complication, needs transfusion urgently.', status: 'Open', createdAt: '2026-08-21T09:00:00',
    requesterName: 'Ravi Nair', responders: 6,
  },
  {
    id: 'r-005', patientName: 'Manoj Pillai', bloodGroup: 'O+', units: 1, urgency: 'Urgent',
    hospitalName: 'Apollo Hospital', hospitalAddress: 'Greams Road', city: 'Chennai', distanceKm: 3.5,
    requiredDate: '2026-08-23', requiredTime: '12:00', contactNumber: '+91 90000 55555',
    status: 'Matched', createdAt: '2026-08-19T11:30:00', requesterName: 'Geeta Pillai', responders: 3,
  },
];

export const donations: Donation[] = [
  { id: 'don-001', userId: 'u-001', date: '2026-06-15', bloodGroup: 'O+', hospital: 'Apollo Hospital', city: 'Chennai', status: 'Completed', livesHelped: 3 },
  { id: 'don-002', userId: 'u-001', date: '2026-03-02', bloodGroup: 'O+', hospital: 'Fortis Malar Hospital', city: 'Chennai', status: 'Completed', livesHelped: 3 },
  { id: 'don-003', userId: 'u-001', date: '2025-12-10', bloodGroup: 'O+', hospital: 'MIOT International', city: 'Chennai', status: 'Completed', livesHelped: 3 },
  { id: 'don-004', userId: 'u-001', date: '2025-09-18', bloodGroup: 'O+', hospital: 'Sri Ramachandra Hospital', city: 'Chennai', status: 'Completed', livesHelped: 3 },
  { id: 'don-005', userId: 'u-001', date: '2026-09-10', bloodGroup: 'O+', hospital: 'Apollo Hospital', city: 'Chennai', status: 'Scheduled', livesHelped: 0 },
  { id: 'don-006', userId: 'u-001', date: '2025-06-05', bloodGroup: 'O+', hospital: 'Kauvery Hospital', city: 'Chennai', status: 'Completed', livesHelped: 3 },
];

export const notifications: AppNotification[] = [
  { id: 'n-001', category: 'Emergency', icon: 'urgent', title: 'Urgent Blood Request', message: 'Someone nearby needs O- blood.', timeAgo: '10 minutes ago', read: false },
  { id: 'n-002', category: 'Requests', icon: 'accepted', title: 'Donation Accepted', message: 'John accepted your blood request.', timeAgo: '25 minutes ago', read: false },
  { id: 'n-003', category: 'Donations', icon: 'completed', title: 'Donation Completed', message: 'Your donation has been recorded successfully.', timeAgo: '2 days ago', read: true },
  { id: 'n-004', category: 'System', icon: 'system', title: 'Profile Verified', message: 'Your donor profile has been verified by our team.', timeAgo: '3 days ago', read: true },
  { id: 'n-005', category: 'Emergency', icon: 'urgent', title: 'Critical Blood Request', message: 'AB- blood urgently needed at MIOT International.', timeAgo: '5 days ago', read: true },
  { id: 'n-006', category: 'Requests', icon: 'info', title: 'New Response', message: 'Ananya Rao responded to your blood request.', timeAgo: '1 week ago', read: true },
];

export const bloodGroupStats: BloodGroupStat[] = [
  { group: 'A+', availableDonors: 312, activeRequests: 18 },
  { group: 'A-', availableDonors: 96, activeRequests: 6 },
  { group: 'B+', availableDonors: 284, activeRequests: 14 },
  { group: 'B-', availableDonors: 74, activeRequests: 4 },
  { group: 'AB+', availableDonors: 121, activeRequests: 7 },
  { group: 'AB-', availableDonors: 38, activeRequests: 3 },
  { group: 'O+', availableDonors: 248, activeRequests: 12 },
  { group: 'O-', availableDonors: 89, activeRequests: 9 },
];

export const homeStats = [
  { label: 'Registered Donors', value: 10000, suffix: '+' },
  { label: 'Successful Donations', value: 5000, suffix: '+' },
  { label: 'Lives Helped', value: 2000, suffix: '+' },
  { label: 'Active Requests', value: 500, suffix: '+' },
];

export const adminStats: AdminStats = {
  totalUsers: 10245,
  totalDonors: 7842,
  activeRequests: 342,
  emergencyRequests: 28,
  completedDonations: 5921,
};

export const monthlyDonations: MonthlyDonation[] = [
  { month: 'Jan', donations: 320 },
  { month: 'Feb', donations: 410 },
  { month: 'Mar', donations: 380 },
  { month: 'Apr', donations: 460 },
  { month: 'May', donations: 512 },
  { month: 'Jun', donations: 588 },
];

export const urgencyBreakdown: UrgencyBreakdown[] = [
  { urgency: 'Normal', count: 210 },
  { urgency: 'Urgent', count: 96 },
  { urgency: 'Critical', count: 36 },
];

export interface AdminUserRow {
  id: string; name: string; email: string; bloodGroup: BloodGroup; role: 'Donor' | 'Admin';
  status: 'Active' | 'Blocked'; verified: boolean; joined: string;
}

export const adminUsers: AdminUserRow[] = Array.from({ length: 24 }).map((_, i) => {
  const names = ['Ananya Rao', 'Vikram Nair', 'Priya Sundar', 'Arjun Mehta', 'Deepika Menon', 'Karthik Iyer', 'Meera Pillai', 'Rohan Kapoor', 'Sneha Reddy', 'Farhan Ali', 'Divya Babu', 'Ravi Nair'];
  const name = names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : '');
  return {
    id: `au-${String(i + 1).padStart(3, '0')}`,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@mail.com`,
    bloodGroup: bloodGroups[i % bloodGroups.length],
    role: i % 9 === 0 ? 'Admin' : 'Donor',
    status: i % 7 === 0 ? 'Blocked' : 'Active',
    verified: i % 3 !== 0,
    joined: `202${5 + (i % 2)}-0${(i % 9) + 1}-1${i % 9}`,
  };
});
