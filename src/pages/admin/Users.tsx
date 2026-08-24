import { useMemo, useState } from 'react';
import { Eye, Pencil, Ban, ShieldCheck, Trash2, ArrowUpDown } from 'lucide-react';
import Card from '../../components/common/Card';
import SearchBar from '../../components/common/SearchBar';
import Select from '../../components/common/Select';
import Pagination from '../../components/common/Pagination';
import Avatar from '../../components/common/Avatar';
import Badge, { StatusBadge } from '../../components/common/Badge';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { adminUsers } from '../../data/mockData';

const PAGE_SIZE = 8;
type SortKey = 'name' | 'joined';

export default function AdminUsers() {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [confirmBlockId, setConfirmBlockId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let rows = adminUsers.filter(
      (u) =>
        (role === 'All' || u.role === role) &&
        (status === 'All' || u.status === status) &&
        (u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()))
    );
    rows = [...rows].sort((a, b) => {
      const cmp = sortKey === 'name' ? a.name.localeCompare(b.name) : a.joined.localeCompare(b.joined);
      return sortAsc ? cmp : -cmp;
    });
    return rows;
  }, [query, role, status, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Users</h1>
        <p className="mt-1 text-sm text-ink-500">{filtered.length} users found</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search by name or email…" className="min-w-[220px] flex-1" />
        <Select
          options={[{ label: 'All Roles', value: 'All' }, { label: 'Donor', value: 'Donor' }, { label: 'Admin', value: 'Admin' }]}
          value={role}
          onChange={(e) => { setRole(e.target.value); setPage(1); }}
          className="max-w-[160px]"
        />
        <Select
          options={[{ label: 'All Statuses', value: 'All' }, { label: 'Active', value: 'Active' }, { label: 'Blocked', value: 'Blocked' }]}
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="max-w-[160px]"
        />
      </div>

      <Card padding="none" className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-mist text-xs uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-5 py-3 font-medium">
                <button onClick={() => toggleSort('name')} className="flex items-center gap-1.5">
                  Name <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Blood Group</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Verified</th>
              <th className="px-5 py-3 font-medium">
                <button onClick={() => toggleSort('joined')} className="flex items-center gap-1.5">
                  Joined <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-50">
            {pageRows.map((u) => (
              <tr key={u.id} className="hover:bg-mist/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={u.name} size="sm" />
                    <span className="font-medium text-ink-900">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink-500">{u.email}</td>
                <td className="px-5 py-3 font-mono font-semibold text-crimson-600">{u.bloodGroup}</td>
                <td className="px-5 py-3"><Badge tone={u.role === 'Admin' ? 'ink' : 'gray'}>{u.role}</Badge></td>
                <td className="px-5 py-3"><StatusBadge status={u.status} /></td>
                <td className="px-5 py-3">
                  {u.verified ? <ShieldCheck className="h-4 w-4 text-teal-500" /> : <span className="text-xs text-ink-300">Unverified</span>}
                </td>
                <td className="px-5 py-3 text-ink-500">{u.joined}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <button className="rounded-lg p-1.5 text-ink-400 hover:bg-mist hover:text-ink-900" aria-label="View user"><Eye className="h-4 w-4" /></button>
                    <button className="rounded-lg p-1.5 text-ink-400 hover:bg-mist hover:text-ink-900" aria-label="Edit user"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => setConfirmBlockId(u.id)} className="rounded-lg p-1.5 text-ink-400 hover:bg-amber-400/10 hover:text-amber-600" aria-label="Block user"><Ban className="h-4 w-4" /></button>
                    <button className="rounded-lg p-1.5 text-ink-400 hover:bg-crimson-50 hover:text-crimson-600" aria-label="Delete user"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <ConfirmDialog
        open={!!confirmBlockId}
        onClose={() => setConfirmBlockId(null)}
        onConfirm={() => setConfirmBlockId(null)}
        title="Block this user?"
        description="They will lose access to donor and request features until unblocked."
        confirmLabel="Block User"
        destructive
      />
    </div>
  );
}
