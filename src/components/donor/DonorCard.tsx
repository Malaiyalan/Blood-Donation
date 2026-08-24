import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import type { Donor } from '../../types';
import { timeSince } from '../../utils/format';

export default function DonorCard({ donor }: { donor: Donor }) {
  return (
    <Card hoverable padding="md" className="animate-slideUp">
      <div className="flex items-start gap-3">
        <Avatar name={donor.name} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-ink-900">{donor.name}</h3>
            {donor.verified && <Badge tone="teal">Verified</Badge>}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-crimson-600">{donor.bloodGroup}</span>
            <Badge tone={donor.available ? 'green' : 'gray'} dot>
              {donor.available ? 'Available' : 'Unavailable'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t border-ink-50 pt-4 text-sm text-ink-500">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-ink-300" />
          <span>
            {donor.city} · {donor.distanceKm} km away
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-ink-300" />
          <span>Last donation: {donor.lastDonation ? timeSince(donor.lastDonation) : 'No record yet'}</span>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <Link
          to={`/donor/${donor.id}`}
          className="btn-outline flex-1 rounded-full px-5 py-2.5 text-sm font-semibold text-center"
        >
          View Profile
        </Link>
        <Button variant="primary" size="sm" fullWidth>
          Contact
        </Button>
      </div>
    </Card>
  );
}
