"use client";

import {  FaArrowUp } from "react-icons/fa";
import Head from "next/head";
import styles from "./styles/main.module.css";
import ProjectSection from "./pages/ProjectSection";
import { useState, useEffect } from "react";
import WorkSection from "./pages/WorkSection";
import AboutMeSection from "./pages/AboutMeSection";
import ContactSection from "./pages/ContactSection";
import TestimonialSection from "./pages/TestimonalSection";
import Header from "./components/Header";
import Image from "next/image";
import HeroSection from "./pages/HeroSection";

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isCubeVisible, setIsCubeVisible] = useState(false);
  const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(false);
            setIsCubeVisible(false);
            setIsTextBoxVisible(false);
            setIsImageVisible(false);

            const headerTimer = setTimeout(() => {
              setIsHeaderVisible(true);
            }, 500);

            const cubeTimer = setTimeout(() => {
              setIsCubeVisible(true);
            }, 1000);

            const textBoxTimer = setTimeout(() => {
              setIsTextBoxVisible(true);
            }, 1500);

            const imageTimer = setTimeout(() => {
              setIsImageVisible(true);
            }, 2000);

            return () => {
              clearTimeout(headerTimer);
              clearTimeout(cubeTimer);
              clearTimeout(textBoxTimer);
              clearTimeout(imageTimer);
            };
          }
        });
      },
      { threshold: 0.1 }
    );

    const headerElement = document.querySelector(`.${styles.header}`);
    if (headerElement) {
      observer.observe(headerElement);
    }

    return () => {
      if (headerElement) {
        observer.unobserve(headerElement);
      }
    };
  }, []);

  return (
    <div
      className={`${styles.container} ${isDarkTheme ? styles.darkTheme : ""}`}
      style={{ paddingTop: "80px" }}
    >
      <Head>
        <title>Tekalegn Mekonen Portfolio</title>
        <meta
          name="description"
          content="Welcome to Tekalegn Mekonen's portfolio"
        />
      </Head>
      <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />

      <HeroSection/>
      <AboutMeSection id="about" isDarkTheme={isDarkTheme} />
      <WorkSection id="work" isDarkTheme={isDarkTheme} />
      <ProjectSection id="projects" isDarkTheme={isDarkTheme} />
      <TestimonialSection id="testimonials" isDarkTheme={isDarkTheme} />
      <ContactSection id="contact" isDarkTheme={isDarkTheme} />
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
