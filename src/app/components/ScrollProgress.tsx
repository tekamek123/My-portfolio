"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/ScrollProgress.module.css";
import { useTheme } from "../context/ThemeContext";

export default function ScrollProgress() {
  const { isDarkTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const totalScrollableHeight = documentHeight - windowHeight;
      const currentScroll = scrollTop;

      const progress =
        totalScrollableHeight > 0
          ? (currentScroll / totalScrollableHeight) * 100
          : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    // Calculate on mount
    calculateScrollProgress();

    // Update on scroll
    window.addEventListener("scroll", calculateScrollProgress);
    window.addEventListener("resize", calculateScrollProgress);

    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
      window.removeEventListener("resize", calculateScrollProgress);
    };
  }, []);

  return (
    <div className={styles.scrollProgressContainer}>
      <motion.div
        className={`${styles.scrollProgressBar} ${
          isDarkTheme ? styles.darkTheme : ""
        }`}
        style={{
          width: `${scrollProgress}%`,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </div>
  );
}
