import { useState } from 'react';
import { Save } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';

export default function AdminSettings() {
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast('Settings saved successfully.', 'success');
    }, 700);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Settings</h1>
        <p className="mt-1 text-sm text-ink-500">Platform-wide configuration for LifeDrop.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card padding="lg" className="space-y-4">
          <p className="text-sm font-semibold text-ink-900">General</p>
          <Input label="Platform Name" defaultValue="LifeDrop" />
          <Input label="Support Email" type="email" defaultValue="support@lifedrop.app" />
          <Select
            label="Default Search Radius"
            defaultValue="20"
            options={[
              { label: '5 km', value: '5' },
              { label: '10 km', value: '10' },
              { label: '20 km', value: '20' },
              { label: '50 km', value: '50' },
            ]}
          />
        </Card>

        <Card padding="lg" className="space-y-4">
          <p className="text-sm font-semibold text-ink-900">Donation Rules</p>
          <Input label="Minimum Donor Age" type="number" defaultValue={18} />
          <Input label="Minimum Days Between Donations" type="number" defaultValue={90} />
        </Card>

        <Card padding="lg" className="space-y-3">
          <p className="text-sm font-semibold text-ink-900">Notifications</p>
          {['Emergency broadcast alerts', 'Weekly donor digest', 'System maintenance notices'].map((label) => (
            <label key={label} className="flex items-center justify-between text-sm text-ink-700">
              {label}
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-ink-100 text-crimson-500" />
            </label>
          ))}
        </Card>

        <Button type="submit" icon={<Save className="h-4 w-4" />} loading={saving}>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
