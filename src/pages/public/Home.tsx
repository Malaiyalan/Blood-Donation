import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Users, HeartPulse, Activity, ArrowRight, UserPlus, Search, HeartHandshake, ShieldCheck, MapPin } from 'lucide-react';
import StatsCard from '../../components/common/StatsCard';
import BloodGroupCard from '../../components/blood-request/BloodGroupCard';
import BloodRequestCard from '../../components/blood-request/BloodRequestCard';
import { homeStats, bloodGroupStats, bloodRequests } from '../../data/mockData';
import type { BloodGroup } from '../../types';

const statIcons = [Users, HeartPulse, Activity, Droplet];

const steps = [
  { num: '01', title: 'Register', desc: 'Create your free account.', icon: UserPlus },
  { num: '02', title: 'Find', desc: 'Find nearby blood donors or requests.', icon: Search },
  { num: '03', title: 'Connect', desc: 'Connect with a compatible donor.', icon: HeartHandshake },
  { num: '04', title: 'Save a Life', desc: 'Complete the donation.', icon: ShieldCheck },
];

export default function Home() {
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>('O+');
  const selectedStat = bloodGroupStats.find((s) => s.group === selectedGroup)!;
  const emergencyRequests = bloodRequests.filter((r) => r.urgency !== 'Normal').slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-50 bg-gradient-to-b from-white to-sand">
        <div className="container-app grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-slideUp">
            <span className="eyebrow">
              <Droplet className="h-3.5 w-3.5" /> LifeDrop · Donate Blood. Save Lives.
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Every Drop Can
              <br />
              <span className="text-crimson-500">Save a Life.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink-500">
              Connect blood donors with people who need blood quickly and safely.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary">
                Donate Blood <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/request-blood" className="btn-secondary">
                Request Blood
              </Link>
              <Link to="/find-blood" className="btn-outline">
                Find Blood
              </Link>
            </div>
          </div>

          <div className="relative animate-fadeIn">
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-0 rounded-[3rem] bg-crimson-50" />
              <div className="absolute inset-6 rounded-[2.5rem] border border-crimson-100 bg-white shadow-soft" />
              <svg viewBox="0 0 200 200" className="absolute inset-10" aria-hidden="true">
                <path
                  d="M100 20 C100 20 40 100 40 135 a60 60 0 0 0 120 0 C160 100 100 20 100 20z"
                  fill="#C81E3A"
                />
                <path
                  d="M100 45c-5 8-32 52-32 78a32 32 0 0 0 36 31.8"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
              <div className="absolute -right-2 top-8 rounded-2xl border border-ink-50 bg-white px-4 py-3 shadow-soft animate-slideUp">
                <p className="font-mono text-lg font-bold text-crimson-600">O+</p>
                <p className="text-xs text-ink-500">248 donors nearby</p>
              </div>
              <div className="absolute -left-4 bottom-10 rounded-2xl border border-ink-50 bg-white px-4 py-3 shadow-soft animate-slideUp">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-teal-600">
                  <MapPin className="h-3.5 w-3.5" /> 3.5 km away
                </p>
                <p className="text-xs text-ink-500">Apollo Hospital</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-app -mt-1 py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {homeStats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <StatsCard
                key={stat.label}
                icon={<Icon className="h-5 w-5" />}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                tone={(['crimson', 'teal', 'amber', 'ink'] as const)[i]}
              />
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-ink-50 bg-white py-16 sm:py-20">
        <div className="container-app">
          <div className="mx-auto max-w-xl text-center">
            <span className="eyebrow justify-center">How It Works</span>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">From sign-up to saving a life</h2>
          </div>
          <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-ink-100 lg:block" aria-hidden="true" />
            {steps.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-crimson-500 font-mono text-sm font-bold text-white">
                  {step.num}
                </div>
                <step.icon className="mx-auto mt-4 h-6 w-6 text-crimson-500" />
                <h3 className="mt-3 text-base font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-1.5 text-sm text-ink-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blood group selector */}
      <section className="py-16 sm:py-20">
        <div className="container-app">
          <div className="mx-auto max-w-xl text-center">
            <span className="eyebrow justify-center">Blood Groups</span>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Find your blood group</h2>
            <p className="mt-2 text-ink-500">Tap a blood group to see availability near you.</p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-4 gap-3 sm:gap-4">
            {bloodGroupStats.map((s) => (
              <BloodGroupCard
                key={s.group}
                group={s.group}
                active={s.group === selectedGroup}
                onClick={() => setSelectedGroup(s.group)}
              />
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-lg animate-fadeIn rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink-500">Blood Group</p>
                <p className="font-mono text-3xl font-bold text-crimson-600">{selectedStat.group}</p>
              </div>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="font-mono text-2xl font-semibold text-ink-900">{selectedStat.availableDonors}</p>
                  <p className="text-xs text-ink-500">Available Donors</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-semibold text-ink-900">{selectedStat.activeRequests}</p>
                  <p className="text-xs text-ink-500">Active Requests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency requests */}
      <section className="border-t border-ink-50 bg-white py-16 sm:py-20">
        <div className="container-app">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 animate-pulseLine rounded-full bg-crimson-500" /> Emergency
              </span>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Someone Nearby Needs Blood</h2>
            </div>
            <Link to="/find-blood" className="btn-outline">
              View all requests <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {emergencyRequests.map((req) => (
              <BloodRequestCard key={req.id} request={req} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
