import { Users, HeartHandshake, Droplet, AlertCircle, ClipboardCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import Card from '../../components/common/Card';
import { adminStats, bloodGroupStats, monthlyDonations, urgencyBreakdown } from '../../data/mockData';

const statCards = [
  { label: 'Total Users', value: adminStats.totalUsers, icon: Users, tone: 'bg-crimson-50 text-crimson-600' },
  { label: 'Total Donors', value: adminStats.totalDonors, icon: HeartHandshake, tone: 'bg-teal-50 text-teal-600' },
  { label: 'Active Requests', value: adminStats.activeRequests, icon: Droplet, tone: 'bg-amber-400/15 text-amber-600' },
  { label: 'Emergency Requests', value: adminStats.emergencyRequests, icon: AlertCircle, tone: 'bg-crimson-50 text-crimson-600' },
  { label: 'Completed Donations', value: adminStats.completedDonations, icon: ClipboardCheck, tone: 'bg-ink-100 text-ink-700' },
];

const pieColors = ['#C81E3A', '#0E7C7B', '#DD5F75', '#2FA6A3', '#E8A33D', '#8A1327', '#F5C1CA', '#CFEBE9'];
const urgencyColors: Record<string, string> = { Normal: '#0E7C7B', Urgent: '#E8A33D', Critical: '#C81E3A' };

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500">Platform overview and activity at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {statCards.map((s) => (
          <Card key={s.label} padding="md">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="mt-3 font-mono text-2xl font-semibold text-ink-900">{s.value.toLocaleString('en-IN')}</p>
            <p className="text-xs text-ink-500">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card padding="lg" className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-ink-900">Monthly Donations</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDonations}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E8ED" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9498A8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9498A8' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F3F0EA' }} contentStyle={{ borderRadius: 12, border: '1px solid #E7E8ED', fontSize: 13 }} />
                <Bar dataKey="donations" fill="#C81E3A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="text-sm font-semibold text-ink-900">Blood Requests by Urgency</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={urgencyBreakdown} dataKey="count" nameKey="urgency" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {urgencyBreakdown.map((entry) => (
                    <Cell key={entry.urgency} fill={urgencyColors[entry.urgency]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7E8ED', fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs text-ink-500">
            {urgencyBreakdown.map((u) => (
              <span key={u.urgency} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: urgencyColors[u.urgency] }} />
                {u.urgency} ({u.count})
              </span>
            ))}
          </div>
        </Card>
      </div>

      <Card padding="lg">
        <h2 className="text-sm font-semibold text-ink-900">Blood Group Distribution</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bloodGroupStats} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E8ED" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#9498A8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="group" tick={{ fontSize: 12, fill: '#575C6E', fontFamily: 'monospace' }} axisLine={false} tickLine={false} width={40} />
              <Tooltip cursor={{ fill: '#F3F0EA' }} contentStyle={{ borderRadius: 12, border: '1px solid #E7E8ED', fontSize: 13 }} />
              <Bar dataKey="availableDonors" radius={[0, 6, 6, 0]}>
                {bloodGroupStats.map((entry, i) => (
                  <Cell key={entry.group} fill={pieColors[i % pieColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
