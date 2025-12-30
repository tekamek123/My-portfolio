"use client";
import { motion } from "framer-motion";
import {
  FaTelegramPlane,
  FaFacebook,
  FaGithub,
  FaEnvelope,
  FaLinkedin,
  FaPhone,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import { useState, FormEvent } from "react";

interface ContactSectionProps {
  id?: string;
}

export default function ContactSection({ id }: ContactSectionProps) {
  const { isDarkTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Option 1: Use a form service like Formspree, Resend, or SendGrid
      // Replace with your actual API endpoint
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // For now, using mailto as fallback
      const mailtoLink = `mailto:tekamek25@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;

      // Simulate success (in production, wait for actual API response)
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
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
        Let&apos;s <span className="text-[#0c7ff2]">Connect</span>
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
            <Image
              src="/assets/photo4.png"
              alt="Tekalegn Mekonen"
              width={160}
              height={160}
              className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-[#2a2e42] relative z-10"
              style={{ borderRadius: "50%" }}
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

          <motion.div variants={containerVariants} className="w-full space-y-4">
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
                  className={`text-xl ${
                    isDarkTheme ? "text-[#0c7ff2]" : "text-[#0a6bc9]"
                  }`}
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
                  className={`text-xl ${
                    isDarkTheme ? "text-[#5dc01f]" : "text-[#4aa71a]"
                  }`}
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
                } ${link.bg} hover:${link.bg.replace(
                  "/10",
                  "/20"
                )} transition-all`}
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

          {/* Contact Form */}
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
              className={`mb-6 ${
                isDarkTheme ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Interested in working together? Let&apos;s talk!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkTheme ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name
                      ? "border-red-500"
                      : isDarkTheme
                      ? "border-gray-600 bg-[#34384d] text-white"
                      : "border-gray-300 bg-white text-gray-800"
                  } focus:outline-none focus:ring-2 focus:ring-[#0c7ff2] transition-all`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <FaExclamationCircle size={12} />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkTheme ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email
                      ? "border-red-500"
                      : isDarkTheme
                      ? "border-gray-600 bg-[#34384d] text-white"
                      : "border-gray-300 bg-white text-gray-800"
                  } focus:outline-none focus:ring-2 focus:ring-[#0c7ff2] transition-all`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <FaExclamationCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkTheme ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.subject
                      ? "border-red-500"
                      : isDarkTheme
                      ? "border-gray-600 bg-[#34384d] text-white"
                      : "border-gray-300 bg-white text-gray-800"
                  } focus:outline-none focus:ring-2 focus:ring-[#0c7ff2] transition-all`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <FaExclamationCircle size={12} />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    isDarkTheme ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border resize-none ${
                    errors.message
                      ? "border-red-500"
                      : isDarkTheme
                      ? "border-gray-600 bg-[#34384d] text-white"
                      : "border-gray-300 bg-white text-gray-800"
                  } focus:outline-none focus:ring-2 focus:ring-[#0c7ff2] transition-all`}
                  placeholder="Tell me about your project or inquiry..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <FaExclamationCircle size={12} />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full px-6 py-3 rounded-lg font-medium ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0c7ff2] hover:bg-[#0a6bc9]"
                } text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaEnvelope />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-2 ${
                    isDarkTheme ? "text-green-400" : "text-green-600"
                  }`}
                >
                  <FaCheckCircle />
                  <span>
                    Message sent successfully! I&apos;ll get back to you soon.
                  </span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 ${
                    isDarkTheme ? "text-red-400" : "text-red-600"
                  }`}
                >
                  <FaExclamationCircle />
                  <span>
                    Something went wrong. Please try again or email me directly
                    at{" "}
                    <a
                      href="mailto:tekamek25@gmail.com"
                      className="underline hover:no-underline"
                    >
                      tekamek25@gmail.com
                    </a>
                  </span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
