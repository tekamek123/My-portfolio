"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "../styles/TestimonialSection.module.css";

interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  imageSrc: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Mekite Desta",
    role: "Full-Stack Developer",
    feedback:
      "Tekalegn is a dedicated professional with exceptional problem-solving skills and a proactive attitude. His disciplined approach to work, combined with a natural curiosity, enables him to quickly adapt to new challenges and deliver high-quality results. His positive energy and commitment to excellence make him a pleasure to work with.",
    imageSrc: "../../assets/makite.jpeg",
  },
  {
    name: "Fidel Alemayehu",
    role: "Software Developer",
    feedback:
      "Tekalegn's technical expertise and passion for continuous learning are truly remarkable. He has an impressive ability to break down complex problems into manageable solutions, and his attention to detail ensures the reliability of his work. His eagerness to embrace innovative tools and technologies sets him apart as a forward-thinking developer.",
    imageSrc: "../../assets/fidel.jpg",
  },
  {
    name: "Tinsae Tadese",
    role: "Software Engineer",
    feedback:
      "Tekalegn is a dynamic individual with a keen eye for detail and a strong work ethic. His ability to manage multiple projects simultaneously while maintaining a high standard of quality is commendable. Tekalegn is not only a skilled developer but also a team player who fosters collaboration and innovation in every task he undertakes.",
    imageSrc: "../../assets/tinsae.jpeg",
  },
  {
    name: "Dagmawi Engdawerk",
    role: "Backend Developer",
    feedback:
      "Working with Tekalegn is an inspiring experience. His deep technical knowledge, combined with his willingness to learn and improve, makes him a valuable asset to any team. He approaches every task with professionalism and delivers solutions that are both practical and impactful. His dedication to growth is reflected in the excellence of his work.",
    imageSrc: "../../assets/dagi.jpeg",
  },
];

interface TestimonialSectionProps {
  isDarkTheme: boolean;
}

export default function TestimonialSection({
  isDarkTheme,
}: TestimonialSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 375) {
        setIsAutoSliding(false);
      } else {
        setIsAutoSliding(true);
      }
    };

    // Check on mount
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoSliding) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoSliding]);

  return (
    <div
      className={clsx(styles.testimonialSection, {
        [styles.darkTheme]: isDarkTheme,
      })}
    >
      <h2 className="font-serif">Testimonials</h2>
      <div
        className={styles.testimonialCards}
        style={{ "--current-index": currentIndex } as React.CSSProperties}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={testimonial.imageSrc}
                alt={testimonial.name}
                className={styles.circleImage}
              />
            </div>
            <div className={styles.textContent}>
              <h3 className={styles.name}>{testimonial.name}</h3>
              <p className={styles.role}>{testimonial.role}</p>
              <p className={styles.feedback}>{testimonial.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
