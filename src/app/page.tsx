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
import { useTheme } from "./context/ThemeContext";

export default function Home() {
  const { isDarkTheme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  // const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  // const [isCubeVisible, setIsCubeVisible] = useState(false);
  // const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);
  // const [isImageVisible, setIsImageVisible] = useState(false);

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

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setIsHeaderVisible(false);
  //           setIsCubeVisible(false);
  //           setIsTextBoxVisible(false);
  //           setIsImageVisible(false);

  //           const headerTimer = setTimeout(() => {
  //             setIsHeaderVisible(true);
  //           }, 500);

  //           const cubeTimer = setTimeout(() => {
  //             setIsCubeVisible(true);
  //           }, 1000);

  //           const textBoxTimer = setTimeout(() => {
  //             setIsTextBoxVisible(true);
  //           }, 1500);

  //           const imageTimer = setTimeout(() => {
  //             setIsImageVisible(true);
  //           }, 2000);

  //           return () => {
  //             clearTimeout(headerTimer);
  //             clearTimeout(cubeTimer);
  //             clearTimeout(textBoxTimer);
  //             clearTimeout(imageTimer);
  //           };
  //         }
  //       });
  //     },
  //     { threshold: 0.1 }
  //   );

  //   const headerElement = document.querySelector(`.${styles.header}`);
  //   if (headerElement) {
  //     observer.observe(headerElement);
  //   }

  //   return () => {
  //     if (headerElement) {
  //       observer.unobserve(headerElement);
  //     }
  //   };
  // }, []);

  return (
    <div
      className={`${styles.container} ${isDarkTheme ? styles.darkTheme : ""}`}
      style={{ paddingTop: "80px" }}
    >
      <Header />

      <HeroSection />
      <AboutMeSection id="about" />
      <WorkSection id="work" />
      <ProjectSection id="projects" />
      <CertificatesSection id="certificates" />
      <GitHubSection id="github" />
      <TestimonialSection id="testimonials" />
      <ContactSection id="contact" />
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
