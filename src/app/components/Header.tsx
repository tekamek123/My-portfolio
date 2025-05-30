"use client";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

interface HeaderProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const Header = ({ isDarkTheme, toggleTheme }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsMenuOpen(false); // Close menu after clicking a link
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyles = {
    dark: {
      bg: "bg-[#101a23]",
      bgScrolled: "bg-[#101a23]/90 backdrop-blur-sm",
      border: "border-b-[#223649]",
      text: "text-white",
      hover: "hover:text-[#5dc01f]",
      buttonBg: "bg-[#0c7ff2]",
      buttonHover: "hover:bg-[#0a6bc9]",
      themeButton: {
        light: "bg-[#f8f8f9] border-[#1d194b]",
        dark: "bg-[#2d3748] border-white",
      },
      mobileMenuBg: "bg-[#101a23]",
    },
    light: {
      bg: "bg-[#f8f8f9]",
      bgScrolled: "bg-[#f8f8f9]/90 backdrop-blur-sm",
      border: "border-b-[#e2e8f0]",
      shadow: "shadow-sm",
      text: "text-[#1a202c]",
      hover: "hover:text-[#3182ce]",
      buttonBg: "bg-[#3182ce]",
      buttonHover: "hover:bg-[#2c5282]",
      themeButton: {
        light: "bg-[#f8f8f9] border-[#1d194b]",
        dark: "bg-[#2d3748] border-[#1a202c]",
      },
      mobileMenuBg: "bg-[#f8f8f9]",
    },
  };

  const currentTheme = isDarkTheme ? headerStyles.dark : headerStyles.light;

  const navItems = [
    { label: "About Me", section: "about" },
    { label: "Expertise", section: "about" },
    { label: "Work Experience", section: "work" },
    { label: "Projects", section: "projects" },
    { label: "Testimonials", section: "testimonials" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <>
      <header
        className={`w-full border-b border-solid ${currentTheme.border} ${
          isScrolled ? currentTheme.bgScrolled : currentTheme.bg
        } py-3 fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-4 ${currentTheme.text} cursor-pointer`}
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
                className={`text-lg font-bold leading-tight tracking-[-0.015em] ${currentTheme.text}`}
              >
                Tekalegn Portfolio
              </h2>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={`text-sm font-medium leading-normal ${currentTheme.text} ${currentTheme.hover}`}
                  onClick={() => scrollToSection(item.section)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                className={`hidden md:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 ${currentTheme.buttonBg} text-white text-sm font-bold leading-normal tracking-[0.015em] ${currentTheme.buttonHover}`}
                onClick={() =>
                  window.open("/assets/Tekalegn_Resume.pdf", "_blank")
                }
                href="../../assets/Tekalegn_Resume.pdf"
                download="Tekalegn_Mekonen_Resume.pdf"
              >
                <span className="truncate">Resume</span>
              </a>

              <div className="theme-toggle" onClick={toggleTheme}>
                {!isDarkTheme ? (
                  <div
                    className={`w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-all hover:scale-125 ${currentTheme.themeButton.light} border-2 border-[#1d194b]`}
                  >
                    <FaSun color="#FDB813" size={20} />
                  </div>
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-all hover:scale-125 ${currentTheme.themeButton.dark} border-2 border-white`}
                  >
                    <FaMoon color="#fff" size={20} />
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden w-10 h-10 flex items-center justify-center focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className={`text-2xl ${currentTheme.text}`} />
                ) : (
                  <FaBars className={`text-2xl ${currentTheme.text}`} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen z-40 transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } ${currentTheme.mobileMenuBg} pt-20`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`text-xl font-medium py-3 px-4 rounded-lg transition-colors ${currentTheme.text} ${currentTheme.hover} text-left`}
                onClick={() => scrollToSection(item.section)}
              >
                {item.label}
              </button>
            ))}
            <a
              className={`w-full text-center py-3 px-4 rounded-lg ${currentTheme.buttonBg} text-white text-lg font-bold ${currentTheme.buttonHover}`}
              onClick={() => {
                window.open("/assets/Tekalegn_Resume.pdf", "_blank");
                setIsMenuOpen(false);
              }}
              href="../../assets/Tekalegn_Resume.pdf"
              download="Tekalegn_Mekonen_Resume.pdf"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
