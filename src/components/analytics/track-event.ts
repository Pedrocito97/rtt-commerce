type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
};

/**
 * Track a custom event in Google Analytics 4
 * @param eventName - The name of the event (e.g., 'begin_application')
 * @param parameters - Additional parameters to send with the event
 */
export function trackEvent(eventName: string, parameters?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    // GA not loaded yet or running on server
    return;
  }

  window.gtag("event", eventName, parameters);
}

/**
 * Track application form events
 */
export const ApplicationEvents = {
  beginApplication: () => {
    trackEvent("begin_application", {
      page_location: typeof window !== "undefined" ? window.location.href : "",
    });
  },

  step1Complete: () => {
    trackEvent("application_step_1_complete");
  },

  step2Complete: (hasCv: boolean) => {
    trackEvent("application_step_2_complete", {
      has_cv: hasCv,
    });
  },

  submitted: (language: string, hasCv: boolean) => {
    trackEvent("application_submitted", {
      language,
      has_cv: hasCv,
    });
  },

  error: (errorType: string) => {
    trackEvent("application_error", {
      error_type: errorType,
    });
  },
};

/**
 * Track job listing events
 */
export const JobListingEvents = {
  viewJobListing: () => {
    trackEvent("view_job_listing");
  },

  search: (searchTerm: string) => {
    trackEvent("job_search", {
      search_term: searchTerm,
    });
  },

  filter: (department: string) => {
    trackEvent("job_filter", {
      department,
    });
  },

  expandJob: (jobTitle: string) => {
    trackEvent("job_card_expand", {
      job_title: jobTitle,
    });
  },

  applyClick: (jobTitle: string) => {
    trackEvent("job_apply_click", {
      job_title: jobTitle,
    });
  },
};

/**
 * Track CTA click events
 */
export const CTAEvents = {
  click: (location: string, text: string) => {
    trackEvent("cta_click", {
      cta_location: location,
      cta_text: text,
    });
  },

  navigationClick: (destination: string) => {
    trackEvent("navigation_click", {
      destination,
    });
  },
};
