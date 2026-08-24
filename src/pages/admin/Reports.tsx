import { Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { monthlyDonations, bloodGroupStats, adminStats } from '../../data/mockData';

const pieColors = ['#C81E3A', '#0E7C7B', '#DD5F75', '#2FA6A3', '#E8A33D', '#8A1327', '#F5C1CA', '#CFEBE9'];

const summary = [
  { label: 'Donor Growth (MoM)', value: '+6.4%' },
  { label: 'Request Fulfilment Rate', value: '87%' },
  { label: 'Avg. Response Time', value: '18 min' },
  { label: 'Repeat Donor Rate', value: '61%' },
];

export default function AdminReports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Reports</h1>
          <p className="mt-1 text-sm text-ink-500">Platform performance for {adminStats.totalDonors.toLocaleString('en-IN')} registered donors.</p>
        </div>
        <Button variant="outline" icon={<Download className="h-4 w-4" />}>
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map((s) => (
          <Card key={s.label} padding="md">
            <p className="font-mono text-2xl font-semibold text-ink-900">{s.value}</p>
            <p className="mt-1 text-xs text-ink-500">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card padding="lg" className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-ink-900">Donation Trend</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyDonations}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E8ED" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9498A8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9498A8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7E8ED', fontSize: 13 }} />
                <Line type="monotone" dataKey="donations" stroke="#C81E3A" strokeWidth={2.5} dot={{ r: 4, fill: '#C81E3A' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="text-sm font-semibold text-ink-900">Donor Share by Blood Group</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={bloodGroupStats} dataKey="availableDonors" nameKey="group" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {bloodGroupStats.map((entry, i) => (
                    <Cell key={entry.group} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7E8ED', fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
