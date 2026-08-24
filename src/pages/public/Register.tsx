import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';
import { useToast } from '../../components/common/Toast';
import { bloodGroups } from '../../data/mockData';
import { cn } from '../../utils/cn';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  bloodGroup: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  willingToDonate: 'Yes' | 'No' | '';
}

const initialState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  bloodGroup: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  willingToDonate: '',
};

const steps = ['Account', 'Blood Info', 'Location', 'Preferences'];

export default function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const { register, loading } = useAuthStore();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (step === 1) {
      if (!form.fullName) next.fullName = 'Full name is required';
      if (!form.email) next.email = 'Email is required';
      if (!form.phone) next.phone = 'Phone number is required';
      if (!form.password || form.password.length < 6) next.password = 'Password must be at least 6 characters';
      if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match';
    }
    if (step === 2) {
      if (!form.bloodGroup) next.bloodGroup = 'Select your blood group';
      if (!form.dateOfBirth) next.dateOfBirth = 'Date of birth is required';
      if (!form.gender) next.gender = 'Select your gender';
    }
    if (step === 3) {
      if (!form.address) next.address = 'Address is required';
      if (!form.city) next.city = 'City is required';
      if (!form.state) next.state = 'State is required';
      if (!form.postalCode) next.postalCode = 'Postal code is required';
    }
    if (step === 4 && !form.willingToDonate) next.willingToDonate = 'Please select an option';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      await register({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        bloodGroup: form.bloodGroup,
        dateOfBirth: form.dateOfBirth,
        gender: form.gender,
        address: form.address,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        willingToDonate: form.willingToDonate === 'Yes',
      });
      showToast('Account created successfully. Welcome to LifeDrop!', 'success');
      navigate('/dashboard');
    } catch {
      showToast('We could not create your account. Please try again.', 'error');
    }
  };

  return (
    <div className="border-t border-ink-50 bg-mist py-12">
      <div className="container-app max-w-xl">
        <div className="text-center">
          <span className="eyebrow justify-center">Join LifeDrop</span>
          <h1 className="mt-2 text-3xl font-semibold">Create Account</h1>
        </div>

        {/* Progress */}
        <div className="mt-8 flex items-center justify-center">
          {steps.map((label, i) => {
            const n = i + 1;
            const active = n === step;
            const done = n < step;
            return (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors',
                      done ? 'bg-teal-500 text-white' : active ? 'bg-crimson-500 text-white' : 'bg-white text-ink-300 border border-ink-100'
                    )}
                  >
                    {done ? <Check className="h-4 w-4" /> : n}
                  </div>
                  <span className={cn('hidden text-xs sm:block', active ? 'font-semibold text-ink-900' : 'text-ink-300')}>
                    {label}
                  </span>
                </div>
                {n < steps.length && <div className={cn('mx-2 h-px w-8 sm:w-14', done ? 'bg-teal-500' : 'bg-ink-100')} />}
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
          {step === 1 && (
            <div className="animate-fadeIn space-y-4">
              <h2 className="text-lg font-semibold text-ink-900">Create Account</h2>
              <Input label="Full Name" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} error={errors.fullName} placeholder="Jane Doe" />
              <Input label="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} error={errors.email} placeholder="jane@example.com" />
              <Input label="Phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} error={errors.phone} placeholder="+91 98765 43210" />
              <Input label="Password" type="password" value={form.password} onChange={(e) => update('password', e.target.value)} error={errors.password} placeholder="••••••••" />
              <Input label="Confirm Password" type="password" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} error={errors.confirmPassword} placeholder="••••••••" />
            </div>
          )}

          {step === 2 && (
            <div className="animate-fadeIn space-y-4">
              <h2 className="text-lg font-semibold text-ink-900">Blood Information</h2>
              <Select
                label="Blood Group"
                placeholder="Select blood group"
                options={bloodGroups.map((g) => ({ label: g, value: g }))}
                value={form.bloodGroup}
                onChange={(e) => update('bloodGroup', e.target.value)}
                error={errors.bloodGroup}
              />
              <Input label="Date of Birth" type="date" value={form.dateOfBirth} onChange={(e) => update('dateOfBirth', e.target.value)} error={errors.dateOfBirth} />
              <Select
                label="Gender"
                placeholder="Select gender"
                options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }]}
                value={form.gender}
                onChange={(e) => update('gender', e.target.value)}
                error={errors.gender}
              />
            </div>
          )}

          {step === 3 && (
            <div className="animate-fadeIn space-y-4">
              <h2 className="text-lg font-semibold text-ink-900">Location</h2>
              <Input label="Address" value={form.address} onChange={(e) => update('address', e.target.value)} error={errors.address} placeholder="14 Anna Salai" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="City" value={form.city} onChange={(e) => update('city', e.target.value)} error={errors.city} placeholder="Chennai" />
                <Input label="State" value={form.state} onChange={(e) => update('state', e.target.value)} error={errors.state} placeholder="Tamil Nadu" />
              </div>
              <Input label="Postal Code" value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} error={errors.postalCode} placeholder="600002" />
            </div>
          )}

          {step === 4 && (
            <div className="animate-fadeIn space-y-4">
              <h2 className="text-lg font-semibold text-ink-900">Donor Preferences</h2>
              <p className="text-sm text-ink-500">Are you willing to donate blood?</p>
              <div className="grid grid-cols-2 gap-4">
                {(['Yes', 'No'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update('willingToDonate', opt)}
                    className={cn(
                      'rounded-2xl border p-5 text-center font-semibold transition-colors',
                      form.willingToDonate === opt
                        ? 'border-crimson-500 bg-crimson-50 text-crimson-600'
                        : 'border-ink-100 text-ink-500 hover:border-crimson-200'
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {errors.willingToDonate && <p className="text-xs font-medium text-crimson-600">{errors.willingToDonate}</p>}
            </div>
          )}

          <div className="mt-8 flex justify-between gap-3">
            <Button variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
              Back
            </Button>
            <Button onClick={handleNext} loading={loading}>
              {step === 4 ? 'Create Account' : 'Continue'}
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-crimson-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
