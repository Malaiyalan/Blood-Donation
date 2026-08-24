import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, CalendarClock, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { currentUser } from '../../data/mockData';
import { useToast } from '../../components/common/Toast';

const eligibility = [
  'You are between 18 and 65 years old',
  'You weigh at least 50 kg',
  'Your last donation was more than 90 days ago',
  'You are feeling healthy and well today',
];

export default function Donate() {
  const [available, setAvailable] = useState(currentUser.donorInfo.available);
  const [scheduled, setScheduled] = useState(false);
  const { showToast } = useToast();

  const toggleAvailability = () => {
    setAvailable((v) => !v);
    showToast(!available ? "You're marked as available to donate." : 'You are now marked unavailable.', 'success');
  };

  const scheduleDonation = () => {
    setScheduled(true);
    showToast('Donation scheduled. We will remind you closer to the date.', 'success');
  };

  return (
    <div className="border-t border-ink-50 bg-mist py-14">
      <div className="container-app grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="animate-slideUp space-y-6">
          <div>
            <span className="eyebrow">
              <Droplet className="h-3.5 w-3.5" /> Donate Blood
            </span>
            <h1 className="mt-3 text-3xl font-semibold text-ink-900 sm:text-4xl">Ready to give the gift of life?</h1>
            <p className="mt-2 max-w-lg text-ink-500">
              Confirm your availability and we will match you with compatible requests near you, or schedule a
              donation at a partner hospital.
            </p>
          </div>

          <Card padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink-900">Donor availability</p>
                <p className="mt-1 text-sm text-ink-500">
                  {available ? "You're visible to donors searching nearby." : 'You are hidden from search results.'}
                </p>
              </div>
              <button
                onClick={toggleAvailability}
                role="switch"
                aria-checked={available}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${available ? 'bg-crimson-500' : 'bg-ink-100'}`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${available ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </Card>

          <Card padding="lg">
            <p className="text-sm font-semibold text-ink-900">Quick eligibility check</p>
            <ul className="mt-3 space-y-2.5">
              {eligibility.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-500">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card padding="lg" className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <CalendarClock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-900">Schedule a donation</p>
                <p className="text-sm text-ink-500">Apollo Hospital, Chennai · Next slot tomorrow, 10:00 AM</p>
              </div>
            </div>
            <Button onClick={scheduleDonation} disabled={scheduled}>
              {scheduled ? 'Scheduled' : 'Schedule Now'}
            </Button>
          </Card>
        </div>

        <div className="space-y-6">
          <Card padding="lg">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
              <ShieldCheck className="h-4 w-4 text-crimson-500" /> Your donor snapshot
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-xl bg-mist py-4">
                <p className="font-mono text-2xl font-bold text-crimson-600">{currentUser.bloodGroup}</p>
                <p className="text-xs text-ink-500">Blood Group</p>
              </div>
              <div className="rounded-xl bg-mist py-4">
                <p className="font-mono text-2xl font-bold text-ink-900">{currentUser.donorInfo.donationCount}</p>
                <p className="text-xs text-ink-500">Donations</p>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-500">
              <MapPin className="h-4 w-4 text-ink-300" /> {currentUser.location.city}, {currentUser.location.state}
            </p>
          </Card>

          <Card padding="lg" className="bg-ink-900 text-white">
            <p className="text-sm font-semibold">Someone nearby needs your blood group</p>
            <p className="mt-1.5 text-sm text-white/60">
              3 open requests match {currentUser.bloodGroup} in your area right now.
            </p>
            <Link to="/find-blood" className="btn-primary mt-4 inline-flex">
              View Requests
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
