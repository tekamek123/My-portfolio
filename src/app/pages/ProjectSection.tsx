"use client";

import clsx from "clsx";
import styles from "../styles/ProjectSection.module.css";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  FaEye,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaGithub,
  FaExternalLinkAlt,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import { trackProjectView, trackLinkClick } from "../lib/analytics";

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
    name: "OAB Real Estate Fractional Ownership Platform",
    description: [
      "Built a modern real estate fractional ownership and investment platform that democratizes property investment. The platform enables users to buy shares of properties instead of purchasing entire properties, making real estate investment accessible to a broader audience. Users can discover properties, acquire ownership shares, track their portfolio performance, and earn returns from rental income and property appreciation.",
      "Key features include property discovery with search and filtering, comprehensive property details with financial summaries and ROI, interactive Google Maps integration, portfolio management with real-time analytics and visual charts (donut charts, line charts), property listing wizard with multi-step process, transaction history tracking, user dashboard with profile, wallet, and bank account management, two-factor authentication (SMS, Email, Authenticator app), real-time chat/messaging functionality, property-specific Q&A system, and email subscription management. Built with React 18.2, TypeScript 5.2, Vite 4.4, Material-UI 7.1, TanStack React Query 5.90, Recharts for data visualization, Google Maps API for location services, and React Hook Form for form management. The platform features optimistic UI updates, lazy loading, and a feature-based architecture for optimal performance.",
    ],
    images: [
      "/assets/OAB_Home.png",
      "/assets/OAB_Buy.png",
      "/assets/OAB_Portfolio.png",
    ],
    tags: ["React", "TypeScript", "Material UI", "Real Estate", "Google Maps"],
  },
  {
    name: "Amhara Bank Internet Banking",
    description: [
      "Developed a comprehensive Internet Banking Platform for Amhara Bank providing secure online banking services for both Individual and Corporate customers. The system enables users to perform various banking operations including fund transfers, bill payments, transaction management, and account services through a modern web interface.",
      "Key features include individual banking with fund transfers (own account, beneficiary, other banks, wallets, RTGS), utility payments, airtime top-up, bank statements, and card services. Corporate banking features bulk transfers with Excel upload support, transaction management with maker-checker approval workflow, role-based access control (Maker, Checker, Auditor, Admin), and comprehensive reporting. Built with Next.js 14, React 18, TypeScript, Material-UI v5, TanStack Query for state management, Formik with Yup validation, and ExcelJS for bulk operations. The platform includes multi-factor authentication (OTP, QR code, mobile banking verification), real-time transaction status via WebSocket, and export capabilities (CSV, Excel, PDF) for all transaction data.",
    ],
    images: [
      "/assets/IB_Home.png",
      "/assets/IB_Login.png",
      "/assets/IB_IPS.png",
    ],
    tags: ["Next.js", "React", "TypeScript", "Material UI", "Banking"],
  },
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
    name: "EHR Management System",
    description: [
      "Developed a comprehensive Electronic Health Records (EHR) management system for healthcare organizations to manage client records, appointments, billing, goals, tasks, and administrative workflows. The system provides a centralized platform for healthcare providers to track patient information, manage care plans, handle billing operations, and coordinate team activities.",
      "Key features include complete client management with profiles, medical history, and documents; appointment scheduling with FullCalendar integration; goals and tasks management with priorities and due dates; comprehensive billing and insurance management with claim processing; document management with PDF viewer and versioning; internal messaging system with thread-based conversations; activity logging and reporting; role-based access control (RBAC); and AI assistant integration. Built with React 18.3, TypeScript 5.7, Material-UI 5.16, TanStack Query for state management, React Hook Form with Zod validation, and Syncfusion for advanced components. The platform uses a component-based architecture with custom hooks, lazy loading, and error boundaries for optimal performance and maintainability.",
    ],
    images: ["/assets/ehrHome.png", "/assets/ehrLogin.png"],
    tags: [
      "React",
      "TypeScript",
      "Material UI",
      "Healthcare",
      "TanStack Query",
    ],
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
  // {
  //   name: "ABa Lottery Web App",
  //   description: [
  //     "A scalable web app for managing lottery operations—importing tickets, selecting and announcing winners, and generating detailed reports for admins and analysts.",
  //     "Built with React.js, offering a user-friendly interface and smooth data management using modern web practices.",
  //   ],
  //   images: ["/assets/Lottery_Home.png", "/assets/Lottery_Login.png"],
  //   tags: ["React", "JavaScript", "Lottery System"],
  // },
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
    name: "HCA Website",
    description: [
      "Professional web platform for heritage preservation projects in Ethiopia with 3D exploration. Web platform for Heritage Conservation Associates (HCA) to promote, document, and showcase heritage preservation projects across Ethiopia.",
      "Key features include an interactive homepage with a full-screen video highlighting the organization's mission, a projects section showcasing ongoing and completed conservation efforts, and a 3D heritage exploration tool. This tool allows users to navigate an interactive map and view detailed 3D models of heritage buildings, such as the Photogrammetry Documentation of Eight Heritage Buildings in Addis Ababa. The platform is fully responsive across devices, providing an immersive experience that connects the public, researchers, and conservationists with Ethiopia's cultural heritage through modern web technology.",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  // Extract all unique tags from projects
  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags || []))
  ).sort();

  // Filter projects based on search query and selected tags
  const filteredProjects = projects.filter((project) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.some((desc) =>
        desc.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      project.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Tag filter
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => project.tags?.includes(tag));

    return matchesSearch && matchesTags;
  });

  const displayedProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  // Toggle tag filter
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

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

  const showNextImage = useCallback(() => {
    if (currentProject) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === currentProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  }, [currentProject]);

  const showPreviousImage = useCallback(() => {
    if (currentProject) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? currentProject.images.length - 1 : prevIndex - 1
      );
    }
  }, [currentProject]);

  const openModal = (project: Project) => {
    setModalContent(project);
    document.body.style.overflow = "hidden";
    trackProjectView(project.name);
  };

  const closeModal = () => {
    setModalContent(null);
    document.body.style.overflow = "auto";
  };

  // Keyboard navigation handlers
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key to close modals/fullscreen
      if (event.key === "Escape") {
        if (isFullscreen) {
          closeFullscreen();
        } else if (modalContent) {
          closeModal();
        }
      }

      // Arrow keys for fullscreen image navigation
      if (isFullscreen && currentProject) {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNextImage();
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPreviousImage();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isFullscreen,
    modalContent,
    currentProject,
    showNextImage,
    showPreviousImage,
  ]);

  // Focus trap for modals
  useEffect(() => {
    if (modalContent && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      // Focus first element when modal opens
      firstElement?.focus();

      document.addEventListener("keydown", handleTabKey);

      return () => {
        document.removeEventListener("keydown", handleTabKey);
      };
    }
  }, [modalContent]);

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

      {/* Search and Filter Section */}
      <div className={styles.filtersContainer}>
        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search projects by name, description, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={clsx(styles.searchInput, {
              [styles.darkTheme]: isDarkTheme,
            })}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Filter Tags */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersHeader}>
            <FaFilter className={styles.filterIcon} />
            <span
              className={clsx(styles.filtersLabel, {
                [styles.darkTheme]: isDarkTheme,
              })}
            >
              Filter by Technology:
            </span>
            {(searchQuery || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className={styles.clearFiltersButton}
              >
                Clear All
              </button>
            )}
          </div>
          <div className={styles.filterChips}>
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <motion.button
                  key={tag}
                  className={clsx(styles.filterChip, {
                    [styles.filterChipActive]: isSelected,
                    [styles.darkTheme]: isDarkTheme,
                  })}
                  onClick={() => toggleTag(tag)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {tag}
                  {isSelected && <span className={styles.checkmark}>✓</span>}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className={styles.resultsInfo}>
          <span
            className={clsx(styles.resultsCount, {
              [styles.darkTheme]: isDarkTheme,
            })}
          >
            Showing {filteredProjects.length} of {projects.length} projects
            {selectedTags.length > 0 &&
              ` (${selectedTags.length} filter${
                selectedTags.length > 1 ? "s" : ""
              } active)`}
          </span>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className={styles.noResults}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.noResultsContent}
          >
            <p
              className={clsx(styles.noResultsText, {
                [styles.darkTheme]: isDarkTheme,
              })}
            >
              No projects found matching your search criteria.
            </p>
            <button
              onClick={clearFilters}
              className={styles.clearFiltersButton}
            >
              Clear Filters
            </button>
          </motion.div>
        </div>
      ) : (
        <>
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
            {filteredProjects.length > 3 && (
              <button className={styles.viewAllButton} onClick={toggleShowAll}>
                {showAllProjects
                  ? "Show Less"
                  : `View All ${filteredProjects.length} Projects`}
              </button>
            )}
          </motion.div>
        </>
      )}

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
                      onClick={() =>
                        trackLinkClick(
                          modalContent.github!,
                          `GitHub - ${modalContent.name}`
                        )
                      }
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
                      onClick={() =>
                        trackLinkClick(
                          modalContent.deployment!,
                          `Live Site - ${modalContent.name}`
                        )
                      }
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
