import { useMemo, useState } from 'react';
import Card from '../../components/common/Card';
import SearchBar from '../../components/common/SearchBar';
import Select from '../../components/common/Select';
import Pagination from '../../components/common/Pagination';
import { StatusBadge } from '../../components/common/Badge';
import { donations } from '../../data/mockData';
import { formatShortDate } from '../../utils/format';

const PAGE_SIZE = 8;

export default function AdminDonations() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return donations.filter(
      (d) =>
        (status === 'All' || d.status === status) &&
        (d.hospital.toLowerCase().includes(query.toLowerCase()) || d.city.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalLives = donations.filter((d) => d.status === 'Completed').reduce((sum, d) => sum + d.livesHelped, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Donations</h1>
        <p className="mt-1 text-sm text-ink-500">
          {filtered.length} donations found · {totalLives} lives helped in total
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchBar
          value={query}
          onChange={(v) => { setQuery(v); setPage(1); }}
          placeholder="Search by hospital or city…"
          className="min-w-[220px] flex-1"
        />
        <Select
          options={[{ label: 'All Statuses', value: 'All' }, { label: 'Completed', value: 'Completed' }, { label: 'Scheduled', value: 'Scheduled' }, { label: 'Cancelled', value: 'Cancelled' }]}
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="max-w-[180px]"
        />
      </div>

      <Card padding="none" className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-mist text-xs uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Blood Group</th>
              <th className="px-5 py-3 font-medium">Hospital</th>
              <th className="px-5 py-3 font-medium">City</th>
              <th className="px-5 py-3 font-medium">Lives Helped</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-50">
            {pageRows.map((d) => (
              <tr key={d.id} className="hover:bg-mist/50">
                <td className="px-5 py-3 text-ink-700">{formatShortDate(d.date)}</td>
                <td className="px-5 py-3 font-mono font-semibold text-crimson-600">{d.bloodGroup}</td>
                <td className="px-5 py-3 text-ink-900">{d.hospital}</td>
                <td className="px-5 py-3 text-ink-500">{d.city}</td>
                <td className="px-5 py-3 text-ink-700">{d.livesHelped || '—'}</td>
                <td className="px-5 py-3"><StatusBadge status={d.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
