"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

type ConsentStatus = "granted" | "denied";

interface ConsentState {
  ad_storage: ConsentStatus;
  ad_user_data: ConsentStatus;
  ad_personalization: ConsentStatus;
  analytics_storage: ConsentStatus;
}

const CONSENT_COOKIE_NAME = "rtt_cookie_consent";

// Initialize consent state with denied (GDPR compliant default)
const defaultConsent: ConsentState = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};

// Update Google's consent state
function updateGoogleConsent(consent: ConsentState) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", consent as unknown as Record<string, unknown>);
  }
}

// Save consent to localStorage
function saveConsent(consent: ConsentState) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(consent));
  }
}

// Load consent from localStorage
function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem(CONSENT_COOKIE_NAME);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
}

export default function CookieConsent() {
  const t = useTranslations("cookies");
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);

  // Check for existing consent on mount
  useEffect(() => {
    const savedConsent = loadConsent();
    if (savedConsent) {
      setConsent(savedConsent);
      updateGoogleConsent(savedConsent);
      setShowBanner(false);
    } else {
      // No consent yet, show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent: ConsentState = {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    };
    setConsent(fullConsent);
    saveConsent(fullConsent);
    updateGoogleConsent(fullConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    saveConsent(defaultConsent);
    updateGoogleConsent(defaultConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    saveConsent(consent);
    updateGoogleConsent(consent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const toggleConsent = (key: keyof ConsentState) => {
    setConsent((prev) => ({
      ...prev,
      [key]: prev[key] === "granted" ? "denied" : "granted",
    }));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-[var(--gray-100)] overflow-hidden">
            {!showSettings ? (
              // Main banner
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary-blue)]/10 flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-6 h-6 text-[var(--primary-blue)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--dark)] mb-2">
                      {t("title")}
                    </h3>
                    <p className="text-[var(--gray-600)] text-sm mb-4">
                      {t("description")}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleAcceptAll}
                      >
                        {t("acceptAll")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRejectAll}
                      >
                        {t("rejectAll")}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSettings(true)}
                        className="text-[var(--gray-500)]"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        {t("customize")}
                      </Button>
                    </div>
                  </div>
                  <button
                    onClick={handleRejectAll}
                    className="p-2 hover:bg-[var(--gray-100)] rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-[var(--gray-400)]" />
                  </button>
                </div>
              </div>
            ) : (
              // Settings panel
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[var(--dark)]">
                    {t("settingsTitle")}
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-[var(--gray-100)] rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-[var(--gray-400)]" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Essential cookies - always on */}
                  <div className="flex items-center justify-between p-4 bg-[var(--gray-50)] rounded-xl">
                    <div>
                      <h4 className="font-medium text-[var(--dark)]">
                        {t("essential")}
                      </h4>
                      <p className="text-sm text-[var(--gray-500)]">
                        {t("essentialDesc")}
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      {t("alwaysOn")}
                    </div>
                  </div>

                  {/* Analytics cookies */}
                  <div className="flex items-center justify-between p-4 bg-[var(--gray-50)] rounded-xl">
                    <div>
                      <h4 className="font-medium text-[var(--dark)]">
                        {t("analytics")}
                      </h4>
                      <p className="text-sm text-[var(--gray-500)]">
                        {t("analyticsDesc")}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleConsent("analytics_storage")}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        consent.analytics_storage === "granted"
                          ? "bg-[var(--primary-blue)]"
                          : "bg-[var(--gray-300)]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          consent.analytics_storage === "granted"
                            ? "translate-x-7"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Marketing cookies */}
                  <div className="flex items-center justify-between p-4 bg-[var(--gray-50)] rounded-xl">
                    <div>
                      <h4 className="font-medium text-[var(--dark)]">
                        {t("marketing")}
                      </h4>
                      <p className="text-sm text-[var(--gray-500)]">
                        {t("marketingDesc")}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newStatus =
                          consent.ad_storage === "granted" ? "denied" : "granted";
                        setConsent((prev) => ({
                          ...prev,
                          ad_storage: newStatus,
                          ad_user_data: newStatus,
                          ad_personalization: newStatus,
                        }));
                      }}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        consent.ad_storage === "granted"
                          ? "bg-[var(--primary-blue)]"
                          : "bg-[var(--gray-300)]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          consent.ad_storage === "granted"
                            ? "translate-x-7"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSavePreferences}
                    className="flex-1"
                  >
                    {t("savePreferences")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAcceptAll}
                    className="flex-1"
                  >
                    {t("acceptAll")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
