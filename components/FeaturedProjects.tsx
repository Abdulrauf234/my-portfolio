"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FolderOpen, AlertCircle, ArrowUpRight } from "lucide-react";
import styles from "@/styles/FeaturedProjects.module.css";
import { getProjects } from "@/lib/storage";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link?: string | null;
  featured: boolean;
}

const CATEGORIES = ["All", "Web Development", "Video Editing", "Graphics Design"];

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    function loadProjects() {
      try {
        const data = getProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load featured projects from storage. Please check your setup.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, projects]);

  return (
    <section id="projects" className="section">
      <div className={styles.sectionHeaderGlow} />
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className={styles.tag}>Exquisite Craftsmanship</span>
            <h2 className={styles.title}>Featured <span className={styles.gradientText}>Portfolio Projects</span></h2>
            <p className={styles.subtitle}>
              A curated collection of elite design assets, high-retention video files, and robust web applications designed to convert.
            </p>
          </div>
        </div>

        {/* Categories Filtering tabs */}
        <div className={styles.filterTabs}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.tab} ${activeCategory === cat ? styles.activeTab : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Database state handling */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
            <p>Retrieving database records...</p>
          </div>
        ) : error ? (
          <div className={`${styles.errorCard} glass`}>
            <AlertCircle className={styles.errorIcon} />
            <p>{error}</p>
          </div>
        ) : (
          <motion.div layout className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={proj.id}
                  className={`${styles.projectCard} glass`}
                >
                  <div className={styles.imageContainer}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={proj.imageUrl} 
                      alt={proj.title} 
                      className={styles.image}
                    />
                    <div className={styles.imageOverlay}>
                      <span className={`${styles.categoryTag} glass`}>
                        {proj.category}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <h3 className={styles.projectTitle}>{proj.title}</h3>
                    <p className={styles.projectDesc}>{proj.description}</p>
                    
                    <div className={styles.cardFooter}>
                      {proj.link ? (
                        <a 
                          href={proj.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={styles.projectLink}
                        >
                          <span>Explore Project</span>
                          <ArrowUpRight size={16} />
                        </a>
                      ) : (
                        <span className={styles.projectLinkPlaceholder}>
                          Completed Case Study
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
