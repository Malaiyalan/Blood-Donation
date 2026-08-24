import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Droplet } from 'lucide-react';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { bloodGroups, currentUser } from '../../data/mockData';
import { bloodRequestService } from '../../services/bloodRequest.service';
import { useToast } from '../../components/common/Toast';
import { cn } from '../../utils/cn';

const schema = z.object({
  patientName: z.string().min(1, 'Patient name is required'),
  bloodGroup: z.string().min(1, 'Select a blood group'),
  units: z.number().min(1, 'Enter at least 1 unit'),
  urgency: z.enum(['Normal', 'Urgent', 'Critical']),
  hospitalName: z.string().min(1, 'Hospital name is required'),
  hospitalAddress: z.string().min(1, 'Hospital address is required'),
  city: z.string().min(1, 'City is required'),
  requiredDate: z.string().min(1, 'Required date is needed'),
  requiredTime: z.string().min(1, 'Required time is needed'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const urgencyOptions = [
  { value: 'Normal', desc: 'Needed within a week', tone: 'teal' },
  { value: 'Urgent', desc: 'Needed within 48 hours', tone: 'amber' },
  { value: 'Critical', desc: 'Needed immediately', tone: 'crimson' },
] as const;

export default function CreateBloodRequest() {
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { urgency: 'Normal', units: 1, contactNumber: currentUser.phone, city: currentUser.location.city },
  });

  const urgency = watch('urgency');

  const onSubmit = async (values: FormValues) => {
    await bloodRequestService.create({
      patientName: values.patientName,
      bloodGroup: values.bloodGroup as any,
      units: values.units,
      urgency: values.urgency,
      hospitalName: values.hospitalName,
      hospitalAddress: values.hospitalAddress,
      city: values.city,
      requiredDate: values.requiredDate,
      requiredTime: values.requiredTime,
      contactNumber: values.contactNumber,
      additionalInfo: values.additionalInfo,
      requesterName: currentUser.name,
    });
    showToast('Blood request created successfully.', 'success');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container-app flex min-h-[calc(100vh-64px)] items-center justify-center border-t border-ink-50 py-16">
        <Card padding="lg" className="max-w-md animate-slideUp text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-ink-900">Blood Request Created Successfully</h1>
          <p className="mt-2.5 text-ink-500">We are finding compatible donors near you.</p>
          <p className="mt-1.5 text-sm text-ink-500">You will receive notifications when donors respond.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" fullWidth onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
            <Button fullWidth onClick={() => navigate('/find-blood')}>Find Donors</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="border-t border-ink-50 bg-mist py-10">
      <div className="container-app max-w-2xl">
        <span className="eyebrow">
          <Droplet className="h-3.5 w-3.5" /> Request Blood
        </span>
        <h1 className="mt-2 text-3xl font-semibold">Create a blood request</h1>
        <p className="mt-1.5 text-ink-500">We'll notify compatible, nearby donors as soon as you submit.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-6">
          <Card padding="lg" className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-300">Patient Details</h2>
            <Input label="Patient Name" placeholder="Ramesh Kumar" error={errors.patientName?.message} {...register('patientName')} />
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Blood Group"
                placeholder="Select"
                options={bloodGroups.map((g) => ({ label: g, value: g }))}
                error={errors.bloodGroup?.message}
                {...register('bloodGroup')}
              />
              <Input
                label="Units Required"
                type="number"
                min={1}
                error={errors.units?.message}
                {...register('units', { valueAsNumber: true })}
              />
            </div>

            <div>
              <label className="label-field">Urgency</label>
              <div className="grid grid-cols-3 gap-3">
                {urgencyOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setValue('urgency', opt.value)}
                    className={cn(
                      'rounded-xl border p-3 text-center transition-colors',
                      urgency === opt.value ? 'border-crimson-500 bg-crimson-50' : 'border-ink-100 hover:border-crimson-200'
                    )}
                  >
                    <p className="text-sm font-semibold text-ink-900">{opt.value}</p>
                    <p className="mt-0.5 text-[11px] text-ink-500">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card padding="lg" className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-300">Hospital & Timing</h2>
            <Input label="Hospital Name" placeholder="Apollo Hospital" error={errors.hospitalName?.message} {...register('hospitalName')} />
            <Input label="Hospital Address" placeholder="Greams Road" error={errors.hospitalAddress?.message} {...register('hospitalAddress')} />
            <Input label="Location / City" placeholder="Chennai" error={errors.city?.message} {...register('city')} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Required Date" type="date" error={errors.requiredDate?.message} {...register('requiredDate')} />
              <Input label="Required Time" type="time" error={errors.requiredTime?.message} {...register('requiredTime')} />
            </div>
          </Card>

          <Card padding="lg" className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-300">Contact</h2>
            <Input label="Contact Number" placeholder="+91 98765 43210" error={errors.contactNumber?.message} {...register('contactNumber')} />
            <div>
              <label className="label-field">Additional Information</label>
              <textarea
                rows={3}
                placeholder="Any other details that could help donors respond faster…"
                className="input-field resize-none"
                {...register('additionalInfo')}
              />
            </div>
          </Card>

          <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
            Create Blood Request
          </Button>
        </form>
      </div>
    </div>
  );
}
