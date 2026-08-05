"use client";

import { FaArrowUp } from "react-icons/fa";
import styles from "./styles/main.module.css";
import ProjectSection from "./pages/ProjectSection";
import { useState, useEffect } from "react";
import WorkSection from "./pages/WorkSection";
import AboutMeSection from "./pages/AboutMeSection";
import ContactSection from "./pages/ContactSection";
import TestimonialSection from "./pages/TestimonalSection";
import Header from "./components/Header";
import HeroSection from "./pages/HeroSection";
import CertificatesSection from "./pages/CertificatesSection";
import GitHubSection from "./pages/GitHubSection";
import InstallPrompt from "./components/InstallPrompt";
import SkipToContent from "./components/SkipToContent";
import ScrollProgress from "./components/ScrollProgress";
import { useTheme } from "./context/ThemeContext";

export default function Home() {
  const { isDarkTheme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottomThreshold =
        document.documentElement.scrollHeight - window.innerHeight - 100;
      setShowBackToTop(window.scrollY >= bottomThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`${styles.container} ${isDarkTheme ? styles.darkTheme : ""}`}
      style={{ paddingTop: "80px" }}
    >
      <ScrollProgress />
      <SkipToContent />
      <Header />

      <HeroSection />
      <AboutMeSection id="about" />
      <WorkSection id="work" />
      <ProjectSection id="projects" />
      <CertificatesSection id="certificates" />
      <GitHubSection id="github" />
      <TestimonialSection id="testimonials" />
      <ContactSection id="contact" />
      <InstallPrompt />
      {showBackToTop && (
        <button
          className={styles.backToTopButton}
          onClick={scrollToTop}
          title="Back to top"
          aria-label="Back to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
