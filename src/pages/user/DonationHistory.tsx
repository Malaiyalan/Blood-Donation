import { useMemo, useState } from 'react';
import { Droplet } from 'lucide-react';
import Card from '../../components/common/Card';
import Select from '../../components/common/Select';
import { StatusBadge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { donations } from '../../data/mockData';
import { formatDate } from '../../utils/format';
import type { DonationStatus } from '../../types';

const statusOptions = [
  { label: 'All Statuses', value: 'All' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Scheduled', value: 'Scheduled' },
  { label: 'Cancelled', value: 'Cancelled' },
];

export default function DonationHistory() {
  const [status, setStatus] = useState<DonationStatus | 'All'>('All');
  const [hospital, setHospital] = useState('All');

  const hospitals = useMemo(() => ['All', ...new Set(donations.map((d) => d.hospital))], []);

  const filtered = donations.filter(
    (d) => (status === 'All' || d.status === status) && (hospital === 'All' || d.hospital === hospital)
  );

  return (
    <div className="border-t border-ink-50 bg-mist py-10">
      <div className="container-app">
        <span className="eyebrow"><Droplet className="h-3.5 w-3.5" /> My Donations</span>
        <h1 className="mt-2 text-3xl font-semibold">Donation History</h1>

        <div className="mt-6 flex flex-wrap gap-3">
          <Select
            options={statusOptions}
            value={status}
            onChange={(e) => setStatus(e.target.value as DonationStatus | 'All')}
            className="max-w-[180px]"
          />
          <Select
            options={hospitals.map((h) => ({ label: h === 'All' ? 'All Hospitals' : h, value: h }))}
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            className="max-w-[220px]"
          />
        </div>

        <div className="mt-6">
          {filtered.length === 0 ? (
            <EmptyState title="No donations found" description="Try adjusting your filters." />
          ) : (
            <>
              {/* Desktop table */}
              <Card padding="none" className="hidden overflow-hidden md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-mist text-xs uppercase tracking-wide text-ink-500">
                    <tr>
                      <th className="px-5 py-3 font-medium">Date</th>
                      <th className="px-5 py-3 font-medium">Blood Group</th>
                      <th className="px-5 py-3 font-medium">Hospital</th>
                      <th className="px-5 py-3 font-medium">Location</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-50">
                    {filtered.map((d) => (
                      <tr key={d.id} className="hover:bg-mist/50">
                        <td className="px-5 py-4 text-ink-700">{formatDate(d.date)}</td>
                        <td className="px-5 py-4 font-mono font-semibold text-crimson-600">{d.bloodGroup}</td>
                        <td className="px-5 py-4 text-ink-900">{d.hospital}</td>
                        <td className="px-5 py-4 text-ink-500">{d.city}</td>
                        <td className="px-5 py-4"><StatusBadge status={d.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>

              {/* Mobile cards */}
              <div className="space-y-3 md:hidden">
                {filtered.map((d) => (
                  <Card key={d.id} padding="md">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-lg font-bold text-crimson-600">{d.bloodGroup}</p>
                      <StatusBadge status={d.status} />
                    </div>
                    <p className="mt-2 text-sm font-medium text-ink-900">{d.hospital}</p>
                    <p className="text-xs text-ink-500">{d.city} · {formatDate(d.date)}</p>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
