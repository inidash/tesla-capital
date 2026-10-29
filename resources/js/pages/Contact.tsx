// import { useState } from 'react';
// import { Head, useForm } from '@inertiajs/react';
// import PublicLayout from '@/layouts/PublicLayout';

// export default function Contact() {
//   const { data, setData, post, processing, errors, reset } = useForm({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });

//   const [sent, setSent] = useState(false);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     post('/contact', {
//       onSuccess: () => {
//         setSent(true);
//         reset();
//       },
//     });
//   }

//   return (
//     <PublicLayout>
//       <Head title="Contact -- Meridian Capital" />

//       <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
//         <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
//           <div>
//             <p className="text-xs uppercase tracking-[0.2em] text-[#C89B3C]">Contact</p>
//             <h1 className="mt-4 font-serif text-4xl leading-tight">Questions before you invest?</h1>
//             <p className="mt-4 text-[#6B7268]">
//               Send us a message and we'll respond within one business day. For account-specific questions, log in
//               and use the support link in your dashboard so we can pull up your details securely.
//             </p>

//             <dl className="mt-10 space-y-4 text-sm">
//               <div>
//                 <dt className="text-[#6B7268]">Email</dt>
//                 <dd className="mt-1">teslashare731@gmail.com</dd>
//               </div>
//               <div>
//                 <dt className="text-[#6B7268]">Phone</dt>
//                 <dd className="mt-1">+234 800 000 0000</dd>
//               </div>
//               <div>
//                 <dt className="text-[#6B7268]">Office hours</dt>
//                 <dd className="mt-1">Mon-Fri, 9am-5pm WAT</dd>
//               </div>
//             </dl>
//           </div>

//           <div className="rounded-2xl border border-[#E4DFD1] bg-white p-7">
//             {sent ? (
//               <div className="py-8 text-center">
//                 <p className="font-serif text-xl">Message sent</p>
//                 <p className="mt-2 text-sm text-[#6B7268]">Thanks for reaching out -- we'll get back to you within one business day.</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <Field label="Name" error={errors.name}>
//                   <input
//                     type="text"
//                     value={data.name}
//                     onChange={(e) => setData('name', e.target.value)}
//                     className="w-full rounded-lg border border-[#E4DFD1] px-3 py-2 focus:border-[#173024] focus:outline-none focus:ring-1 focus:ring-[#173024]"
//                   />
//                 </Field>
//                 <Field label="Email" error={errors.email}>
//                   <input
//                     type="email"
//                     value={data.email}
//                     onChange={(e) => setData('email', e.target.value)}
//                     className="w-full rounded-lg border border-[#E4DFD1] px-3 py-2 focus:border-[#173024] focus:outline-none focus:ring-1 focus:ring-[#173024]"
//                   />
//                 </Field>
//                 <Field label="Subject" error={errors.subject}>
//                   <input
//                     type="text"
//                     value={data.subject}
//                     onChange={(e) => setData('subject', e.target.value)}
//                     className="w-full rounded-lg border border-[#E4DFD1] px-3 py-2 focus:border-[#173024] focus:outline-none focus:ring-1 focus:ring-[#173024]"
//                   />
//                 </Field>
//                 <Field label="Message" error={errors.message}>
//                   <textarea
//                     rows={5}
//                     value={data.message}
//                     onChange={(e) => setData('message', e.target.value)}
//                     className="w-full rounded-lg border border-[#E4DFD1] px-3 py-2 focus:border-[#173024] focus:outline-none focus:ring-1 focus:ring-[#173024]"
//                   />
//                 </Field>
//                 <button
//                   type="submit"
//                   disabled={processing}
//                   className="w-full rounded-full bg-[#173024] py-2.5 text-sm font-medium text-[#F6F3EC] disabled:opacity-40"
//                 >
//                   {processing ? 'Sending...' : 'Send message'}
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </section>
//     </PublicLayout>
//   );
// }

// function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
//   return (
//     <div>
//       <label className="block text-xs uppercase tracking-wide text-[#6B7268]">{label}</label>
//       <div className="mt-1">{children}</div>
//       {error && <p className="mt-1 text-xs text-[#9C4A3D]">{error}</p>}
//     </div>
//   );
// }


import { Head, useForm } from '@inertiajs/react';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post('/contact', {
            onSuccess: () => reset(),
        });
    }

    return (
        <>
            <Head title="Contact Us" />

            <div className="min-h-screen bg-[#F7F5EF] text-[#173024]">
                <SiteHeader />
                {/* Header */}
                <section className="bg-[#173024]">
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
                        <div className="max-w-3xl">
                            <span className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white/70">
                                Contact Us
                            </span>

                            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                                We’re here to help.
                            </h1>

                            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
                                Have a question about your account, investment plan
                                or transaction? Send us a message and our team will
                                get back to you.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section>
                    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
                        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
                            {/* Contact information */}
                            <div>
                                <h2 className="text-2xl font-semibold">
                                    Get in touch
                                </h2>

                                <p className="mt-3 text-sm leading-7 text-[#737970]">
                                    Our support team is available to assist with
                                    questions about the TSL Investment platform.
                                </p>

                                <div className="mt-8 space-y-5">
                                    <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-[#9A917F]">
                                            Email
                                        </p>

                                        <p className="mt-2 font-medium">
                                            teslashare731@gmail.com
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-[#9A917F]">
                                            Support
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-[#737970]">
                                            For account, investment and transaction
                                            enquiries, please use the contact form.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Form */}
                            <div className="rounded-[2rem] border border-[#E4DFD1] bg-white p-6 shadow-sm sm:p-8">
                                <h2 className="text-2xl font-semibold">
                                    Send us a message
                                </h2>

                                <p className="mt-2 text-sm text-[#737970]">
                                    Complete the form below and we’ll respond as soon
                                    as possible.
                                </p>

                                <form onSubmit={submit} className="mt-8 space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="text-sm font-medium">
                                                Name
                                            </label>

                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData('name', e.target.value)
                                                }
                                                className="mt-2 w-full rounded-xl border border-[#DCD7CB] bg-[#FBFAF7] px-4 py-3 text-sm outline-none transition focus:border-[#173024] focus:ring-1 focus:ring-[#173024]"
                                                placeholder="Your name"
                                            />

                                            {errors.name && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">
                                                Email
                                            </label>

                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData('email', e.target.value)
                                                }
                                                className="mt-2 w-full rounded-xl border border-[#DCD7CB] bg-[#FBFAF7] px-4 py-3 text-sm outline-none transition focus:border-[#173024] focus:ring-1 focus:ring-[#173024]"
                                                placeholder="you@example.com"
                                            />

                                            {errors.email && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">
                                            Subject
                                        </label>

                                        <input
                                            type="text"
                                            value={data.subject}
                                            onChange={(e) =>
                                                setData('subject', e.target.value)
                                            }
                                            className="mt-2 w-full rounded-xl border border-[#DCD7CB] bg-[#FBFAF7] px-4 py-3 text-sm outline-none transition focus:border-[#173024] focus:ring-1 focus:ring-[#173024]"
                                            placeholder="How can we help?"
                                        />

                                        {errors.subject && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.subject}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">
                                            Message
                                        </label>

                                        <textarea
                                            rows={6}
                                            value={data.message}
                                            onChange={(e) =>
                                                setData('message', e.target.value)
                                            }
                                            className="mt-2 w-full resize-none rounded-xl border border-[#DCD7CB] bg-[#FBFAF7] px-4 py-3 text-sm outline-none transition focus:border-[#173024] focus:ring-1 focus:ring-[#173024]"
                                            placeholder="Tell us how we can help..."
                                        />

                                        {errors.message && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-full bg-[#173024] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#254536] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        </>
    );
}