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
  SiGit,
  SiTypescript,
  SiMaterialdesign
} from "react-icons/si";
import { useState, useEffect, useRef } from "react";

// Define props type
interface AboutMeSectionProps {
  isDarkTheme: boolean;
}

export default function AboutMeSection({ isDarkTheme }: AboutMeSectionProps) {
  const [visibleSkills, setVisibleSkills] = useState<boolean[]>(
    Array(8).fill(false)
  );
  const sectionRef = useRef<HTMLDivElement>(null); // Ref for the section

  // Apply staggered animations for skills when the section is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section is in the viewport, trigger animations
            const timers = visibleSkills.map(
              (_, index) =>
                setTimeout(() => {
                  setVisibleSkills((prev) => {
                    const newVisibleSkills = [...prev];
                    newVisibleSkills[index] = true;
                    return newVisibleSkills;
                  });
                }, index * 300) // 300ms delay between each skill
            );

            // Cleanup timers if the component unmounts
            return () => timers.forEach((timer) => clearTimeout(timer));
          } else {
            // Section is out of the viewport, reset animations
            setVisibleSkills(Array(8).fill(false));
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Observe the section
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Cleanup observer
      }
    };
  }, [visibleSkills]);

  return (
    <div
      ref={sectionRef} // Attach the ref to the section
      className={clsx(styles.card2, { [styles.darkTheme]: isDarkTheme })}
    >
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
          {[
            { icon: <SiFlutter size={33} color="#02569B" />, text: "Flutter" },
            { icon: <SiDart size={33} color="#0175C2" />, text: "Dart" },
            {
              icon: <SiJavascript size={33} color="#F7DF1E" />,
              text: "JavaScript",
            },
            { icon: <SiReact size={33} color="#61DAFB" />, text: "React" },
            {
              icon: <SiNextdotjs size={33} color="#000000" />,
              text: "Next.js",
            },
            {
              icon: <SiMaterialdesign size={33} color="#02569B" />,
              text: "Material Design",
            },
            {
              icon: <SiTypescript size={33} color="#02569B" />,
              text: "TypeScript",
            },
            { icon: <SiGit size={33} color="#E34F26" />, text: "Git" },
          ].map((skill, index) => (
            <div
              key={index}
              className={`${styles.skill} ${
                !visibleSkills[index] ? styles.hidden : styles.slideInLeft
              }`}
            >
              {skill.icon} {skill.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
