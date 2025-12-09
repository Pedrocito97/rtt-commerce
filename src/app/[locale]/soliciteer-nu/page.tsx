"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Section, fadeInUp } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  FileText,
  Send,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  Award,
  Users,
  Upload,
  Globe,
  X,
} from "lucide-react";
import { countryCodes, defaultCountryCode } from "@/lib/country-codes";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const applicationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  countryCode: z.string().min(1, "Please select a country code"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  language: z.enum(["fr", "nl"], { message: "Please select a language" }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export default function ApplyPage() {
  const t = useTranslations("apply");
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    watch,
    setValue,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
    defaultValues: {
      countryCode: defaultCountryCode,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCvError(null);

    if (!file) {
      setCvFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setCvError(t("cvErrorType"));
      setCvFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setCvError(t("cvErrorSize"));
      setCvFile(null);
      return;
    }

    setCvFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setCvError(t("cvErrorType"));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setCvError(t("cvErrorSize"));
      return;
    }

    setCvFile(file);
    setCvError(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeCvFile = () => {
    setCvFile(null);
    setCvError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setSubmitError(null);

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("countryCode", data.countryCode);
    formData.append("phone", data.phone);
    formData.append("language", data.language);

    if (cvFile) {
      formData.append("cv", cvFile);
    }

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred. Please try again."
      );
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof ApplicationFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["firstName", "lastName", "email", "countryCode", "phone"];
    } else if (step === 2) {
      fieldsToValidate = ["language"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("benefit1"),
      description: t("benefit1Desc"),
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t("benefit2"),
      description: t("benefit2Desc"),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t("benefit3"),
      description: t("benefit3Desc"),
    },
  ];

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
              {t("badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--dark)] mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-[var(--gray-600)]">{t("subtitle")}</p>
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
                {t("successTitle")}
              </h2>
              <p className="text-[var(--gray-600)] mb-8 max-w-md mx-auto">
                {t("successMessage")}
              </p>
              <Link href="/">
                <Button variant="outline">
                  {t("backHome")}
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
                    {t("stepOf", { step, total: totalSteps })}
                  </span>
                  <span className="text-sm text-[var(--gray-500)]">
                    {Math.round((step / totalSteps) * 100)}{t("complete")}
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
                          {t("step1")}
                        </h2>
                        <p className="text-[var(--gray-600)]">{t("step1Desc")}</p>
                      </div>

                      <div className="space-y-4">
                        {/* First Name */}
                        <div>
                          <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                            <User className="w-4 h-4 inline mr-2" />
                            {t("firstName")} *
                          </label>
                          <input
                            {...register("firstName")}
                            type="text"
                            className={`w-full px-4 py-3 rounded-xl border ${
                              errors.firstName
                                ? "border-red-500"
                                : "border-[var(--gray-200)]"
                            } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all`}
                            placeholder={t("firstNamePlaceholder")}
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>

                        {/* Last Name */}
                        <div>
                          <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                            <User className="w-4 h-4 inline mr-2" />
                            {t("lastName")} *
                          </label>
                          <input
                            {...register("lastName")}
                            type="text"
                            className={`w-full px-4 py-3 rounded-xl border ${
                              errors.lastName
                                ? "border-red-500"
                                : "border-[var(--gray-200)]"
                            } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all`}
                            placeholder={t("lastNamePlaceholder")}
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                            <Mail className="w-4 h-4 inline mr-2" />
                            {t("email")} *
                          </label>
                          <input
                            {...register("email")}
                            type="email"
                            className={`w-full px-4 py-3 rounded-xl border ${
                              errors.email
                                ? "border-red-500"
                                : "border-[var(--gray-200)]"
                            } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all`}
                            placeholder={t("emailPlaceholder")}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* Phone with Country Code */}
                        <div>
                          <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                            <Phone className="w-4 h-4 inline mr-2" />
                            {t("phone")} *
                          </label>
                          <div className="flex gap-2">
                            <select
                              {...register("countryCode")}
                              className={`w-32 px-3 py-3 rounded-xl border ${
                                errors.countryCode
                                  ? "border-red-500"
                                  : "border-[var(--gray-200)]"
                              } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all bg-white`}
                            >
                              {countryCodes.map((country) => (
                                <option key={country.code} value={country.code}>
                                  {country.flag} {country.code}
                                </option>
                              ))}
                            </select>
                            <input
                              {...register("phone")}
                              type="tel"
                              className={`flex-1 px-4 py-3 rounded-xl border ${
                                errors.phone
                                  ? "border-red-500"
                                  : "border-[var(--gray-200)]"
                              } focus:border-[var(--primary-blue)] focus:ring-2 focus:ring-[var(--primary-blue)]/20 outline-none transition-all`}
                              placeholder={t("phonePlaceholder")}
                            />
                          </div>
                          {(errors.countryCode || errors.phone) && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.countryCode?.message || errors.phone?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Language & CV */}
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
                          {t("step2")}
                        </h2>
                        <p className="text-[var(--gray-600)]">{t("step2Desc")}</p>
                      </div>

                      {/* Language Selection */}
                      <div>
                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-3">
                          <Globe className="w-4 h-4 inline mr-2" />
                          {t("selectLanguage")} *
                        </label>
                        <div className="space-y-3">
                          <label
                            className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              watch("language") === "nl"
                                ? "border-[var(--primary-blue)] bg-[var(--primary-blue-light)]"
                                : "border-[var(--gray-200)] hover:border-[var(--primary-blue)]/50"
                            }`}
                          >
                            <input
                              {...register("language")}
                              type="radio"
                              value="nl"
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                                watch("language") === "nl"
                                  ? "border-[var(--primary-blue)]"
                                  : "border-[var(--gray-300)]"
                              }`}
                            >
                              {watch("language") === "nl" && (
                                <div className="w-3 h-3 rounded-full bg-[var(--primary-blue)]" />
                              )}
                            </div>
                            <span className="text-2xl mr-3">🇳🇱</span>
                            <span className="font-medium text-[var(--dark)]">
                              {t("languageDutch")}
                            </span>
                          </label>

                          <label
                            className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              watch("language") === "fr"
                                ? "border-[var(--primary-blue)] bg-[var(--primary-blue-light)]"
                                : "border-[var(--gray-200)] hover:border-[var(--primary-blue)]/50"
                            }`}
                          >
                            <input
                              {...register("language")}
                              type="radio"
                              value="fr"
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                                watch("language") === "fr"
                                  ? "border-[var(--primary-blue)]"
                                  : "border-[var(--gray-300)]"
                              }`}
                            >
                              {watch("language") === "fr" && (
                                <div className="w-3 h-3 rounded-full bg-[var(--primary-blue)]" />
                              )}
                            </div>
                            <span className="text-2xl mr-3">🇫🇷</span>
                            <span className="font-medium text-[var(--dark)]">
                              {t("languageFrench")}
                            </span>
                          </label>
                        </div>
                        {errors.language && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.language.message}
                          </p>
                        )}
                      </div>

                      {/* CV Upload */}
                      <div>
                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-3">
                          <FileText className="w-4 h-4 inline mr-2" />
                          {t("uploadCv")}
                        </label>
                        <div
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                            cvFile
                              ? "border-green-500 bg-green-50"
                              : cvError
                              ? "border-red-500 bg-red-50"
                              : "border-[var(--gray-300)] hover:border-[var(--primary-blue)]"
                          }`}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                            id="cv-upload"
                          />

                          {cvFile ? (
                            <div className="flex items-center justify-center gap-3">
                              <FileText className="w-8 h-8 text-green-500" />
                              <div className="text-left">
                                <p className="font-medium text-[var(--dark)]">
                                  {cvFile.name}
                                </p>
                                <p className="text-sm text-[var(--gray-500)]">
                                  {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={removeCvFile}
                                className="ml-4 p-2 rounded-full hover:bg-red-100 transition-colors"
                              >
                                <X className="w-5 h-5 text-red-500" />
                              </button>
                            </div>
                          ) : (
                            <label
                              htmlFor="cv-upload"
                              className="cursor-pointer block"
                            >
                              <Upload className="w-12 h-12 mx-auto mb-4 text-[var(--gray-400)]" />
                              <p className="text-[var(--gray-600)] mb-2">
                                {t("dragDrop")}
                              </p>
                              <p className="text-sm text-[var(--gray-500)]">
                                {t("maxSize")}
                              </p>
                            </label>
                          )}
                        </div>
                        {cvError && (
                          <p className="mt-2 text-sm text-red-500">{cvError}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Review */}
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
                          {t("step3")}
                        </h2>
                        <p className="text-[var(--gray-600)]">{t("step3Desc")}</p>
                      </div>

                      <div className="space-y-4 bg-[var(--gray-50)] rounded-xl p-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-[var(--gray-500)]">
                              {t("firstName")}
                            </p>
                            <p className="font-medium text-[var(--dark)]">
                              {watch("firstName")}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-[var(--gray-500)]">
                              {t("lastName")}
                            </p>
                            <p className="font-medium text-[var(--dark)]">
                              {watch("lastName")}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-[var(--gray-500)]">
                              {t("email")}
                            </p>
                            <p className="font-medium text-[var(--dark)]">
                              {watch("email")}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-[var(--gray-500)]">
                              {t("phone")}
                            </p>
                            <p className="font-medium text-[var(--dark)]">
                              {watch("countryCode")} {watch("phone")}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-[var(--gray-500)]">
                              {t("language")}
                            </p>
                            <p className="font-medium text-[var(--dark)]">
                              {watch("language") === "nl"
                                ? t("languageDutch")
                                : t("languageFrench")}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-[var(--gray-500)]">CV</p>
                            <p className="font-medium text-[var(--dark)]">
                              {cvFile ? cvFile.name : t("noCv")}
                            </p>
                          </div>
                        </div>
                      </div>

                      {submitError && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                          <p className="text-sm text-red-600">{submitError}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-[var(--gray-100)]">
                  {step > 1 ? (
                    <Button type="button" variant="ghost" onClick={prevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t("previous")}
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < totalSteps ? (
                    <Button type="button" variant="primary" onClick={nextStep}>
                      {t("next")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
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
                          {t("submitting")}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          {t("submit")}
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
