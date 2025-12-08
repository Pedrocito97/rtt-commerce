"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Section, fadeInUp } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Send,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  Award,
  Users,
} from "lucide-react";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  position: z.string().min(1, "Please select a position"),
  subject: z.string().optional(),
  message: z.string().min(20, "Please tell us more about yourself (min 20 characters)"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const positions = [
  { value: "sales-advisor", label: "Sales Advisor" },
  { value: "sales-representative", label: "Sales Representative" },
  { value: "sales-marketing", label: "Sales & Marketing" },
];

const benefits = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Response within 24 hours",
    description: "We value your time and will get back to you quickly.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "No experience required",
    description: "We provide comprehensive training for all new team members.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Join a young team",
    description: "Work with dynamic professionals in a supportive environment.",
  },
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ApplicationFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitted(true);
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof ApplicationFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["name", "email", "phone"];
    } else if (step === 2) {
      fieldsToValidate = ["position"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[var(--primary-blue-light)] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[var(--primary-blue)]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] text-sm font-medium mb-6">
              Solliciteer
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--dark)] mb-6">
              Start je carrière bij RTT Commerce
            </h1>
            <p className="text-xl text-[var(--gray-600)]">
              Sign up and start your journey! Join our young and innovative team
              for constant support and growth opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative -mt-10 z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          className="grid md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[var(--dark)] mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[var(--gray-600)]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Application Form */}
      <Section>
        <div className="max-w-2xl mx-auto">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
              <h2 className="text-3xl font-bold text-[var(--dark)] mb-4">
                Sollicitatie verzonden!
              </h2>
              <p className="text-[var(--gray-600)] mb-8 max-w-md mx-auto">
                Bedankt voor je interesse in RTT Commerce. We nemen binnen 24 uur
                contact met je op.
              </p>
              <Link href="/">
                <Button variant="outline">
                  Terug naar home
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              {/* Progress Bar */}
              <div className="px-8 pt-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[var(--gray-600)]">
                    Step {step} of {totalSteps}
                  </span>
                  <span className="text-sm text-[var(--gray-500)]">
                    {Math.round((step / totalSteps) * 100)}% complete
                  </span>
                </div>
                <div className="h-2 bg-[var(--gray-100)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--primary-blue)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Personal Info */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--dark)] mb-2">
                          Personal Information
                        </h2>
                        <p className="text-[var(--gray-600)]">
                          Tell us a bit about yourself.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                            <User className="w-4 h-4 inline mr-2" />
                            Naam *
                          </label>
                          <input
                            {...register("name")}
                            type="text"
                            className={`w-full px-4 py-3 rounded-xl border ${
                              errors.name
                                ? "border-red-500"
                                : "border-[var(--gray-200)]"
                            } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all`}
                            placeholder="Je volledige naam"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                            <Mail className="w-4 h-4 inline mr-2" />
                            E-mail *
                          </label>
                          <input
                            {...register("email")}
                            type="email"
                            className={`w-full px-4 py-3 rounded-xl border ${
                              errors.email
                                ? "border-red-500"
                                : "border-[var(--gray-200)]"
                            } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all`}
                            placeholder="je@email.com"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                            <Phone className="w-4 h-4 inline mr-2" />
                            Telefoonnummer *
                          </label>
                          <input
                            {...register("phone")}
                            type="tel"
                            className={`w-full px-4 py-3 rounded-xl border ${
                              errors.phone
                                ? "border-red-500"
                                : "border-[var(--gray-200)]"
                            } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all`}
                            placeholder="+32 xxx xxx xxx"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Position */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--dark)] mb-2">
                          Position
                        </h2>
                        <p className="text-[var(--gray-600)]">
                          Which position are you interested in?
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                          <Briefcase className="w-4 h-4 inline mr-2" />
                          Vacature *
                        </label>
                        <div className="space-y-3">
                          {positions.map((position) => (
                            <label
                              key={position.value}
                              className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                watch("position") === position.value
                                  ? "border-[var(--primary-blue)] bg-[var(--primary-blue-light)]"
                                  : "border-[var(--gray-200)] hover:border-[var(--primary-blue)]/50"
                              }`}
                            >
                              <input
                                {...register("position")}
                                type="radio"
                                value={position.value}
                                className="sr-only"
                              />
                              <div
                                className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                                  watch("position") === position.value
                                    ? "border-[var(--primary-blue)]"
                                    : "border-[var(--gray-300)]"
                                }`}
                              >
                                {watch("position") === position.value && (
                                  <div className="w-3 h-3 rounded-full bg-[var(--primary-blue)]" />
                                )}
                              </div>
                              <span className="font-medium text-[var(--dark)]">
                                {position.label}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.position && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.position.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Message */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--dark)] mb-2">
                          Tell us about yourself
                        </h2>
                        <p className="text-[var(--gray-600)]">
                          Why are you interested in joining RTT Commerce?
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                          <FileText className="w-4 h-4 inline mr-2" />
                          Bericht *
                        </label>
                        <textarea
                          {...register("message")}
                          rows={6}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.message
                              ? "border-red-500"
                              : "border-[var(--gray-200)]"
                          } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all resize-none`}
                          placeholder="Tell us about your motivation, experience, and why you'd be a great fit..."
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.message.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-[var(--gray-100)]">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={prevStep}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < totalSteps ? (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={nextStep}
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Verzenden...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Solliciteer nu!
                        </span>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </Section>
    </>
  );
}
