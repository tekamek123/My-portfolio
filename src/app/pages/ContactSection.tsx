"use client";
import { motion } from "framer-motion";
import { FaTelegramPlane, FaFacebook, FaGithub, FaEnvelope, FaLinkedin, FaPhone } from "react-icons/fa";

interface ContactSectionProps {
  id?: string;
  isDarkTheme: boolean;
}

export default function ContactSection({ id, isDarkTheme }: ContactSectionProps) {
  const socialLinks = [
    {
      icon: <FaTelegramPlane size={24} />,
      href: "https://t.me/sco321",
      label: "Telegram",
      color: "text-[#0088cc]",
      bg: "bg-[#0088cc]/10",
    },
    {
      icon: <FaFacebook size={24} />,
      href: "https://www.facebook.com/profile.php?id=100006147289146",
      label: "Facebook",
      color: "text-[#1877f2]",
      bg: "bg-[#1877f2]/10",
    },
    {
      icon: <FaGithub size={24} />,
      href: "https://github.com/tekamek123",
      label: "GitHub",
      color: "text-gray-800 dark:text-gray-200",
      bg: "bg-gray-200/10 dark:bg-gray-200/10",
    },
    {
      icon: <FaEnvelope size={24} />,
      href: "mailto:tekamek25@gmail.com",
      label: "Email",
      color: "text-[#ea4335]",
      bg: "bg-[#ea4335]/10",
    },
    {
      icon: <FaLinkedin size={24} />,
      href: "https://www.linkedin.com/in/tekalegn-mekonen-456b662a7",
      label: "LinkedIn",
      color: "text-[#0a66c2]",
      bg: "bg-[#0a66c2]/10",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  const tapEffect = { scale: 0.95 };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={`rounded-3xl p-8 md:p-12 w-full max-w-6xl mx-auto mt-16 ${
        isDarkTheme ? "bg-[#212435]" : "bg-white"
      } shadow-lg ${isDarkTheme ? "shadow-gray-900/20" : "shadow-gray-200/50"}`}
    >
      {/* Section Title */}
      <motion.h2
        variants={itemVariants}
        className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
          isDarkTheme ? "text-white" : "text-gray-800"
        }`}
      >
        Let's <span className="text-[#0c7ff2]">Connect</span>
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Profile Card */}
        <motion.div
          variants={itemVariants}
          className={`flex-1 flex flex-col items-center lg:items-start p-8 rounded-2xl ${
            isDarkTheme ? "bg-[#2a2e42]" : "bg-gray-50"
          }`}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative mb-6 group"
          >
            <div
              className={`absolute inset-0 rounded-full ${
                isDarkTheme ? "bg-[#0c7ff2]/20" : "bg-[#0c7ff2]/10"
              } blur-md group-hover:blur-lg transition-all duration-300`}
            />
            <img
              src="/assets/photo4.png"
              alt="Tekalegn Mekonen"
              className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-[#2a2e42] relative z-10"
            />
          </motion.div>

          <motion.h3
            className={`text-2xl font-bold mb-1 ${
              isDarkTheme ? "text-white" : "text-gray-800"
            }`}
          >
            Tekalegn Mekonen
          </motion.h3>
          <motion.p
            className={`text-lg mb-6 ${
              isDarkTheme ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Mobile App & Web Developer
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="w-full space-y-4"
          >
            <motion.div
              variants={itemVariants}
              className={`flex items-center p-4 rounded-xl ${
                isDarkTheme ? "bg-[#34384d]" : "bg-white"
              } shadow-sm`}
            >
              <div
                className={`p-3 rounded-lg mr-4 ${
                  isDarkTheme ? "bg-[#0c7ff2]/20" : "bg-[#0c7ff2]/10"
                }`}
              >
                <FaEnvelope
                  className={`text-xl ${isDarkTheme ? "text-[#0c7ff2]" : "text-[#0a6bc9]"}`}
                />
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkTheme ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Email
                </p>
                <a
                  href="mailto:tekamek25@gmail.com"
                  className={`font-medium ${
                    isDarkTheme ? "text-white" : "text-gray-800"
                  } hover:text-[#0c7ff2] transition-colors`}
                >
                  tekamek25@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`flex items-center p-4 rounded-xl ${
                isDarkTheme ? "bg-[#34384d]" : "bg-white"
              } shadow-sm`}
            >
              <div
                className={`p-3 rounded-lg mr-4 ${
                  isDarkTheme ? "bg-[#5dc01f]/20" : "bg-[#5dc01f]/10"
                }`}
              >
                <FaPhone
                  className={`text-xl ${isDarkTheme ? "text-[#5dc01f]" : "text-[#4aa71a]"}`}
                />
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkTheme ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Phone
                </p>
                <p
                  className={`font-medium ${
                    isDarkTheme ? "text-white" : "text-gray-800"
                  }`}
                >
                  +251 915 665 329
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex-1 flex flex-col justify-center"
        >
          <motion.h3
            className={`text-xl font-semibold mb-6 ${
              isDarkTheme ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Connect with me on:
          </motion.h3>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                whileHover={hoverEffect}
                whileTap={tapEffect}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`flex flex-col items-center p-6 rounded-xl ${
                  isDarkTheme ? "bg-[#2a2e42]" : "bg-gray-50"
                } ${link.bg} hover:${link.bg.replace("/10", "/20")} transition-all`}
              >
                <div className={`text-2xl mb-2 ${link.color}`}>{link.icon}</div>
                <span
                  className={`font-medium ${
                    isDarkTheme ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form (Optional - can be added later) */}
          <motion.div
            variants={itemVariants}
            className={`mt-12 p-6 rounded-2xl ${
              isDarkTheme ? "bg-[#2a2e42]" : "bg-gray-50"
            }`}
          >
            <h4
              className={`text-lg font-semibold mb-4 ${
                isDarkTheme ? "text-white" : "text-gray-800"
              }`}
            >
              Send me a message
            </h4>
            <p
              className={`mb-4 ${
                isDarkTheme ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Interested in working together? Let's talk!
            </p>
            <motion.a
              href="mailto:tekamek25@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-block px-6 py-3 rounded-lg font-medium ${
                isDarkTheme
                  ? "bg-[#0c7ff2] text-white"
                  : "bg-[#0c7ff2] text-white"
              } shadow-md hover:shadow-lg transition-all`}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}