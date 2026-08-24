import { useMemo, useState } from 'react';
import { Eye, ShieldCheck, Ban, MapPin } from 'lucide-react';
import Card from '../../components/common/Card';
import SearchBar from '../../components/common/SearchBar';
import Select from '../../components/common/Select';
import Pagination from '../../components/common/Pagination';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import { donors, bloodGroups } from '../../data/mockData';

const PAGE_SIZE = 8;

export default function AdminDonors() {
  const [query, setQuery] = useState('');
  const [bloodGroup, setBloodGroup] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return donors.filter(
      (d) =>
        (bloodGroup === 'All' || d.bloodGroup === bloodGroup) &&
        (availability === 'All' || (availability === 'Available' ? d.available : !d.available)) &&
        (d.name.toLowerCase().includes(query.toLowerCase()) || d.city.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, bloodGroup, availability]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Donors</h1>
        <p className="mt-1 text-sm text-ink-500">{filtered.length} donors found</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchBar
          value={query}
          onChange={(v) => { setQuery(v); setPage(1); }}
          placeholder="Search by name or city…"
          className="min-w-[220px] flex-1"
        />
        <Select
          options={[{ label: 'All Blood Groups', value: 'All' }, ...bloodGroups.map((g) => ({ label: g, value: g }))]}
          value={bloodGroup}
          onChange={(e) => { setBloodGroup(e.target.value); setPage(1); }}
          className="max-w-[170px]"
        />
        <Select
          options={[{ label: 'All Availability', value: 'All' }, { label: 'Available', value: 'Available' }, { label: 'Unavailable', value: 'Unavailable' }]}
          value={availability}
          onChange={(e) => { setAvailability(e.target.value); setPage(1); }}
          className="max-w-[180px]"
        />
      </div>

      <Card padding="none" className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-mist text-xs uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-5 py-3 font-medium">Donor</th>
              <th className="px-5 py-3 font-medium">Blood Group</th>
              <th className="px-5 py-3 font-medium">Location</th>
              <th className="px-5 py-3 font-medium">Donations</th>
              <th className="px-5 py-3 font-medium">Last Donation</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-50">
            {pageRows.map((d) => (
              <tr key={d.id} className="hover:bg-mist/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={d.name} size="sm" />
                    <div>
                      <p className="font-medium text-ink-900">{d.name}</p>
                      {d.verified && (
                        <span className="flex items-center gap-1 text-xs text-teal-600">
                          <ShieldCheck className="h-3 w-3" /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 font-mono font-semibold text-crimson-600">{d.bloodGroup}</td>
                <td className="px-5 py-3 text-ink-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-ink-300" /> {d.city} · {d.distanceKm} km
                  </span>
                </td>
                <td className="px-5 py-3 text-ink-700">{d.donationCount}</td>
                <td className="px-5 py-3 text-ink-500">{d.lastDonation || 'No record'}</td>
                <td className="px-5 py-3">
                  <Badge tone={d.available ? 'green' : 'gray'} dot>
                    {d.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <button className="rounded-lg p-1.5 text-ink-400 hover:bg-mist hover:text-ink-900" aria-label="View donor">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-ink-400 hover:bg-amber-400/10 hover:text-amber-600" aria-label="Suspend donor">
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
