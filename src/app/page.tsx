"use client";

import Head from "next/head";
import styles from "./styles/main.module.css";
import ProjectSection from "./pages/ProjectSection";
import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaArrowUp } from "react-icons/fa";
import WorkSection from "./pages/WorkSection";
import AboutMeSection from "./pages/AboutMeSection";
import ContactSection from "./pages/ContactSection";
import TestimonialSection from "./pages/TestimonalSection";
import Image from "next/image";

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
   const [showBackToTop, setShowBackToTop] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

   useEffect(() => {
     const handleScroll = () => {
       const bottomThreshold =
         document.documentElement.scrollHeight - window.innerHeight - 100; // Adjust threshold
       setShowBackToTop(window.scrollY >= bottomThreshold);
     };

     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   // Scroll to the top function
   const scrollToTop = () => {
     window.scrollTo({ top: 0, behavior: "smooth" });
   };

  return (
    <div
      className={`${styles.container} ${isDarkTheme ? styles.darkTheme : ""}`}
    >
      <Head>
        <title>Tekalegn Mekonen Portfolio</title>
        <meta
          name="description"
          content="Welcome to Tekalegn Mekonen's portfolio"
        />
      </Head>

      {/* Header Section */}
      <header className={styles.header}>
        <h1 className="text-4xl font-extrabold font-serif">
          Hi, I&apos;m <span>Tekalegn Mekonen</span>
        </h1>
      </header>

      {/* Theme Toggle Button - Top Right Corner */}
      <div className={styles.themeToggle} onClick={toggleTheme}>
        {/* Conditionally render the theme icons based on the active theme */}
        {!isDarkTheme ? (
          <div
            className={`${styles.circleButton} ${styles.activeButtonLight}`} // Apply light theme active button border
            style={{ backgroundColor: "#f8f8f9" }}
          >
            <FaSun color="#FDB813" size={20} />
          </div>
        ) : (
          <div
            className={`${styles.circleButton} ${styles.activeButtonDark}`} // Apply dark theme active button border
            style={{ backgroundColor: "#2d3748" }}
          >
            <FaMoon color="#fff" size={20} />
          </div>
        )}
      </div>

      {/* Card Section */}
      <div className={styles.cardWrapper}>
        {/* Main Card Box */}
        <div className={styles.card}>
          {/* Left Side: Text */}
          <div className={styles.leftSide}>
            <div className={styles.backgroundCube}></div>
            <div className={styles.textBox}>
              <h2 className={styles.title}>What I Do?</h2>
              <p className={styles.text}>
                I am an application and website developer
                <br />
                with experience working on diverse
                <br />
                projects, leveraging a solid foundation
                <br />
                in coding principles to deliver functional
                <br />
                and user-friendly solutions.
              </p>
            </div>
            {/* Resume Button */}
            <div className={styles.resumeButtonWrapper}>
              <a
                href="../../assets/Tekalegn_CV_Resume.pdf" // Place the resume file in the `public` folder
                download="Tekalegn_Mekonen_Resume.pdf"
                className={styles.resumeButton}
                aria-label="Download my resume"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className={styles.rightSide}>
            <Image
              src="/assets/photo.jpg" // Correct image path
              alt="Tekalegn Mekonen"
              className={styles.image}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <AboutMeSection isDarkTheme={isDarkTheme} />
      <WorkSection isDarkTheme={isDarkTheme} />
      <ProjectSection isDarkTheme={isDarkTheme} />
      <TestimonialSection isDarkTheme={isDarkTheme} />
      <ContactSection isDarkTheme={isDarkTheme} />
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          className={styles.backToTopButton}
          onClick={scrollToTop}
          title="Back to top" // Adds a tooltip on hover
          aria-label="Back to top" // Ensures accessibility for screen readers
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
