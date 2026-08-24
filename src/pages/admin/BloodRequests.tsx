import { useMemo, useState } from 'react';
import { Eye, Check, X, Ban } from 'lucide-react';
import Card from '../../components/common/Card';
import SearchBar from '../../components/common/SearchBar';
import Select from '../../components/common/Select';
import Pagination from '../../components/common/Pagination';
import { UrgencyBadge, StatusBadge } from '../../components/common/Badge';
import { bloodRequests, bloodGroups } from '../../data/mockData';
import { formatShortDate } from '../../utils/format';

const PAGE_SIZE = 8;

export default function AdminBloodRequests() {
  const [query, setQuery] = useState('');
  const [urgency, setUrgency] = useState('All');
  const [bloodGroup, setBloodGroup] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return bloodRequests.filter(
      (r) =>
        (urgency === 'All' || r.urgency === urgency) &&
        (bloodGroup === 'All' || r.bloodGroup === bloodGroup) &&
        (r.requesterName.toLowerCase().includes(query.toLowerCase()) ||
          r.hospitalName.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, urgency, bloodGroup]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Blood Requests</h1>
        <p className="mt-1 text-sm text-ink-500">{filtered.length} requests found</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchBar
          value={query}
          onChange={(v) => { setQuery(v); setPage(1); }}
          placeholder="Search by requester or hospital…"
          className="min-w-[220px] flex-1"
        />
        <Select
          options={[{ label: 'All Urgency', value: 'All' }, { label: 'Normal', value: 'Normal' }, { label: 'Urgent', value: 'Urgent' }, { label: 'Critical', value: 'Critical' }]}
          value={urgency}
          onChange={(e) => { setUrgency(e.target.value); setPage(1); }}
          className="max-w-[160px]"
        />
        <Select
          options={[{ label: 'All Blood Groups', value: 'All' }, ...bloodGroups.map((g) => ({ label: g, value: g }))]}
          value={bloodGroup}
          onChange={(e) => { setBloodGroup(e.target.value); setPage(1); }}
          className="max-w-[170px]"
        />
      </div>

      <Card padding="none" className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-mist text-xs uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-5 py-3 font-medium">Requester</th>
              <th className="px-5 py-3 font-medium">Blood Group</th>
              <th className="px-5 py-3 font-medium">Units</th>
              <th className="px-5 py-3 font-medium">Hospital</th>
              <th className="px-5 py-3 font-medium">Urgency</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Created</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-50">
            {pageRows.map((r) => (
              <tr key={r.id} className="hover:bg-mist/50">
                <td className="px-5 py-3 font-medium text-ink-900">{r.requesterName}</td>
                <td className="px-5 py-3 font-mono font-semibold text-crimson-600">{r.bloodGroup}</td>
                <td className="px-5 py-3 text-ink-700">{r.units}</td>
                <td className="px-5 py-3 text-ink-500">{r.hospitalName}</td>
                <td className="px-5 py-3"><UrgencyBadge urgency={r.urgency} /></td>
                <td className="px-5 py-3"><StatusBadge status={r.status} /></td>
                <td className="px-5 py-3 text-ink-500">{formatShortDate(r.createdAt)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <button className="rounded-lg p-1.5 text-ink-400 hover:bg-mist hover:text-ink-900" aria-label="View request">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-ink-400 hover:bg-emerald-50 hover:text-emerald-600" aria-label="Approve request">
                      <Check className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-ink-400 hover:bg-crimson-50 hover:text-crimson-600" aria-label="Reject request">
                      <X className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-ink-400 hover:bg-amber-400/10 hover:text-amber-600" aria-label="Cancel request">
                      <Ban className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
