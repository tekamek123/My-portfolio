"use client";

import clsx from "clsx";
import styles from "../styles/ContactSection.module.css";
import {
  FaTelegramPlane,
  FaFacebook,
  FaGithub,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";

interface ContactSectionProps {
  id?: string;
  isDarkTheme: boolean;
}

export default function ContactSection({id, isDarkTheme }: ContactSectionProps) {
  return (
    <div id={id} className={clsx(styles.card5, { [styles.darkTheme]: isDarkTheme })}>
      {/* Centered Title */}
      <h2 className="font-serif">Contact</h2>

      <div className={styles.content}>
        {/* Profile Section */}
        <div className={styles.profileSection}>
          <img
            src="../../../assets/photo4.png"
            alt="Profile Picture"
            className={styles.profilePicture}
          />
          <div className={styles.profileDetails}>
            <p className={clsx(styles.name, "font-extrabold font-serif")}>
              Tekalegn Mekonen
            </p>
            <p className={clsx(styles.title, "font-serif")}>
              Mobile App & Web Developer
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Contact Section */}
        <div className={clsx(styles.contactSection, "font-serif")}>
          <p>Connect with me through the following platforms:</p>
          <div className={styles.contactIcons}>
            <a
              href="https://t.me/sco321"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              title="Visit my Telegram profile"
              className={styles.telegram}
            >
              <FaTelegramPlane size={40} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100006147289146"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Visit my Facebook profile"
              className={styles.facebook}
            >
              <FaFacebook size={40} />
            </a>
            <a
              href="https://github.com/tekamek123"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="Visit my GitHub profile"
              className={styles.github}
            >
              <FaGithub size={40} />
            </a>
            <a
              href="mailto:tekamek25@gmail.com"
              aria-label="Email"
              title="Send me an email"
              className={styles.email}
            >
              <FaEnvelope size={40} />
            </a>
            <a
              href="www.linkedin.com/in/tekalegn-mekonen-456b662a7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="Connect with me on LinkedIn"
              className={styles.linkedin}
            >
              <FaLinkedin size={40} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
