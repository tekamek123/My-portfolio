"use client";

import clsx from "clsx";
import styles from "../styles/AboutMeSection.module.css";
import {
  SiFlutter,
  SiDart,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiBootstrap,
  SiGit
} from "react-icons/si";

// Define props type
interface AboutMeSectionProps {
  isDarkTheme: boolean;
}

export default function AboutMeSection({ isDarkTheme }: AboutMeSectionProps) {
  return (
    <div className={clsx(styles.card2, { [styles.darkTheme]: isDarkTheme })}>
      {/* Left Side: "More About Me" */}
      <div className={styles.leftSide2}>
        <h2 className={clsx(styles.titleMore, "font-serif")}>More About Me</h2>
        <p className={clsx(styles.textMore, "font-serif")}>
          A developer specializing in mobile applications (Android and iOS)
          <br />
          and front-end web projects. I’m passionate about tackling challenging,
          <br />
          innovative projects with a talented team. My expertise spans
          third-party
          <br />
          integrations, payment systems, payment gateways, and building
          intuitive dashboards.
          <br />
          My focus is on creating high-quality, scalable applications,
          <br />
          with a strong emphasis on leveraging serverless technologies to
          enhance
          <br />
          performance and efficiency.
        </p>
      </div>
      <div className="dividerLine"></div>
      {/* Right Side: "TOP EXPERTISE" */}
      <div className={styles.rightSide2}>
        <h2 className={clsx(styles.titleTop, "font-serif")}>TOP EXPERTISE</h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skill}>
            <SiFlutter size={33} color="#02569B" /> Flutter
          </div>
          <div className={styles.skill}>
            <SiDart size={33} color="#0175C2" /> Dart
          </div>
          <div className={styles.skill}>
            <SiJavascript size={33} color="#F7DF1E" /> JavaScript
          </div>
          <div className={styles.skill}>
            <SiReact size={33} color="#61DAFB" /> React
          </div>
          <div className={styles.skill}>
            <SiNextdotjs size={33} color="#000000" /> Next.js
          </div>
          <div className={styles.skill}>
            <SiHtml5 size={33} color="#E34F26" /> HTML5
          </div>
          <div className={styles.skill}>
            <SiBootstrap size={33} color="#563D7C" /> Bootstrap
          </div>
          <div className={styles.skill}>
            <SiGit size={33} color="#E34F26" /> Git
          </div>
        </div>
      </div>
    </div>
  );
}
