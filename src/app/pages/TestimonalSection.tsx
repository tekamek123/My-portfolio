"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "../styles/TestimonialSection.module.css";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaPause,
  FaPlay,
} from "react-icons/fa";

interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  imageSrc: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Aschale Tikuye",
    role: "Senior Software Developer and MIS Team Leader",
    feedback:
      "Tekalegn is a highly skilled and driven professional with a strong focus on delivering exceptional results. His expertise in mobile and web development, combined with a keen eye for detail and adaptability, ensures the successful execution of complex projects. His disciplined work ethic and collaborative approach make him an invaluable team player and a trusted contributor.",
    imageSrc: "/assets/Asche.jpg",
  },
  {
    name: "Mekite Desta",
    role: "Full-Stack Developer",
    feedback:
      "Tekalegn is a dedicated professional with exceptional problem-solving skills and a proactive attitude. His disciplined approach to work, combined with a natural curiosity, enables him to quickly adapt to new challenges and deliver high-quality results. His positive energy and commitment to excellence make him a pleasure to work with.",
    imageSrc: "/assets/makite.jpeg",
  },
  {
    name: "Fidel Alemayehu",
    role: "Software Developer",
    feedback:
      "Tekalegn's technical expertise and passion for continuous learning are truly remarkable. He has an impressive ability to break down complex problems into manageable solutions, and his attention to detail ensures the reliability of his work. His eagerness to embrace innovative tools and technologies sets him apart as a forward-thinking developer.",
    imageSrc: "/assets/fidel.jpg",
  },
  {
    name: "Tinsae Tadese",
    role: "Software Engineer",
    feedback:
      "Tekalegn is a dynamic individual with a keen eye for detail and a strong work ethic. His ability to manage multiple projects simultaneously while maintaining a high standard of quality is commendable. Tekalegn is not only a skilled developer but also a team player who fosters collaboration and innovation in every task he undertakes.",
    imageSrc: "/assets/tinsae.jpeg",
  },
  {
    name: "Dagmawi Engdawerk",
    role: "Backend Developer",
    feedback:
      "Working with Tekalegn is an inspiring experience. His deep technical knowledge, combined with his willingness to learn and improve, makes him a valuable asset to any team. He approaches every task with professionalism and delivers solutions that are both practical and impactful. His dedication to growth is reflected in the excellence of his work.",
    imageSrc: "/assets/dagi.jpeg",
  },
];

interface TestimonialSectionProps {
  id?: string;
}

export default function TestimonialSection({ id }: TestimonialSectionProps) {
  const { isDarkTheme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate items per slide based on screen size
  const getItemsPerSlide = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoSliding || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoSliding, isPaused, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const toggleAutoSlide = () => {
    setIsAutoSliding(!isAutoSliding);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerSlide,
    (currentIndex + 1) * itemsPerSlide
  );

  return (
    <section
      id={id}
      className={clsx(styles.testimonialSection, {
        [styles.darkTheme]: isDarkTheme,
      })}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            What People Say
          </motion.h2>
          <motion.p
            className={styles.sectionSubtitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Testimonials from colleagues and collaborators
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className={styles.carouselContainer} ref={containerRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className={styles.testimonialCards}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  className={styles.card}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className={styles.quoteIcon}>
                    <FaQuoteLeft />
                  </div>
                  <div className={styles.imageWrapper}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Image
                        src={testimonial.imageSrc}
                        alt={testimonial.name}
                        width={120}
                        height={120}
                        className={styles.circleImage}
                        style={{ objectFit: "cover" }}
                      />
                    </motion.div>
                  </div>
                  <div className={styles.textContent}>
                    <p className={styles.feedback}>{testimonial.feedback}</p>
                    <div className={styles.authorInfo}>
                      <h3 className={styles.name}>{testimonial.name}</h3>
                      <p className={styles.role}>{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            className={styles.navButton}
            onClick={goToPrevious}
            aria-label="Previous testimonials"
          >
            <FaChevronLeft />
          </button>
          <button
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={goToNext}
            aria-label="Next testimonials"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className={styles.dotsContainer}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={clsx(styles.dot, {
                [styles.dotActive]: index === currentIndex,
              })}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button
            className={styles.controlButton}
            onClick={toggleAutoSlide}
            aria-label={isAutoSliding ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoSliding ? <FaPause /> : <FaPlay />}
            <span>{isAutoSliding ? "Pause" : "Play"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
