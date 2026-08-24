import { useEffect, useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import SearchBar from '../../components/common/SearchBar';
import FilterPanel from '../../components/common/FilterPanel';
import Select from '../../components/common/Select';
import DonorCard from '../../components/donor/DonorCard';
import { SkeletonCard } from '../../components/common/Skeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { donorService } from '../../services/donor.service';
import { bloodGroups } from '../../data/mockData';
import type { Donor, BloodGroup } from '../../types';

const distances = ['5', '10', '20', '50'];

export default function FindBlood() {
  const [query, setQuery] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | 'All'>('All');
  const [distance, setDistance] = useState('20');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    donorService
      .search({ query, bloodGroup, maxDistanceKm: Number(distance), availableOnly })
      .then((res) => setDonors(res))
      .finally(() => setLoading(false));
  }, [query, bloodGroup, distance, availableOnly]);

  const resetFilters = () => {
    setQuery('');
    setBloodGroup('All');
    setDistance('20');
    setAvailableOnly(false);
  };

  const bloodGroupOptions = useMemo(
    () => [{ label: 'All Blood Groups', value: 'All' }, ...bloodGroups.map((g) => ({ label: g, value: g }))],
    []
  );

  return (
    <div className="border-t border-ink-50">
      <section className="border-b border-ink-50 bg-white py-10">
        <div className="container-app">
          <span className="eyebrow">Find Blood</span>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Find blood donors near you</h1>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <SearchBar value={query} onChange={setQuery} placeholder="Search location..." className="flex-1" />
          </div>
        </div>
      </section>

      <section className="container-app grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
        <div className="space-y-5">
          <FilterPanel onReset={resetFilters}>
            <Select
              label="Blood Group"
              options={bloodGroupOptions}
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value as BloodGroup | 'All')}
            />
            <div>
              <label className="label-field">Distance</label>
              <div className="flex flex-wrap gap-2">
                {distances.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDistance(d)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      distance === d
                        ? 'border-crimson-500 bg-crimson-500 text-white'
                        : 'border-ink-100 text-ink-500 hover:border-crimson-200'
                    }`}
                  >
                    {d} km
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2.5 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="h-4 w-4 rounded border-ink-100 text-crimson-500 focus:ring-crimson-200"
              />
              Available donors only
            </label>
          </FilterPanel>

          <div className="hidden rounded-2xl border border-ink-100 bg-white p-5 text-sm text-ink-500 lg:block">
            <MapPin className="mb-2 h-5 w-5 text-crimson-500" />
            Donor locations are approximate to protect privacy. Exact addresses are only shared once a donor accepts contact.
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm text-ink-500">
            {loading ? 'Searching…' : `${donors.length} donor${donors.length === 1 ? '' : 's'} found`}
          </p>
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : donors.length === 0 ? (
            <EmptyState
              title="No donors match your filters"
              description="Try widening your distance range or clearing a filter."
              action={{ label: 'Reset filters', onClick: resetFilters }}
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {donors.map((donor) => (
                <DonorCard key={donor.id} donor={donor} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
