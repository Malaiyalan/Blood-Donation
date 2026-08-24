import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Droplet, ShieldCheck } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';
import { useToast } from '../../components/common/Toast';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const { login, loginAsAdmin, loading } = useAuthStore();
  const { showToast } = useToast();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setServerError('');
    try {
      await login({ email: values.email, password: values.password });
      showToast('Welcome back! You are now logged in.', 'success');
      navigate('/dashboard');
    } catch {
      setServerError('We could not sign you in. Check your details and try again.');
    }
  };

  const handleAdminDemo = () => {
    loginAsAdmin();
    showToast('Signed in to the admin console.', 'success');
    navigate('/admin');
  };

  return (
    <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink-900 p-12 text-white lg:flex">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-crimson-500/20 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" aria-hidden="true" />
        <Link to="/" className="relative z-10 flex items-center gap-2">
          <Droplet className="h-6 w-6 fill-crimson-500 text-crimson-500" />
          <span className="font-display text-xl font-semibold">LifeDrop</span>
        </Link>
        <div className="relative z-10">
          <h1 className="font-display text-5xl font-semibold leading-tight">
            Donate Blood.
            <br />
            Save Lives.
          </h1>
          <p className="mt-4 max-w-sm text-white/70">Your one donation can make a difference.</p>
        </div>
        <p className="relative z-10 flex items-center gap-2 text-sm text-white/50">
          <ShieldCheck className="h-4 w-4" /> Trusted by 10,000+ verified donors across India.
        </p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm animate-slideUp">
          <h2 className="text-2xl font-semibold text-ink-900">Welcome Back</h2>
          <p className="mt-1.5 text-sm text-ink-500">Sign in to continue saving lives.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register('password')}
            />

            {serverError && <p className="text-sm font-medium text-crimson-600">{serverError}</p>}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-500">
                <input type="checkbox" className="h-4 w-4 rounded border-ink-100 text-crimson-500" {...register('remember')} />
                Remember me
              </label>
              <button type="button" className="font-medium text-teal-600 hover:underline">
                Forgot Password?
              </button>
            </div>

            <Button type="submit" fullWidth loading={loading}>
              Login
            </Button>
          </form>

          <button
            onClick={handleAdminDemo}
            className="mt-3 w-full rounded-full border border-dashed border-ink-100 py-2.5 text-xs font-medium text-ink-500 hover:border-teal-300 hover:text-teal-600"
          >
            Continue to admin demo console
          </button>

          <p className="mt-6 text-center text-sm text-ink-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-crimson-600 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
