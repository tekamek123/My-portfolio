"use client";

import { useEffect, useState } from "react";
import styles from "../styles/SkipToContent.module.css";

export default function SkipToContent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show skip link when Tab is pressed (first keyboard interaction)
      if (event.key === "Tab" && !isVisible) {
        setIsVisible(true);
      }
    };

    // Hide skip link when clicking outside
    const handleClick = () => {
      setIsVisible(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [isVisible]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById("home");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
      // Hide after navigation
      setTimeout(() => setIsVisible(false), 100);
    }
  };

  if (!isVisible) return null;

  return (
    <a
      href="#home"
      onClick={handleClick}
      className={styles.skipLink}
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}
