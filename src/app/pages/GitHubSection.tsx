"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "../styles/GitHubSection.module.css";
import { useTheme } from "../context/ThemeContext";
import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaEye,
  FaCode,
  FaExternalLinkAlt,
  FaSpinner,
  FaHandsHelping,
} from "react-icons/fa";

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

interface GitHubSectionProps {
  id?: string;
}

const GITHUB_USERNAME = "tekamek123";

export default function GitHubSection({ id }: GitHubSectionProps) {
  const { isDarkTheme } = useTheme();
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contributionData, setContributionData] = useState<number[]>([]);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user profile and repositories
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        ),
      ]);

      if (!userRes.ok || !reposRes.ok) {
        throw new Error("Failed to fetch GitHub data");
      }

      const userData = await userRes.json();
      const reposData = await reposRes.json();

      // Calculate stats
      const totalStars = reposData.reduce(
        (sum: number, repo: any) => sum + repo.stargazers_count,
        0
      );
      const totalForks = reposData.reduce(
        (sum: number, repo: any) => sum + repo.forks_count,
        0
      );

      // Fetch contribution count (estimate from commits or use a service)
      // For now, we'll calculate an estimate or fetch from contribution graph
      let totalContributions = 0;
      try {
        // Try to get contribution count from GitHub's contribution graph
        // This is an estimate - GitHub doesn't provide exact contribution count via public API
        // You can use a service like github-readme-stats or calculate from commits
        const contributionsRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`
        );
        if (contributionsRes.ok) {
          const events = await contributionsRes.json();
          // Count push events as contributions (commits)
          totalContributions = events.filter(
            (event: any) => event.type === "PushEvent"
          ).length;
          // Multiply by average commits per push (estimate)
          totalContributions = totalContributions * 3;
        }
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

      // Process repositories
      const processedRepos: Repository[] = reposData.map((repo: any) => ({
        name: repo.name,
        description: repo.description || "No description available",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || "N/A",
        url: repo.html_url,
        updatedAt: repo.updated_at,
      }));

      setRepositories(processedRepos);

      // Fetch contribution data (using GitHub's contribution graph)
      // Note: GitHub doesn't provide a direct API for contribution graph
      // We'll use a workaround or show placeholder
      fetchContributionData();
    } catch (err) {
      console.error("Error fetching GitHub data:", err);
      setError("Failed to load GitHub data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchContributionData = async () => {
    // Since GitHub doesn't provide contribution data via API easily,
    // we'll create a placeholder or use GitHub's contribution graph SVG
    // For now, we'll generate some sample data or use the SVG approach
    try {
      // You can embed GitHub's contribution graph SVG
      // Or use a service like github-readme-stats
      setContributionData([]);
    } catch (err) {
      console.error("Error fetching contribution data:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
          <h3 className={styles.contributionTitle}>Public Repository Contribution Graph</h3>
          <div className={styles.contributionGraph}>
            <img
              src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=${
                isDarkTheme ? "github-dark" : "github"
              }&hide_border=true&area=true`}
              alt="GitHub Contribution Graph"
              className={styles.graphImage}
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
