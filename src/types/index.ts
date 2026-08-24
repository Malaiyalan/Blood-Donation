export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type Urgency = 'Normal' | 'Urgent' | 'Critical';

export type RequestStatus = 'Open' | 'Matched' | 'Fulfilled' | 'Cancelled' | 'Expired';

export type DonationStatus = 'Completed' | 'Scheduled' | 'Cancelled';

export type UserRole = 'donor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: BloodGroup;
  avatarUrl?: string;
  role: UserRole;
  verified: boolean;
  status: 'Active' | 'Blocked';
  joinedAt: string;
  location: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  donorInfo: {
    isDonor: boolean;
    available: boolean;
    donationCount: number;
    lastDonation: string | null;
  };
  preferences: {
    availableForDonation: boolean;
    emergencyNotifications: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
}

export interface Donor {
  id: string;
  userId: string;
  name: string;
  bloodGroup: BloodGroup;
  city: string;
  distanceKm: number;
  available: boolean;
  verified: boolean;
  donationCount: number;
  lastDonation: string | null;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  units: number;
  urgency: Urgency;
  hospitalName: string;
  hospitalAddress: string;
  city: string;
  distanceKm: number;
  requiredDate: string;
  requiredTime: string;
  contactNumber: string;
  additionalInfo?: string;
  status: RequestStatus;
  createdAt: string;
  requesterName: string;
  responders: number;
}

export interface Donation {
  id: string;
  userId: string;
  date: string;
  bloodGroup: BloodGroup;
  hospital: string;
  city: string;
  status: DonationStatus;
  livesHelped: number;
}

export type NotificationCategory = 'Requests' | 'Donations' | 'System' | 'Emergency';

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  icon: 'urgent' | 'accepted' | 'completed' | 'system' | 'info';
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
}

export interface BloodGroupStat {
  group: BloodGroup;
  availableDonors: number;
  activeRequests: number;
}

export interface AdminStats {
  totalUsers: number;
  totalDonors: number;
  activeRequests: number;
  emergencyRequests: number;
  completedDonations: number;
}

export interface MonthlyDonation {
  month: string;
  donations: number;
}

export interface UrgencyBreakdown {
  urgency: Urgency;
  count: number;
}
