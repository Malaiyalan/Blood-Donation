import { MapPin, Calendar, Droplet } from 'lucide-react';
import Card from '../common/Card';
import { UrgencyBadge } from '../common/Badge';
import Button from '../common/Button';
import type { BloodRequest } from '../../types';
import { formatShortDate } from '../../utils/format';

interface BloodRequestCardProps {
  request: BloodRequest;
  onView?: () => void;
  onRespond?: () => void;
}

export default function BloodRequestCard({ request, onView, onRespond }: BloodRequestCardProps) {
  const isCritical = request.urgency === 'Critical';
  return (
    <Card
      hoverable
      padding="md"
      className={`animate-slideUp ${isCritical ? 'ring-1 ring-crimson-100' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <UrgencyBadge urgency={request.urgency} />
        <span className="font-mono text-xs text-ink-300">{formatShortDate(request.createdAt)}</span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson-50 text-crimson-600">
          <Droplet className="h-5 w-5" />
        </div>
        <div>
          <p className="font-mono text-lg font-bold text-ink-900">{request.bloodGroup} Blood Required</p>
          <p className="text-sm text-ink-500">{request.units} Units</p>
        </div>
      </div>

      <div className="mt-4 space-y-1.5 border-t border-ink-50 pt-4 text-sm text-ink-500">
        <p className="font-medium text-ink-700">{request.hospitalName}</p>
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-ink-300" />
          <span>
            {request.city} · {request.distanceKm} km away
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-ink-300" />
          <span>Required {formatShortDate(request.requiredDate)}</span>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <Button variant="outline" size="sm" fullWidth onClick={onView}>
          View Request
        </Button>
        <Button variant="primary" size="sm" fullWidth onClick={onRespond}>
          Respond
        </Button>
      </div>
    </Card>
  );
}
