"use client";

import clsx from "clsx";
import styles from "../styles/ProjectSection.module.css";
import { useState, useRef, useEffect } from "react";
import {
  FaEye,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

type Project = {
  name: string;
  description: string[];
  images: string[];
  tags?: string[];
  github?: string;
  deployment?: string;
};

const projects: Project[] = [
  {
    name: "Amhara Bank Mobile Banking",
    description: [
      "Contributed to the development of a secure and user-friendly mobile banking app for Amhara Bank customers. Key features include real-time account access, fund transfers, bill payments, biometric login, and two-factor authentication.",
      "Built with Flutter and Dart, following Clean Architecture for scalability and maintainability. Used the BLoC pattern for efficient state management and a clear separation of concerns.",
    ],
    images: ["/assets/ABM_Home.png", "/assets/ABM_Login.png"],
    tags: ["Flutter", "Dart", "Clean Architecture", "BLoC"],
    deployment:
      "https://play.google.com/store/apps/details?id=com.amharabank.Aba_mobile_banking",
  },
  {
    name: "Survey Collection System",
    description: [
      "Developed a dynamic Survey Collection System that lets users create custom forms, collect data, and generate analytical reports with charts, graphs, and Excel exports.",
      "Built with React.js and JavaScript, the app includes PWA features for offline access, fast loading, and reliable performance in low or no network conditions.",
    ],
    images: ["/assets/Survey_Home.png", "/assets/Survey_Login.png"],
    tags: ["React", "JavaScript", "PWA", "Offline-first"],
    github: "https://github.com/tekamek123/dyn_survey_pwa",
  },
  {
    name: "ABa Merchant Dashboard",
    description: [
      "A full-featured system for merchants to manage single or multi-branch businesses, including branches, managers, cashiers, products, and transactions.",
      "Built with React.js and JavaScript using a component-based architecture, delivering a dynamic, responsive UI with smooth client-side rendering and modern best practices.",
    ],
    images: ["/assets/Merchant_Home.png", "/assets/Merchant_Login.png"],
    tags: ["React", "JavaScript", "Dashboard", "Responsive"],
    deployment: "https://merchantportal.amharabank.com.et/",
  },
  {
    name: "ABa Merchant App",
    description: [
      "A cashier-focused app enabling dynamic QR code generation, real-time transaction tracking, and refund requests. Features include secure QR codes, live payment gateway integration, robust authentication, real-time notifications, and a dashboard with search/filter tools—built for scalability, usability, and security.",
      "Built with Flutter and Dart using Clean Architecture for modularity and BLoC for predictable, testable state management.",
    ],
    images: ["/assets/MerchantApp_Home.png", "/assets/MerchantApp_Login.png"],
    tags: ["Flutter", "Dart", "QR Payments", "Clean Architecture"],
  },
  {
    name: "ABa Lottery Web App",
    description: [
      "A scalable web app for managing lottery operations—importing tickets, selecting and announcing winners, and generating detailed reports for admins and analysts.",
      "Built with React.js, offering a user-friendly interface and smooth data management using modern web practices.",
    ],
    images: ["/assets/Lottery_Home.png", "/assets/Lottery_Login.png"],
    tags: ["React", "JavaScript", "Lottery System"],
  },
  {
    name: "Youth Suicide Prevention Contest Website",
    description: [
      "A responsive website created to raise awareness and support youth mental health. It offers educational resources, warning sign guidance, and interactive contests for creative self-expression.",
      "Key Features: Suicide prevention info, mental health workshops, contest submission & showcase, clean and accessible design",
    ],
    images: ["/assets/sucide1.png", "/assets/sucide2.png"],
    tags: ["React", "CSS", "Mental Health"],
    deployment: "https://goodseed.me/",
  },
  {
    name: "EHR Management System",
    description: [
      "Contributed as a frontend developer to a modern EHR Management System, creating responsive and accessible user interfaces using React.js, TypeScript, and Material UI to improve patient data and workflow management for healthcare providers.",
      "key features including a secure authentication system with login, password visibility toggle, reset, and company registration—all fully validated and responsive. I built an interactive dashboard displaying real-time appointments, client goals, task priorities, and alerts. I also created searchable and filterable client and messaging interfaces to enhance communication between healthcare professionals and clients. Additionally, I designed a modular sidebar for easy navigation across modules such as Clients, Appointments, Goals, Reports, and Billing. Using Material UI’s theming system, I ensured a consistent, modern, and responsive UI throughout the platform. This frontend work significantly improved healthcare operations by streamlining data access, communication, and patient engagement within a scalable architecture.",
    ],
    images: ["/assets/ehrHome.png", "/assets/ehrLogin.png"],
    tags: ["React", "TypeScript", "Material UI", "Healthcare"],
  },
  {
    name: "HCA Website",
    description: [
      "Professional web platform for heritage preservation projects in Ethiopia with 3D exploration. web platform for Heritage Conservation Associates (HCA) to promote, document, and showcase heritage preservation projects across Ethiopia.",
      "key features including an interactive homepage with a full-screen video highlighting the organization’s mission, a projects section showcasing ongoing and completed conservation efforts, and a 3D heritage exploration tool. This tool allows users to navigate an interactive map and view detailed 3D models of heritage buildings, such as the “Photogrammetry Documentation of Eight Heritage Buildings in Addis Ababa.” The platform is fully responsive across devices, providing an immersive experience that connects the public, researchers, and conservationists with Ethiopia’s cultural heritage through modern web technology.",
    ],
    images: ["/assets/hcaHome.png", "/assets/hcaHome2.png"],
    tags: ["React", "3D Integration", "Cultural Heritage"],
    github: "https://github.com/tekamek123/hca_website",
    deployment: "https://www.hcaethiopia.org/",
  },
];

interface ProjectSectionProps {
  id?: string;
}

export default function ProjectSection({ id }: ProjectSectionProps) {
  const { isDarkTheme } = useTheme();
  const [modalContent, setModalContent] = useState<Project | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

  const openFullscreen = (project: Project, index: number) => {
    setCurrentProject(project);
    setCurrentImageIndex(index);
    setIsFullscreen(true);
    document.body.style.overflow = "hidden";
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setCurrentProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "auto";
  };

  const showNextImage = () => {
    if (currentProject) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === currentProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const showPreviousImage = () => {
    if (currentProject) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? currentProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  const openModal = (project: Project) => {
    setModalContent(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalContent(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (modalContent) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalContent]);

  const toggleShowAll = () => {
    setShowAllProjects(!showAllProjects);
  };

  return (
    <section
      id={id}
      className={clsx(styles.projectsSection, {
        [styles.darkTheme]: isDarkTheme,
      })}
    >
      <div className={styles.sectionHeader}>
        <motion.h2
          className={clsx(styles.sectionTitle, "font-serif")}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          className={styles.sectionSubtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          A selection of my recent work
        </motion.p>
      </div>

      <div className={styles.projectsGrid}>
        {displayedProjects.map((project, projectIndex) => (
          <motion.div
            key={projectIndex}
            className={styles.projectCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: projectIndex * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            onHoverStart={() => setHoveredProject(projectIndex)}
            onHoverEnd={() => setHoveredProject(null)}
          >
            <div className={styles.cardHeader}>
              <div className={styles.projectImageContainer}>
                {project.images.map((image, imgIndex) => (
                  <div key={imgIndex} className={styles.imageWrapper}>
                    <motion.div
                      initial={{ opacity: imgIndex === 0 ? 1 : 0 }}
                      animate={{
                        opacity:
                          hoveredProject === projectIndex && imgIndex === 1
                            ? 1
                            : imgIndex === 0
                            ? 1
                            : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className={styles.projectImage}
                    >
                      <Image
                        src={image}
                        alt={`${project.name} Screenshot ${imgIndex + 1}`}
                        width={600}
                        height={400}
                        className={styles.projectImage}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </motion.div>
                  </div>
                ))}
                <button
                  className={styles.expandButton}
                  onClick={() => openFullscreen(project, 0)}
                  aria-label="Expand image"
                >
                  <FaExpand />
                </button>
              </div>
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.projectTitle}>{project.name}</h3>

              <div className={styles.tagsContainer}>
                {project.tags?.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <p className={styles.projectExcerpt}>
                {project.description[0].split(" ").slice(0, 20).join(" ")}
                {project.description[0].split(" ").length > 20 ? "..." : ""}
              </p>
            </div>

            <div className={styles.cardFooter}>
              <button
                className={styles.viewButton}
                onClick={() => openModal(project)}
              >
                <FaEye /> View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.viewAllContainer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <button className={styles.viewAllButton} onClick={toggleShowAll}>
          {showAllProjects ? "Show Less" : "View All Projects"}
        </button>
      </motion.div>

      <AnimatePresence>
        {modalContent && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modalContainer}
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className={styles.modalHeader}>
                <h3>{modalContent.name}</h3>
                <button
                  className={styles.modalCloseButton}
                  onClick={closeModal}
                  aria-label="Close modal"
                >
                  <FaTimes />
                </button>
              </div>

              <div className={styles.modalImageGallery}>
                {modalContent.images.map((image, index) => (
                  <div key={index} className={styles.modalImageWrapper}>
                    <Image
                      src={image}
                      alt={`${modalContent.name} Screenshot ${index + 1}`}
                      width={800}
                      height={600}
                      className={styles.modalImage}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <button
                      className={styles.modalExpandButton}
                      onClick={() => {
                        closeModal();
                        openFullscreen(modalContent, index);
                      }}
                    >
                      <FaExpand />
                    </button>
                  </div>
                ))}
              </div>

              <div className={styles.modalContent}>
                {modalContent.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {(modalContent.github || modalContent.deployment) && (
                <div className={styles.projectLinks}>
                  {modalContent.github && (
                    <a
                      href={modalContent.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <FaGithub /> View on GitHub
                    </a>
                  )}
                  {modalContent.deployment && (
                    <a
                      href={modalContent.deployment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <FaExternalLinkAlt /> Visit Live Site
                    </a>
                  )}
                </div>
              )}

              {modalContent.tags && (
                <div className={styles.modalTags}>
                  {modalContent.tags.map((tag, index) => (
                    <span key={index} className={styles.modalTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {isFullscreen && currentProject && (
          <motion.div
            className={styles.fullscreenOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className={styles.fullscreenCloseButton}
              onClick={closeFullscreen}
              aria-label="Close fullscreen"
            >
              <FaTimes />
            </button>

            <button
              className={styles.fullscreenNavButton}
              style={{ left: "2%" }}
              onClick={showPreviousImage}
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>

            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.fullscreenImage}
            >
              <Image
                src={currentProject.images[currentImageIndex]}
                alt={`${currentProject.name} Screenshot ${
                  currentImageIndex + 1
                }`}
                width={1920}
                height={1080}
                className={styles.fullscreenImage}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                priority
              />
            </motion.div>

            <button
              className={styles.fullscreenNavButton}
              style={{ right: "2%" }}
              onClick={showNextImage}
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>

            <div className={styles.fullscreenCounter}>
              {currentImageIndex + 1} / {currentProject.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
