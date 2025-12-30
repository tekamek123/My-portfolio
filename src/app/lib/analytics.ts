// Analytics utility for tracking user interactions

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

// Google Analytics 4 Measurement ID
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// Check if analytics should be enabled
export const isAnalyticsEnabled = () => {
  return (
    typeof window !== "undefined" &&
    GA_MEASUREMENT_ID &&
    process.env.NODE_ENV === "production"
  );
};

// Initialize Google Analytics
export const initGA = () => {
  if (!isAnalyticsEnabled()) {
    return;
  }

  // Load Google Analytics script
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date().toISOString());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const trackPageView = (url: string) => {
  if (!isAnalyticsEnabled() || !window.gtag) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!isAnalyticsEnabled() || !window.gtag) {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent(
    "click",
    "button",
    `${buttonName}${location ? ` - ${location}` : ""}`
  );
};

// Track link clicks
export const trackLinkClick = (linkUrl: string, linkText?: string) => {
  trackEvent("click", "link", linkText || linkUrl, undefined);
};

// Track downloads
export const trackDownload = (fileName: string, fileType?: string) => {
  trackEvent(
    "download",
    "file",
    `${fileName}${fileType ? ` (${fileType})` : ""}`
  );
};

// Track form submissions
export const trackFormSubmit = (formName: string, success: boolean = true) => {
  trackEvent(
    success ? "form_submit" : "form_error",
    "form",
    formName,
    success ? 1 : 0
  );
};

// Track section views (when user scrolls to a section)
export const trackSectionView = (sectionName: string) => {
  trackEvent("view", "section", sectionName);
};

// Track project views
export const trackProjectView = (projectName: string) => {
  trackEvent("view", "project", projectName);
};

// Track GitHub interactions
export const trackGitHubClick = (action: string, repoName?: string) => {
  trackEvent("click", "github", repoName ? `${action} - ${repoName}` : action);
};

// Track social media clicks
export const trackSocialClick = (platform: string) => {
  trackEvent("click", "social", platform);
};

// Track theme toggle
export const trackThemeToggle = (theme: "light" | "dark") => {
  trackEvent("toggle", "theme", theme);
};

// Track search (if you add search functionality)
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  trackEvent("search", "site", searchTerm, resultsCount);
};

// Track time on page
export const trackTimeOnPage = (pageName: string, seconds: number) => {
  trackEvent("time_on_page", "engagement", pageName, seconds);
};
