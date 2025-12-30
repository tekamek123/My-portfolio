import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <ThemeProvider>{children}</ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
