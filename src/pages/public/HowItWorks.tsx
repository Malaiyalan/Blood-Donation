import { Link } from 'react-router-dom';
import { UserPlus, Search, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';

const steps = [
  { num: '01', title: 'Register', desc: 'Create your free account with your blood group, location, and availability.', icon: UserPlus },
  { num: '02', title: 'Find', desc: 'Search nearby blood donors or browse open blood requests in your area.', icon: Search },
  { num: '03', title: 'Connect', desc: 'Reach out to a compatible donor or requester through the platform.', icon: HeartHandshake },
  { num: '04', title: 'Save a Life', desc: 'Visit the hospital, complete the donation, and track your impact.', icon: ShieldCheck },
];

const faqs = [
  { q: 'Is my personal information visible to everyone?', a: 'No. Only essential details like blood group, city, and approximate distance are shown publicly. Contact details are shared only when you choose to connect.' },
  { q: 'How often can I donate blood?', a: 'Most healthy adults can donate whole blood every 3 months. Your profile tracks your last donation date to help you stay on schedule.' },
  { q: 'What happens after I respond to a request?', a: 'The requester is notified immediately and can reach out to coordinate hospital, timing, and logistics directly with you.' },
];

export default function HowItWorks() {
  return (
    <div>
      <section className="border-b border-ink-50 bg-white py-16 sm:py-20">
        <div className="container-app text-center">
          <span className="eyebrow justify-center">How It Works</span>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-semibold sm:text-5xl">
            A simple path from sign-up to saving a life
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-ink-500">
            LifeDrop makes it easy to become a donor or find one in four straightforward steps.
          </p>
        </div>
      </section>

      <section className="container-app py-16 sm:py-20">
        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-ink-100 lg:block" aria-hidden="true" />
          {steps.map((step) => (
            <div key={step.num} className="relative rounded-2xl border border-ink-100 bg-white p-6 text-center shadow-card">
              <div className="relative z-10 mx-auto -mt-11 flex h-12 w-12 items-center justify-center rounded-full bg-crimson-500 font-mono text-sm font-bold text-white shadow-soft">
                {step.num}
              </div>
              <step.icon className="mx-auto mt-4 h-6 w-6 text-crimson-500" />
              <h3 className="mt-3 text-base font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-50 bg-white py-16 sm:py-20">
        <div className="container-app mx-auto max-w-2xl">
          <h2 className="text-2xl font-semibold text-ink-900">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-ink-50">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium text-ink-900">
                  {faq.q}
                  <span className="ml-4 text-ink-300 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2.5 text-sm text-ink-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="container-app flex flex-col items-center gap-5 text-center">
          <h2 className="text-3xl font-semibold text-ink-900">Ready to become a donor?</h2>
          <Link to="/register" className="btn-primary">
            Create Your Account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
