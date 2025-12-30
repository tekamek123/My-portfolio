"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import styles from "../styles/CertificatesSection.module.css";
import {
  FaCertificate,
  FaAward,
  FaDownload,
  FaExpand,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

const certificates = [
  {
    title: "Amhara Bank Appreciation Letter",
    type: "recognition",
    date: "2024",
    description:
      "Awarded for outstanding contributions to mobile banking development",
    file: "/assets/img304.pdf",
    thumbnail: "/assets/AmharaBank_recognition_thumbnail.jpg",
  },
  {
    title: "Flutter & Dart-The Complete Guide[2024 Edition]",
    type: "certificate",
    date: "2024",
    description: "Certified in Advanced Mobile App Development Technologies",
    file: "/assets/FlutterCertificate.pdf",
    thumbnail: "/assets/FlutterCertificate_thumbnail.jpg",
  },
];

interface CertificatesSectionProps {
  id?: string;
}

export default function CertificatesSection({ id }: CertificatesSectionProps) {
  const { isDarkTheme } = useTheme();
  const [expandedView, setExpandedView] = useState<string | null>(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const openExpandedView = (file: string) => {
    setExpandedView(file);
    document.body.style.overflow = "hidden";
  };

  const closeExpandedView = () => {
    setExpandedView(null);
    document.body.style.overflow = "auto";
  };

  const toggleShowAllCertificates = () => {
    setShowAllCertificates(!showAllCertificates);
  };

  // Keyboard navigation for expanded view
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && expandedView) {
        closeExpandedView();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedView]);

  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, 2);

  const shouldShowToggle = certificates.length > 2;

  return (
    <section
      id={id}
      className={clsx(styles.certificatesSection, {
        [styles.darkTheme]: isDarkTheme,
      })}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.headerContent}>
            <motion.div
              className={styles.headerIcon}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FaCertificate className={styles.certificateIcon} />
              <FaAward className={styles.awardIcon} />
            </motion.div>
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Certificates & Recognition
            </motion.h2>
          </div>
          <motion.p
            className={styles.sectionSubtitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            My professional achievements and certifications
          </motion.p>
        </motion.div>

        <div className={styles.certificatesGrid}>
          {displayedCertificates.map((cert, index) => (
            <motion.div
              key={index}
              className={clsx(styles.certificateCard, {
                [styles.portrait]: cert.type === "recognition",
                [styles.landscape]: cert.type === "certificate",
              })}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: Math.floor(index / 2) * 0.15 + (index % 2) * 0.05,
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.certificateType}>
                  {cert.type === "recognition" ? (
                    <FaAward />
                  ) : (
                    <FaCertificate />
                  )}
                  <span>
                    {cert.type === "recognition"
                      ? "Recognition"
                      : "Certificate"}
                  </span>
                </div>
                <span className={styles.certificateDate}>{cert.date}</span>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.certificateTitle}>{cert.title}</h3>
                <p className={styles.certificateDescription}>
                  {cert.description}
                </p>

                <div
                  className={styles.certificatePreview}
                  onClick={() => openExpandedView(cert.file)}
                >
                  <Image
                    src={cert.thumbnail}
                    alt={`${cert.title} preview`}
                    width={400}
                    height={300}
                    className={styles.previewImage}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <div className={styles.previewOverlay}>
                    <FaExpand className={styles.expandIcon} />
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <a
                  href={cert.file}
                  download
                  className={styles.downloadButton}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaDownload /> Download PDF
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {shouldShowToggle && (
          <motion.div
            className={styles.viewAllContainer}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <button
              onClick={toggleShowAllCertificates}
              className={clsx(styles.viewAllButton, {
                [styles.darkTheme]: isDarkTheme,
              })}
            >
              {showAllCertificates ? (
                <>
                  <FaChevronUp /> Show Less
                </>
              ) : (
                <>
                  <FaChevronDown /> View All ({certificates.length})
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {expandedView && (
          <motion.div
            className={styles.expandedOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeExpandedView}
          >
            <motion.div
              className={styles.expandedContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={closeExpandedView}
                aria-label="Close expanded view"
              >
                <FaTimes />
              </button>

              <iframe
                src={expandedView}
                className={styles.pdfViewer}
                title="Certificate PDF Viewer"
              />

              <a
                href={expandedView}
                download
                className={styles.downloadButtonLarge}
              >
                <FaDownload /> Download Certificate
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
