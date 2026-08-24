import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Droplet, Calendar, ShieldCheck, ArrowLeft } from 'lucide-react';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { donorService } from '../../services/donor.service';
import { useToast } from '../../components/common/Toast';
import type { Donor } from '../../types';
import { timeSince } from '../../utils/format';

export default function DonorProfile() {
  const { id } = useParams();
  const [donor, setDonor] = useState<Donor | null | undefined>(undefined);
  const { showToast } = useToast();

  useEffect(() => {
    if (!id) return;
    donorService.getById(id).then(setDonor);
  }, [id]);

  const handleRequest = () => showToast('Donation request sent to donor.', 'success');
  const handleContact = () => showToast('Contact details shared once the donor accepts.', 'info');

  if (donor === undefined) return <Loader label="Loading donor profile…" />;
  if (!donor) {
    return (
      <div className="container-app py-16 text-center">
        <p className="text-ink-500">Donor not found.</p>
        <Link to="/find-blood" className="btn-outline mt-4 inline-flex">Back to Find Blood</Link>
      </div>
    );
  }

  return (
    <div className="border-t border-ink-50 bg-mist py-10">
      <div className="container-app max-w-3xl">
        <Link to="/find-blood" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900">
          <ArrowLeft className="h-4 w-4" /> Back to Find Blood
        </Link>

        <Card padding="lg" className="animate-slideUp">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <Avatar name={donor.name} size="lg" className="h-20 w-20 text-2xl" />
            <div>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h1 className="text-2xl font-semibold text-ink-900">{donor.name}</h1>
                {donor.verified && (
                  <Badge tone="teal">
                    <ShieldCheck className="h-3 w-3" /> Verified Donor
                  </Badge>
                )}
              </div>
              <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="font-mono text-lg font-bold text-crimson-600">{donor.bloodGroup} Blood Group</span>
                <Badge tone={donor.available ? 'green' : 'gray'} dot>
                  {donor.available ? 'Available for Donation' : 'Currently Unavailable'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-mist p-4 text-center">
              <MapPin className="mx-auto h-4 w-4 text-crimson-500" />
              <p className="mt-2 text-sm font-semibold text-ink-900">{donor.city}</p>
              <p className="text-xs text-ink-500">Location</p>
            </div>
            <div className="rounded-xl bg-mist p-4 text-center">
              <Droplet className="mx-auto h-4 w-4 text-crimson-500" />
              <p className="mt-2 text-sm font-semibold text-ink-900">{donor.donationCount}</p>
              <p className="text-xs text-ink-500">Donation Count</p>
            </div>
            <div className="rounded-xl bg-mist p-4 text-center">
              <Calendar className="mx-auto h-4 w-4 text-crimson-500" />
              <p className="mt-2 text-sm font-semibold text-ink-900">{donor.lastDonation ? timeSince(donor.lastDonation) : '—'}</p>
              <p className="text-xs text-ink-500">Last Donation</p>
            </div>
            <div className="rounded-xl bg-mist p-4 text-center">
              <ShieldCheck className="mx-auto h-4 w-4 text-crimson-500" />
              <p className="mt-2 text-sm font-semibold text-ink-900">{donor.available ? 'Available' : 'Unavailable'}</p>
              <p className="text-xs text-ink-500">Availability</p>
            </div>
          </div>

          <p className="mt-6 rounded-xl border border-dashed border-ink-100 p-4 text-xs text-ink-500">
            For everyone's privacy and safety, phone numbers and exact addresses are shared only after a donor accepts a
            contact or donation request.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" fullWidth onClick={handleContact}>Contact Donor</Button>
            <Button fullWidth onClick={handleRequest}>Request Donation</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
