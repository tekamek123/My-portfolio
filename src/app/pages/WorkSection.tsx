"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import styles from "../styles/WorkSection.module.css";
import { div } from "framer-motion/client";

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
    technologies: ["Servlet", "JSP", "HTML", "CSS", "Bootstrap"], // Added this line
  },
  {
    title: "System Engineer, Core Banking dep’t",
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
    technologies: ["Core Banking", "Oracle FLEXCUBE"], // No languages for this role (or add if applicable)
  },
  {
    title: "IT Officer Trainee(Application and Website Developer)",
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

export default function WorkSection({id, isDarkTheme }: WorkSectionProps) {
  return (
    <div id={id} className={clsx(styles.card3, { [styles.darkTheme]: isDarkTheme })}>
      {/* Work Experience Section */}
      <div className={styles.workExperience}>
        <h2 className={clsx(styles.title, "font-serif")}>Work Experience</h2>
        <div className={styles.workExperienceGrid}>
          {workExperiences.map((experience, index) => (
            <motion.div
              key={index}
              className={styles.experienceCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className={styles.experienceTitle}>{experience.title}</h3>
              <p className={styles.experienceCompany}>
                {experience.company} - {experience.location}
              </p>
              <p className={styles.experienceDuration}>{experience.duration}</p>
              <ul className={styles.experienceDescription}>
                {experience.description.map(
                  (desc, idx) =>
                    desc && <li key={idx}>{desc}</li> 
                )}
              </ul>
              {/* Add this section for technologies */}
              {experience.technologies &&
                experience.technologies.length > 0 && (
                  <div className={styles.technologies}>
                    <strong>Technologies: </strong>
                    {experience.technologies.join(", ")}
                  </div>
                )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className={styles.educationCard}>
        <h2 className={clsx(styles.title, "font-serif")}>Education</h2>
        <div className={styles.educationDetails}>
          <p className={styles.educationInstitution}>
            <strong>{education.institution}</strong>
          </p>
          <p className={styles.educationDegree}>{education.degree}</p>
          <p className={styles.educationDuration}>{education.duration}</p>
        </div>
      </div>
    </div>
  );
}
