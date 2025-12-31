"use client";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  trackButtonClick,
  trackThemeToggle,
  trackDownload,
} from "../lib/analytics";

const Header = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
      // Track navigation click
      trackButtonClick(`Navigate to ${sectionId}`, "header");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Detect which section is currently in view
      const sections = [
        "home",
        "about",
        "work",
        "projects",
        "certificates",
        "github",
        "testimonials",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for mobile menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key to close mobile menu
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Set initial active section
  useEffect(() => {
    const homeElement = document.getElementById("home");
    if (homeElement) {
      const rect = homeElement.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        setActiveSection("home");
      }
    }
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const headerStyles = {
    dark: {
      bg: "bg-[#101a23]",
      bgScrolled: "bg-[#101a23]/90 backdrop-blur-sm",
      border: "border-b-[#223649]",
      text: "text-white",
      hover: "hover:text-[#5dc01f]",
      active: "text-[#5dc01f] font-bold",
      buttonBg: "bg-[#0c7ff2]",
      buttonHover: "hover:bg-[#0a6bc9]",
      themeButton: {
        light: "bg-[#f8f8f9] border-[#1d194b]",
        dark: "bg-[#2d3748] border-white",
      },
      mobileMenuBg: "bg-[#101a23]",
      mobileActive:
        "bg-[#5dc01f]/10 text-[#5dc01f] border-l-4 border-[#5dc01f]",
    },
    light: {
      bg: "bg-[#f8f8f9]",
      bgScrolled: "bg-[#f8f8f9]/90 backdrop-blur-sm",
      border: "border-b-[#e2e8f0]",
      shadow: "shadow-sm",
      text: "text-[#1a202c]",
      hover: "hover:text-[#3182ce]",
      active: "text-[#3182ce] font-bold",
      buttonBg: "bg-[#3182ce]",
      buttonHover: "hover:bg-[#2c5282]",
      themeButton: {
        light: "bg-[#f8f8f9] border-[#1d194b]",
        dark: "bg-[#2d3748] border-[#1a202c]",
      },
      mobileMenuBg: "bg-[#f8f8f9]",
      mobileActive:
        "bg-[#3182ce]/10 text-[#3182ce] border-l-4 border-[#3182ce]",
    },
  };

  const currentTheme = isDarkTheme ? headerStyles.dark : headerStyles.light;

  const navItems = [
    { label: "About Me", section: "about" },
    { label: "Expertise", section: "about" },
    { label: "Work Experience", section: "work" },
    { label: "Projects", section: "projects" },
    { label: "Certificates", section: "certificates" },
    { label: "GitHub", section: "github" },
    { label: "Testimonials", section: "testimonials" },
    { label: "Contact", section: "contact" },
  ];

  // Animation variants
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <header
        className={`w-full border-b border-solid ${currentTheme.border} ${
          isScrolled ? currentTheme.bgScrolled : currentTheme.bg
        } py-3 fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-4 ${
                activeSection === "home"
                  ? currentTheme.active
                  : currentTheme.text
              } cursor-pointer`}
              onClick={() => scrollToSection("home")}
            >
              <div className="size-4">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_6_319)">
                    <path
                      d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                      fill="currentColor"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_6_319">
                      <rect width="48" height="48" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h2
                className="text-lg font-bold leading-tight tracking-[-0.015em]"
                onClick={() => scrollToSection("home")}
              >
                Tekalegn Portfolio
              </h2>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={`text-sm font-medium leading-normal ${
                    activeSection === item.section
                      ? currentTheme.active
                      : currentTheme.text
                  } ${currentTheme.hover}`}
                  onClick={() => scrollToSection(item.section)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className={`hidden md:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 ${currentTheme.buttonBg} text-white text-sm font-bold leading-normal tracking-[0.015em] ${currentTheme.buttonHover}`}
                onClick={() => {
                  window.open("/assets/Tekalegn_Resume.pdf", "_blank");
                  trackDownload("Tekalegn_Resume.pdf", "PDF");
                }}
                href="../../assets/Tekalegn_Resume.pdf"
                download="Tekalegn_Mekonen_Resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="truncate">Resume</span>
              </motion.a>

              <motion.div
                className="theme-toggle"
                onClick={() => {
                  toggleTheme();
                  trackThemeToggle(!isDarkTheme ? "dark" : "light");
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {!isDarkTheme ? (
                  <div
                    className={`w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-all ${currentTheme.themeButton.light} border-2 border-[#1d194b]`}
                  >
                    <FaSun color="#FDB813" size={20} />
                  </div>
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-all ${currentTheme.themeButton.dark} border-2 border-white`}
                  >
                    <FaMoon color="#fff" size={20} />
                  </div>
                )}
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden w-10 h-10 flex items-center justify-center focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? (
                  <FaTimes className={`text-2xl ${currentTheme.text}`} />
                ) : (
                  <FaBars className={`text-2xl ${currentTheme.text}`} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu with Modern Animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              className="fixed inset-0 bg-black/50 z-30"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              key="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className={`fixed top-0 left-0 w-full h-screen z-40 ${currentTheme.mobileMenuBg} pt-24 pb-10 overflow-y-auto`}
            >
              <div className="container mx-auto px-6">
                <motion.div
                  className="flex flex-col space-y-4"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                    },
                  }}
                >
                  {navItems.map((item) => (
                    <motion.button
                      key={item.label}
                      variants={itemVariants}
                      className={`text-2xl font-medium py-4 px-6 rounded-xl transition-colors ${
                        activeSection === item.section
                          ? currentTheme.mobileActive
                          : currentTheme.text
                      } ${currentTheme.hover} text-left`}
                      onClick={() => scrollToSection(item.section)}
                      whileHover={{
                        x: 10,
                        backgroundColor: isDarkTheme
                          ? "rgba(92, 192, 31, 0.1)"
                          : "rgba(49, 130, 206, 0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}

                  <motion.div variants={itemVariants} className="pt-4">
                    <motion.a
                      className={`w-full block text-center py-4 px-6 rounded-xl ${currentTheme.buttonBg} text-white text-xl font-bold ${currentTheme.buttonHover}`}
                      onClick={() => {
                        window.open("/assets/Tekalegn_Resume.pdf", "_blank");
                        setIsMenuOpen(false);
                      }}
                      href="../../assets/Tekalegn_Resume.pdf"
                      download="Tekalegn_Mekonen_Resume.pdf"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Download Resume
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
