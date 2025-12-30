"use client";

import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import { Toast as ToastType } from "../context/ToastContext";
import styles from "../styles/Toast.module.css";
import { useTheme } from "../context/ThemeContext";

interface ToastProps {
  toast: ToastType;
  onClose: () => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  const { isDarkTheme } = useTheme();

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <FaCheckCircle className={styles.icon} />;
      case "error":
        return <FaExclamationCircle className={styles.icon} />;
      case "warning":
        return <FaExclamationCircle className={styles.icon} />;
      default:
        return <FaInfoCircle className={styles.icon} />;
    }
  };

  return (
    <motion.div
      className={`${styles.toast} ${styles[toast.type]} ${
        isDarkTheme ? styles.darkTheme : ""
      }`}
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      layout
    >
      <div className={styles.toastContent}>
        {getIcon()}
        <span className={styles.toastMessage}>{toast.message}</span>
      </div>
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close notification"
      >
        <FaTimes />
      </button>
    </motion.div>
  );
}
