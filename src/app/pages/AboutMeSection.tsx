"use client";

import clsx from "clsx";
import styles from "../styles/AboutMeSection.module.css";
import {
  SiFlutter,
  SiDart,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiGit,
  SiTypescript,
  SiMaterialdesign,
} from "react-icons/si";
import { useRef, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, useInView } from "framer-motion";

// Define props type
interface AboutMeSectionProps {
  id?: string;
}

// Skill interface with proficiency data
interface Skill {
  icon: JSX.Element;
  name: string;
  percentage: number;
  years: string;
  category: "Mobile" | "Frontend" | "Backend" | "Tools";
  color: string;
}

export default function AboutMeSection({ id }: AboutMeSectionProps) {
  const { isDarkTheme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Skills data with proficiency levels - memoized to update when theme changes
  const skills: Skill[] = useMemo(
    () => [
      {
        icon: <SiFlutter size={24} color="#02569B" />,
        name: "Flutter",
        percentage: 90,
        years: "3+ years",
        category: "Mobile" as const,
        color: "#02569B",
      },
      {
        icon: <SiDart size={24} color="#0175C2" />,
        name: "Dart",
        percentage: 88,
        years: "3+ years",
        category: "Mobile" as const,
        color: "#0175C2",
      },
      {
        icon: <SiJavascript size={24} color="#F7DF1E" />,
        name: "JavaScript",
        percentage: 85,
        years: "4+ years",
        category: "Frontend" as const,
        color: "#F7DF1E",
      },
      {
        icon: <SiReact size={24} color="#61DAFB" />,
        name: "React",
        percentage: 86,
        years: "3+ years",
        category: "Frontend" as const,
        color: "#61DAFB",
      },
      {
        icon: (
          <SiNextdotjs size={24} color={isDarkTheme ? "#FFFFFF" : "#000000"} />
        ),
        name: "Next.js",
        percentage: 80,
        years: "2+ years",
        category: "Frontend" as const,
        color: isDarkTheme ? "#FFFFFF" : "#000000",
      },
      {
        icon: <SiTypescript size={24} color="#3178C6" />,
        name: "TypeScript",
        percentage: 85,
        years: "2+ years",
        category: "Frontend" as const,
        color: "#3178C6",
      },
      {
        icon: <SiMaterialdesign size={24} color="#02569B" />,
        name: "Material Design",
        percentage: 85,
        years: "3+ years",
        category: "Frontend" as const,
        color: "#02569B",
      },
      {
        icon: <SiGit size={24} color="#E34F26" />,
        name: "Git",
        percentage: 88,
        years: "4+ years",
        category: "Tools" as const,
        color: "#E34F26",
      },
    ],
    [isDarkTheme]
  );

  // Group skills by category
  const skillsByCategory = useMemo(
    () => ({
      Mobile: skills.filter((s) => s.category === "Mobile"),
      Frontend: skills.filter((s) => s.category === "Frontend"),
      Tools: skills.filter((s) => s.category === "Tools"),
    }),
    [skills]
  );

  return (
    <div
      id={id}
      ref={sectionRef}
      className={clsx(styles.card2, { [styles.darkTheme]: isDarkTheme })}
    >
      {/* Left Side: "More About Me" */}
      <div className={styles.leftSide2}>
        <h2 className={clsx(styles.titleMore)}>More About Me</h2>
        <p className={clsx(styles.textMore, "font-serif")}>
          I&apos;m a passionate Mobile and Web Developer with over 3 years of
          <br />
          professional experience, currently serving as a Junior Application
          <br />
          Developer at Amhara Bank. I specialize in building cross-platform
          <br />
          mobile applications using Flutter and Dart, as well as modern web
          <br />
          applications with React, Next.js, and TypeScript.
          <br />
          <br />
          My journey began with a BSc in Information Technology from Bule Hora
          <br />
          University, and I&apos;ve since worked on critical banking systems,
          <br />
          including mobile banking apps, internet banking platforms, and
          <br />
          merchant solutions. I have extensive experience integrating payment
          <br />
          gateways, third-party APIs, and building secure, compliant financial
          <br />
          applications that handle millions of transactions.
          <br />
          <br />
          Beyond banking, I&apos;ve developed diverse solutions including real
          estate
          <br />
          platforms, healthcare management systems, and heritage conservation
          <br />
          websites. I&apos;m passionate about clean architecture, user
          experience,
          <br />
          and writing maintainable, scalable code that makes a real impact.
        </p>
      </div>
      <div className="dividerLine"></div>
      {/* Right Side: "TOP EXPERTISE" with Progress Bars */}
      <div className={styles.rightSide2}>
        <h2 className={clsx(styles.titleTop, "font-serif")}>TOP EXPERTISE</h2>
        <div className={styles.skillsContainer}>
          {Object.entries(skillsByCategory).map(
            ([category, categorySkills]) => (
              <div key={category} className={styles.skillCategory}>
                <h3
                  className={clsx(styles.categoryTitle, {
                    [styles.darkTheme]: isDarkTheme,
                  })}
                >
                  {category}
                </h3>
                <div className={styles.progressBarsContainer}>
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className={styles.skillProgressItem}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className={styles.skillHeader}>
                        <div className={styles.skillNameContainer}>
                          {skill.icon}
                          <span
                            className={clsx(styles.skillName, {
                              [styles.darkTheme]: isDarkTheme,
                            })}
                          >
                            {skill.name}
                          </span>
                        </div>
                        <div className={styles.skillInfo}>
                          <span
                            className={clsx(styles.skillPercentage, {
                              [styles.darkTheme]: isDarkTheme,
                            })}
                          >
                            {skill.percentage}%
                          </span>
                          <div className={styles.tooltip}>
                            <span className={styles.tooltipText}>
                              {skill.years} of experience
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.progressBarContainer}>
                        <motion.div
                          className={styles.progressBar}
                          style={{
                            backgroundColor: isDarkTheme
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <motion.div
                            className={styles.progressBarFill}
                            style={{
                              backgroundColor: skill.color,
                            }}
                            initial={{ width: 0 }}
                            animate={
                              isInView
                                ? { width: `${skill.percentage}%` }
                                : { width: 0 }
                            }
                            transition={{
                              delay: index * 0.1 + 0.2,
                              duration: 1,
                              ease: "easeOut",
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
