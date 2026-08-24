import { useMemo, useState } from 'react';
import { Droplet } from 'lucide-react';
import FilterPanel from '../../components/common/FilterPanel';
import Select from '../../components/common/Select';
import BloodRequestCard from '../../components/blood-request/BloodRequestCard';
import { EmptyState } from '../../components/common/EmptyState';
import { bloodRequests, bloodGroups } from '../../data/mockData';
import type { Urgency, BloodGroup } from '../../types';

export default function BloodRequests() {
  const [urgency, setUrgency] = useState<Urgency | 'All'>('All');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | 'All'>('All');

  const filtered = useMemo(
    () =>
      bloodRequests.filter(
        (r) => (urgency === 'All' || r.urgency === urgency) && (bloodGroup === 'All' || r.bloodGroup === bloodGroup)
      ),
    [urgency, bloodGroup]
  );

  return (
    <div className="border-t border-ink-50 bg-mist py-10">
      <div className="container-app">
        <span className="eyebrow"><Droplet className="h-3.5 w-3.5" /> Blood Requests</span>
        <h1 className="mt-2 text-3xl font-semibold">Open blood requests</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <FilterPanel onReset={() => { setUrgency('All'); setBloodGroup('All'); }}>
            <Select
              label="Urgency"
              options={[{ label: 'All', value: 'All' }, { label: 'Normal', value: 'Normal' }, { label: 'Urgent', value: 'Urgent' }, { label: 'Critical', value: 'Critical' }]}
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as Urgency | 'All')}
            />
            <Select
              label="Blood Group"
              options={[{ label: 'All', value: 'All' }, ...bloodGroups.map((g) => ({ label: g, value: g }))]}
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value as BloodGroup | 'All')}
            />
          </FilterPanel>

          {filtered.length === 0 ? (
            <EmptyState title="No matching requests" description="Try a different filter combination." />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((r) => (
                <BloodRequestCard key={r.id} request={r} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
