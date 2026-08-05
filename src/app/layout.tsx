import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
import Analytics from "./components/Analytics";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tekalegn Mekonen - Mobile App & Web Developer Portfolio",
    template: "%s | Tekalegn Mekonen",
  },
  description:
    "Portfolio of Tekalegn Mekonen - Experienced Mobile App and Web Developer specializing in Flutter, React, Next.js, and modern web technologies. View my projects, work experience, and certifications.",
  keywords: [
    "Tekalegn Mekonen",
    "Mobile App Developer",
    "Web Developer",
    "Flutter Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "Software Engineer",
    "Ethiopia",
    "Full Stack Developer",
  ],
  authors: [{ name: "Tekalegn Mekonen" }],
  creator: "Tekalegn Mekonen",
  publisher: "Tekalegn Mekonen",
  metadataBase: new URL("https://tekalegn-portfolio.vercel.app"), // Update with your actual domain
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tekalegn-portfolio.vercel.app", // Update with your actual domain
    title: "Tekalegn Mekonen - Mobile App & Web Developer",
    description:
      "Experienced Mobile App and Web Developer specializing in Flutter, React, Next.js, and modern web technologies.",
    siteName: "Tekalegn Mekonen Portfolio",
    images: [
      {
        url: "/assets/photo4.png",
        width: 1200,
        height: 630,
        alt: "Tekalegn Mekonen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tekalegn Mekonen - Mobile App & Web Developer",
    description:
      "Experienced Mobile App and Web Developer specializing in Flutter, React, Next.js, and modern web technologies.",
    images: ["/assets/photo4.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tekalegn Portfolio",
  },
  other: {
    "theme-color": "#6366f1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <link rel="apple-touch-icon" href="/assets/photo4.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tekalegn Mekonen",
              jobTitle: "Mobile Application & Web Developer",
              worksFor: {
                "@type": "Organization",
                name: "Amhara Bank",
              },
              url: "https://tekalegn-portfolio.vercel.app",
              sameAs: [
                "https://github.com/tekamek123",
                "https://www.linkedin.com/in/tekalegn-mekonen-456b662a7",
                "https://t.me/sco321",
              ],
              knowsAbout: [
                "Flutter",
                "Dart",
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Mobile Development",
                "Web Development",
                "Clean Architecture",
                "Material UI",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ErrorBoundary>
          <ThemeProvider>
            <ToastProvider>
              <Analytics />
              {children}
              <ServiceWorkerRegistration />
            </ToastProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
