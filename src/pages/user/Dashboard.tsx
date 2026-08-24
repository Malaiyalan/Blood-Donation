import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, HeartPulse, ClipboardList, Activity, Plus, Search, Bell } from 'lucide-react';
import Card from '../../components/common/Card';
import BloodRequestCard from '../../components/blood-request/BloodRequestCard';
import { EmptyState } from '../../components/common/EmptyState';
import { currentUser, bloodRequests, donations } from '../../data/mockData';
import { formatShortDate } from '../../utils/format';
import { StatusBadge } from '../../components/common/Badge';

const quickActions = [
  { label: 'Donate Blood', to: '/register', icon: Droplet },
  { label: 'Request Blood', to: '/request-blood', icon: Plus },
  { label: 'Find Donor', to: '/find-blood', icon: Search },
  { label: 'View Notifications', to: '/notifications', icon: Bell },
];

export default function Dashboard() {
  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening');
  }, []);

  const activeRequests = bloodRequests.filter((r) => r.status === 'Open').slice(0, 2);
  const recentDonations = donations.filter((d) => d.status === 'Completed').slice(0, 3);
  const emergencyRequests = bloodRequests.filter((r) => r.urgency === 'Critical').slice(0, 2);

  return (
    <div className="border-t border-ink-50 bg-mist">
      <div className="container-app py-10">
        <div className="animate-slideUp">
          <h1 className="text-3xl font-semibold text-ink-900">{greeting}, {currentUser.name.split(' ')[0]} 👋</h1>
          <p className="mt-1 text-ink-500">Here's your donation activity.</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card padding="md" className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-crimson-50 text-crimson-600"><Droplet className="h-5 w-5" /></div>
            <div><p className="font-mono text-2xl font-semibold text-ink-900">{currentUser.donorInfo.donationCount}</p><p className="text-xs text-ink-500">Donations</p></div>
          </Card>
          <Card padding="md" className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600"><HeartPulse className="h-5 w-5" /></div>
            <div><p className="font-mono text-2xl font-semibold text-ink-900">36</p><p className="text-xs text-ink-500">Lives Helped</p></div>
          </Card>
          <Card padding="md" className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/15 text-amber-600"><ClipboardList className="h-5 w-5" /></div>
            <div><p className="font-mono text-2xl font-semibold text-ink-900">2</p><p className="text-xs text-ink-500">Active Requests</p></div>
          </Card>
          <Card padding="md" className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-100 text-ink-700"><Activity className="h-5 w-5" /></div>
            <div><p className="text-base font-semibold text-emerald-600">Available</p><p className="text-xs text-ink-500">Donation Status</p></div>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-ink-900">Active Blood Requests</h2>
                <Link to="/request-blood" className="text-sm font-medium text-teal-600 hover:underline">New request</Link>
              </div>
              {activeRequests.length === 0 ? (
                <EmptyState title="No active requests" description="Requests you create will appear here." />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {activeRequests.map((r) => <BloodRequestCard key={r.id} request={r} />)}
                </div>
              )}
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-ink-900">Recent Donations</h2>
                <Link to="/my-donations" className="text-sm font-medium text-teal-600 hover:underline">View all</Link>
              </div>
              <Card padding="none" className="divide-y divide-ink-50">
                {recentDonations.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium text-ink-900">{d.hospital}</p>
                      <p className="text-xs text-ink-500">{formatShortDate(d.date)} · {d.city}</p>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                ))}
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-ink-900">Nearby Emergency Requests</h2>
              <div className="space-y-4">
                {emergencyRequests.map((r) => <BloodRequestCard key={r.id} request={r} />)}
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-ink-900">Quick Actions</h2>
              <Card padding="sm" className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.to}
                    className="flex flex-col items-center gap-2 rounded-xl px-3 py-4 text-center text-xs font-medium text-ink-700 hover:bg-mist"
                  >
                    <action.icon className="h-5 w-5 text-crimson-500" />
                    {action.label}
                  </Link>
                ))}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
