"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import styles from "../styles/WorkSection.module.css";
import { useState } from "react";
import {
  FaBuilding,
  FaGraduationCap,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const workExperiences = [
  {
    title: "Front End Developer - Intern",
    company: "Siinqee Bank",
    location: "Addis Ababa, Ethiopia",
    duration: "Jul 2022 - Sep 2022",
    description: [
      "Contributed to front-end development of an Issue Tracking system.",
      "Utilized HTML and CSS to create user-friendly interfaces.",
      "Focused on delivering a seamless user experience.",
      "Enhanced design consistency and functionality.",
      "Collaborated effectively to ensure project success.",
    ],
    technologies: ["Servlet", "JSP", "HTML", "CSS", "Bootstrap"],
  },
  {
    title: "System Engineer, Core Banking dep't",
    company: "Siinqee Bank",
    location: "Addis Ababa, Ethiopia",
    duration: "Sep 2023 - Nov 2023",
    description: [
      "Managed and maintained the Core Banking system, Oracle FLEXCUBE.",
      "Ensured smooth operation of critical financial infrastructure.",
      "Monitored performance to guarantee system reliability.",
      "Addressed technical issues promptly and efficiently.",
      "Specialized in sustaining essential banking functionalities.",
    ],
    technologies: ["Core Banking", "Oracle FLEXCUBE"],
  },
  {
    title: "Mobile Application and Website Developer(IT Officer Trainee)",
    company: "Amhara Bank",
    location: "Addis Ababa, Ethiopia",
    duration: "Nov 2023 - Jan 2025",
    description: [
      "Maintain and enhance the bank's mobile application.",
      "Fix bugs to ensure seamless functionality.",
      "Integrate various payment APIs for improved services.",
      "Manage new app releases to boost user experience.",
      "Develop mobile apps and dashboards for better management.",
    ],
    technologies: ["Servlet", "JSP", "HTML", "CSS", "Bootstrap"],
  },
  {
    title: "Junior Application Developer",
    company: "Amhara Bank",
    location: "Addis Ababa, Ethiopia",
    duration: "Jan 2025 - Present",
    description: [
      "Developed and maintained ABA Mobile Banking and Merchant apps for iOS and Android.",
      "Designed and maintained dashboards for ABA Mobile Banking and Merchant services.",
      "Integrated payment gateways, APIs, and local providers for seamless transactions.",
      "Enabled multiple payment methods: cards, wallets, bank transfers, and QR codes.",
      "Ensured compliance with banking regulations via tokenization and encryption.",
    ],
    technologies: ["Flutter", "Dart", "JavaScript", "React.js", "Material UI"],
  },
  {
    title: "Frontend Developer",
    company: "Heritage Conservation Associates",
    location: "Addis Ababa, Ethiopia",
    duration: "Nov 2025 - Present",
    description: [
      "Develop and maintain the company website for optimal performance, responsiveness, and user experience.",
      "Build and manage web applications to streamline processes and boost efficiency.",
      "Work with teams to gather requirements and deliver high-quality solutions.",
      "Optimize and update web apps to meet evolving business and tech needs.",
    ],
    technologies: ["TypeScript", "React.js", "Material UI"],
  },
];

const education = {
  institution: "Bule Hora University",
  degree: "BSc Information Technology",
  duration: "2019 - 2023",
};

interface WorkSectionProps {
  id?: string;
  isDarkTheme: boolean;
}

export default function WorkSection({ id, isDarkTheme }: WorkSectionProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section
      id={id}
      className={clsx(styles.workSection, { [styles.darkTheme]: isDarkTheme })}
    >
      <div className={styles.container}>
        {/* Work Experience Section */}
        <motion.div
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.sectionHeader}>
            <FaBuilding className={styles.sectionIcon} />
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Work Experience
            </motion.h2>
            <div className={styles.sectionLine} />
          </div>

          <div className={styles.experienceGrid}>
            {workExperiences.map((experience, index) => (
              <motion.div
                key={index}
                className={clsx(styles.experienceCard, {
                  [styles.expanded]: expandedCard === index,
                })}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                onClick={() => toggleExpand(index)}
                whileHover={{ y: -5 }}
              >
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.experienceTitle}>
                      {experience.title}
                    </h3>
                    <p className={styles.experienceCompany}>
                      {experience.company} • {experience.location}
                    </p>
                    <p className={styles.experienceDuration}>
                      {experience.duration}
                    </p>
                  </div>
                  <button
                    className={styles.expandButton}
                    aria-label={
                      expandedCard === index
                        ? "Collapse details"
                        : "Expand details"
                    }
                  >
                    {expandedCard === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                </div>

                <motion.div
                  className={styles.cardContent}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedCard === index ? "auto" : 0,
                    opacity: expandedCard === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className={styles.experienceDescription}>
                    {experience.description.map((desc, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: expandedCard === index ? 1 : 0,
                          x: expandedCard === index ? 0 : -10,
                        }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                      >
                        {desc}
                      </motion.li>
                    ))}
                  </ul>

                  {experience.technologies &&
                    experience.technologies.length > 0 && (
                      <motion.div
                        className={styles.technologies}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: expandedCard === index ? 1 : 0,
                          y: expandedCard === index ? 0 : 10,
                        }}
                        transition={{
                          duration: 0.2,
                          delay: experience.description.length * 0.05,
                        }}
                      >
                        <span className={styles.techLabel}>Technologies:</span>
                        <div className={styles.techTags}>
                          {experience.technologies.map((tech, techIdx) => (
                            <span key={techIdx} className={styles.techTag}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className={styles.sectionHeader}>
            <FaGraduationCap className={styles.sectionIcon} />
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Education
            </motion.h2>
            <div className={styles.sectionLine} />
          </div>

          <motion.div
            className={styles.educationCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className={styles.educationHeader}>
              <h3 className={styles.educationInstitution}>
                {education.institution}
              </h3>
              <p className={styles.educationDegree}>{education.degree}</p>
            </div>
            <div className={styles.educationDuration}>
              <span>{education.duration}</span>
            </div>
            <div className={styles.educationDecoration} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
