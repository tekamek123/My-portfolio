"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import styles from "../styles/GitHubSection.module.css";
import { useTheme } from "../context/ThemeContext";
import {
  FaGithub,
  FaStar,
  FaEye,
  FaCode,
  FaExternalLinkAlt,
  FaSpinner,
  FaHandsHelping,
} from "react-icons/fa";
import { trackGitHubClick } from "../lib/analytics";
import Image from "next/image";

interface GitHubStats {
  totalContributions: number;
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  followers: number;
  following: number;
}

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  updatedAt: string;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
}

interface GitHubEvent {
  type: string;
  [key: string]: unknown;
}

interface GitHubSectionProps {
  id?: string;
}

const GITHUB_USERNAME = "tekamek123";

export default function GitHubSection({ id }: GitHubSectionProps) {
  const { isDarkTheme } = useTheme();
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user profile and repositories
      const [userRes, reposRes, eventsRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        ),
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`
        ),
      ]);

      if (!userRes.ok || !reposRes.ok || !eventsRes.ok) {
        throw new Error("Failed to fetch GitHub data");
      }

      const userData = await userRes.json();
      const reposData: GitHubRepo[] = await reposRes.json();
      const eventsData: GitHubEvent[] = await eventsRes.json();

      // Calculate stats
      const totalStars = reposData.reduce(
        (sum: number, repo: GitHubRepo) => sum + repo.stargazers_count,
        0
      );
      const totalForks = reposData.reduce(
        (sum: number, repo: GitHubRepo) => sum + repo.forks_count,
        0
      );

      // Estimate contributions from push events
      let totalContributions = 0;
      try {
        // Count push events as contributions (commits)
        totalContributions = eventsData.filter(
          (event: GitHubEvent) => event.type === "PushEvent"
        ).length;
        // Multiply by average commits per push (estimate)
        totalContributions = totalContributions * 3;
      } catch (err) {
        // If fetching fails, use a placeholder or calculate differently
        console.warn("Could not fetch contribution count:", err);
        // Estimate based on repository count (rough estimate)
        totalContributions = userData.public_repos * 50;
      }

      setStats({
        totalContributions,
        totalStars,
        totalForks,
        totalRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
      });
    } catch (err) {
      console.error("Error fetching GitHub data:", err);
      setError("Failed to load GitHub data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHubData();
  }, [fetchGitHubData]);

  if (loading) {
    return (
      <section
        id={id}
        className={clsx(styles.githubSection, {
          [styles.darkTheme]: isDarkTheme,
        })}
      >
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <FaSpinner className={styles.spinner} />
            <p>Loading GitHub data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id={id}
        className={clsx(styles.githubSection, {
          [styles.darkTheme]: isDarkTheme,
        })}
      >
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <p>{error}</p>
            <button onClick={fetchGitHubData} className={styles.retryButton}>
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={clsx(styles.githubSection, {
        [styles.darkTheme]: isDarkTheme,
      })}
    >
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <FaGithub className={styles.sectionIcon} />
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Public GitHub Activity
          </motion.h2>
          <div className={styles.sectionLine} />
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => trackGitHubClick("View Profile")}
          >
            <FaExternalLinkAlt /> View Profile
          </motion.a>
        </motion.div>

        {/* Stats Grid */}
        {stats && (
          <motion.div
            className={styles.statsGrid}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              className={styles.statCard}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaCode className={styles.statIcon} />
              <div className={styles.statValue}>{stats.totalRepos}</div>
              <div className={styles.statLabel}>Repositories</div>
            </motion.div>

            <motion.div
              className={styles.statCard}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaStar className={styles.statIcon} />
              <div className={styles.statValue}>{stats.totalStars}</div>
              <div className={styles.statLabel}>Stars Earned</div>
            </motion.div>

            <motion.div
              className={styles.statCard}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaHandsHelping className={styles.statIcon} />
              <div className={styles.statValue}>{stats.totalContributions}</div>
              <div className={styles.statLabel}>Contributions</div>
            </motion.div>

            <motion.div
              className={styles.statCard}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaEye className={styles.statIcon} />
              <div className={styles.statValue}>{stats.followers}</div>
              <div className={styles.statLabel}>Followers</div>
            </motion.div>
          </motion.div>
        )}

        {/* Contribution Graph */}
        <motion.div
          className={styles.contributionSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className={styles.contributionTitle}>
            Public Repository Contribution Graph
          </h3>
          <div className={styles.contributionGraph}>
            <Image
              src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&bg_color=${
                isDarkTheme ? "1e293b" : "ffffff"
              }&color=${isDarkTheme ? "cbd5e1" : "475569"}&line=${
                isDarkTheme ? "8b5cf6" : "6366f1"
              }&point=${isDarkTheme ? "c7cc63" : "5dc01f"}&hide_border=true&area=true`}
              alt="GitHub Contribution Graph"
              width={800}
              height={300}
              className={styles.graphImage}
              style={{ width: "100%", height: "auto" }}
              unoptimized
            />
          </div>
        </motion.div>

        {/* Recent Repositories */}
        {/* {repositories.length > 0 && (
          <motion.div
            className={styles.repositoriesSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.repositoriesTitle}>Recent Repositories</h3>
            <div className={styles.repositoriesGrid}>
              {repositories.map((repo, index) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repositoryCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => trackGitHubClick("Repository View", repo.name)}
                >
                  <div className={styles.repoHeader}>
                    <FaCode className={styles.repoIcon} />
                    <h4 className={styles.repoName}>{repo.name}</h4>
                  </div>
                  <p className={styles.repoDescription}>{repo.description}</p>
                  <div className={styles.repoFooter}>
                    <div className={styles.repoMeta}>
                      <span className={styles.repoLanguage}>
                        <span
                          className={styles.languageDot}
                          style={{
                            backgroundColor:
                              repo.language === "TypeScript"
                                ? "#3178c6"
                                : repo.language === "JavaScript"
                                ? "#f7df1e"
                                : repo.language === "Dart"
                                ? "#0175c2"
                                : repo.language === "Python"
                                ? "#3776ab"
                                : "#94a3b8",
                          }}
                        />
                        {repo.language}
                      </span>
                      <span className={styles.repoStats}>
                        <FaStar /> {repo.stars}
                      </span>
                      <span className={styles.repoStats}>
                        <FaCodeBranch /> {repo.forks}
                      </span>
                    </div>
                    <span className={styles.repoUpdated}>
                      Updated {formatDate(repo.updatedAt)}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )} */}
      </div>
    </section>
  );
}
