import { useState } from 'react';
import { User as UserIcon, Droplet, MapPin, Bell } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { currentUser, bloodGroups } from '../../data/mockData';
import { useToast } from '../../components/common/Toast';
import { formatDate } from '../../utils/format';

function Toggle({ checked, onChange, label, description }: { checked: boolean; onChange: (v: boolean) => void; label: string; description?: string }) {
  return (
    <label className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-ink-900">{label}</p>
        {description && <p className="text-xs text-ink-500">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-crimson-500' : 'bg-ink-100'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </label>
  );
}

export default function Profile() {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    dateOfBirth: currentUser.dateOfBirth,
    gender: currentUser.gender,
    bloodGroup: currentUser.bloodGroup,
    address: currentUser.location.address,
    city: currentUser.location.city,
    state: currentUser.location.state,
    postalCode: currentUser.location.postalCode,
  });
  const [prefs, setPrefs] = useState(currentUser.preferences);

  const update = (field: keyof typeof form, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSave = () => showToast('Profile updated successfully.', 'success');

  return (
    <div className="border-t border-ink-50 bg-mist py-10">
      <div className="container-app max-w-3xl space-y-6">
        <div>
          <span className="eyebrow"><UserIcon className="h-3.5 w-3.5" /> Profile</span>
          <h1 className="mt-2 text-3xl font-semibold">Manage your profile</h1>
        </div>

        <Card padding="lg" className="space-y-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-300">
            <UserIcon className="h-4 w-4" /> Personal Information
          </h2>
          <Input label="Name" value={form.name} onChange={(e) => update('name', e.target.value)} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
            <Input label="Phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Date of Birth" type="date" value={form.dateOfBirth} onChange={(e) => update('dateOfBirth', e.target.value)} />
            <Select
              label="Gender"
              value={form.gender}
              onChange={(e) => update('gender', e.target.value)}
              options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }]}
            />
          </div>
        </Card>

        <Card padding="lg" className="space-y-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-300">
            <Droplet className="h-4 w-4" /> Blood Information
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Blood Group"
              value={form.bloodGroup}
              onChange={(e) => update('bloodGroup', e.target.value)}
              options={bloodGroups.map((g) => ({ label: g, value: g }))}
            />
            <Input label="Last Donation" value={formatDate(currentUser.donorInfo.lastDonation || '')} disabled />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Donation Count" value={String(currentUser.donorInfo.donationCount)} disabled />
            <Input label="Donor Status" value={currentUser.donorInfo.available ? 'Available' : 'Unavailable'} disabled />
          </div>
        </Card>

        <Card padding="lg" className="space-y-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-300">
            <MapPin className="h-4 w-4" /> Location
          </h2>
          <Input label="Address" value={form.address} onChange={(e) => update('address', e.target.value)} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input label="City" value={form.city} onChange={(e) => update('city', e.target.value)} />
            <Input label="State" value={form.state} onChange={(e) => update('state', e.target.value)} />
            <Input label="Postal Code" value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} />
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="mb-1 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-300">
            <Bell className="h-4 w-4" /> Preferences
          </h2>
          <div className="divide-y divide-ink-50">
            <Toggle checked={prefs.availableForDonation} onChange={(v) => setPrefs((p) => ({ ...p, availableForDonation: v }))} label="Available for Donation" description="Show up in donor searches near you." />
            <Toggle checked={prefs.emergencyNotifications} onChange={(v) => setPrefs((p) => ({ ...p, emergencyNotifications: v }))} label="Receive Emergency Notifications" description="Get alerted for critical requests matching your blood group." />
            <Toggle checked={prefs.emailNotifications} onChange={(v) => setPrefs((p) => ({ ...p, emailNotifications: v }))} label="Receive Email Notifications" />
            <Toggle checked={prefs.smsNotifications} onChange={(v) => setPrefs((p) => ({ ...p, smsNotifications: v }))} label="Receive SMS Notifications" />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
