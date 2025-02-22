"use client";

import clsx from "clsx";
import styles from "../styles/ProjectSection.module.css";
import { useState } from "react";
import { FaEye, FaExpand } from "react-icons/fa";

type Project = {
  name: string;
  description: string[];
  images: string[];
};

const projects: Project[] = [
  {
    name: "Amhara Bank Mobile Banking Application",
    description: [
      "I actively participated in the development and enhancement of the ABa Mobile Banking app, a secure and user-friendly platform designed for Amhara Bank customers. The ABA Mobile Banking app is a secure and user-friendly application that allows customers of Amhara Bank (ABa) to manage their finances in real-time, providing convenient access to account information, fund transfers, bill payments, and more, with features like two-factor authentication and biometric login for added security.",
      "This project was developed using Flutter and Dart, following the principles of Clean Architecture to ensure a modular, scalable, and maintainable codebase. The implementation leveraged the BLoC (Business Logic Component) state management pattern, providing a robust framework for managing application state, ensuring seamless user interactions, and maintaining a clear separation of concerns across the application's layers.",
    ],
    images: ["../../assets/ABM_Home.png", "../../assets/ABM_Login.png"],
  },
  {
    name: "Survey Collection System",
    description: [
      "The Survey Collection System is a comprehensive solution that enables users to dynamically create customizable survey forms. It efficiently collects data based on user-defined configurations and generates detailed analytical outputs, including charts, graphs, and Excel reports.",
      "This project was developed using React.js and JavaScript, incorporating Progressive Web App (PWA) features to ensure usability even in offline conditions. By implementing PWA principles, the application delivers a seamless user experience with offline capabilities, fast loading times, and enhanced reliability, making it accessible and functional regardless of network availability.",
    ],
    images: ["../../assets/Survey_Home.png", "../../assets/Survey_Login.png"],
  },
  {
    name: "ABa Merchant Dashboard",
    description: [
      "A comprehensive system tailored for merchants managing single or multi-branch businesses. It includes features for efficiently overseeing branches, managers, cashiers, products, and transactions.",
      "This project was developed using React.js and JavaScript, leveraging modern web development practices to deliver a dynamic, interactive, and responsive user experience. The implementation highlights efficient component-based architecture and seamless client-side rendering for optimal performance.",
    ],
    images: [
      "../../assets/Merchant_Home.png",
      "../../assets/Merchant_Login.png",
    ],
  },
  {
    name: "ABa Merchant App",
    description: [
      "This app is designed to streamline payment processes for cashiers by enabling the generation of dynamic QR codes, real-time transaction monitoring, and refund requests.Key features include secure, standard-compliant dynamic QR code generation tied to specific transaction details, a dashboard for tracking transaction statuses with search and filter options, and a refund management system that allows cashiers to initiate and monitor refund requests. The app integrates seamlessly with backend payment gateways for live transaction updates, employs robust authentication for security, and delivers real-time notifications for key events. By prioritizing usability, scalability, and maintainability, this project provides an efficient and secure solution tailored for cashier operations.",
      "Built with Flutter and Dart, it follows Clean Architecture principles to ensure modularity and maintainability, with BLoC (Business Logic Component) employed for state management to achieve predictable and testable workflows.",
    ],
    images: [
      "../../assets/MerchantApp_Home.png",
      "../../assets/MerchantApp_Login.png",
    ],
  },
  {
    name: "ABa Lottery Web App",
    description: [
      "The ABA Lottery web app is a comprehensive platform designed to manage lottery operations efficiently. It enables importing lottery ticket numbers from various sources, selecting a winning ticket, registering it in the database, and announcing the winning number. Additionally, it supports generating detailed reports for administrative and analytical purposes. The system is designed for scalability, ensuring it can handle large volumes of ticket data, while providing robust functionalities for ticket tracking, report generation, and announcement management.",
      "Built with React, the app leverages modern web development practices to deliver a user-friendly interface and ensure seamless data management.",
    ],
    images: ["../../assets/Lottery_Home.png", "../../assets/Lottery_Login.png"],
  },
];

interface ProjectSectionProps {
  isDarkTheme: boolean;
}

export default function ProjectSection({ isDarkTheme }: ProjectSectionProps) {
  const [modalContent, setModalContent] = useState<Project | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const openFullscreen = (project: Project, index: number) => {
    setCurrentProject(project);
    setCurrentImageIndex(index); // Set the clicked image index
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setCurrentProject(null);
    setCurrentImageIndex(0);
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
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className={clsx(styles.card4, { [styles.darkTheme]: isDarkTheme })}>
      {isFullscreen && currentProject && (
        <div className={styles.fullscreenOverlay}>
          <div className={styles.fullscreenContent}>
            <button className={styles.closeButton} onClick={closeFullscreen}>
              &times;
            </button>
            <button className={styles.prevButton} onClick={showPreviousImage}>
              &larr;
            </button>
            <img
              src={currentProject.images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className={styles.fullscreenImage}
            />
            <button className={styles.nextButton} onClick={showNextImage}>
              &rarr;
            </button>
          </div>
        </div>
      )}
      <h2 className={clsx(styles.title, "font-serif")}>Some of my Projects</h2>
      <div className={styles.projectGrid}>
        {projects.map((project, projectIndex) => (
          <div key={projectIndex} className={styles.projectCard}>
            {/* Eye Icon */}
            <div className={styles.eyeIcon}>
              <a  rel="noopener noreferrer">
                <FaEye size={20} />
              </a>
            </div>

            {/* Image Container */}
            <div className={styles.imageContainer}>
              {project.images.map((image, imgIndex) => (
                <div key={imgIndex} className={styles.imageWrapper}>
                  <div className={styles.imageContainer}>
                    <img
                      src={project.images[0]}
                      alt={`${project.name} First View`}
                      className={clsx(styles.projectImage, styles.firstImage)}
                    />
                    <img
                      src={project.images[1]}
                      alt={`${project.name} Second View`}
                      className={clsx(styles.projectImage, styles.secondImage)}
                    />
                  </div>

                  {imgIndex === 0 && (
                    <div
                      className={styles.expandIcon}
                      onClick={() => openFullscreen(project, 0)} // Use the first image index
                    >
                      <FaExpand size={18} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Project Details */}
            <h3 className={clsx(styles.projectName, "font-serif")}>
              {project.name}
            </h3>
            <p className={styles.projectDescription}>
              {project.description
                .join(" ")
                .split(" ")
                .slice(0, 30)
                .join(" ")
                .concat(
                  project.description.join(" ").split(" ").length > 30
                    ? "..."
                    : ""
                )}{" "}
              <span
                className={styles.seeMore}
                onClick={() => openModal(project)}
              >
                See More
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalContent && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{modalContent.name}</h3>
              <button className={styles.modalCloseButton} onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalDescription}>
              {modalContent.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p> // Directly render each string as a paragraph
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
