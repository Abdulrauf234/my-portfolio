"use client";

import { motion } from "framer-motion";
import { Code2, Video, Palette, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/Categories.module.css";

const CATEGORIES = [
  {
    id: "web",
    icon: <Code2 size={40} />,
    title: "Web Development",
    description: "Architecting bespoke, high-performance web applications using React, Next.js, and headless integrations. Every line of code is optimized for extreme speed, search engine placement (SEO), and direct sales conversion.",
    features: ["Custom Next.js & React Architectures", "Headless E-Commerce Integration", "Speed & Performance Auditing", "Responsive Mobile-First Interfaces"],
    color: "rgba(56, 189, 248, 0.15)",
  },
  {
    id: "video",
    icon: <Video size={40} />,
    title: "Video Editing",
    description: "Sleek motion graphics, professional color grading, cinematic sound design, and pacing that hooks the modern viewer's attention span. Customized for high retention, viral formatting, and corporate conversions.",
    features: ["Advanced Color Grading & correction", "Motion Design & 3D Typography", "Sound Design & Cinematic Dubbing", "Short-Form Attention Crops"],
    color: "rgba(37, 99, 235, 0.15)",
  },
  {
    id: "graphics",
    icon: <Palette size={40} />,
    title: "Graphics & Branding",
    description: "Defining luxury, custom visual structures and corporate assets. High-end logo design systems, comprehensive marketing deliverables, and pixel-perfect mobile/web user interfaces.",
    features: ["Luxury Brand Identity Guidelines", "Custom Logo Design & Vectors", "High-Converting Promo Collaterals", "Premium UI/UX Design Mockups"],
    color: "rgba(168, 85, 247, 0.15)",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="section">
      <div className={styles.blob} />
      <div className="container">
        <div className={styles.sectionHeader}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.sectionTag}
          >
            Core Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.sectionTitle}
          >
            Sovereign Services For <span className={styles.gradientText}>Brand Dominance</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={styles.sectionSubtitle}
          >
            We align code, cinematic motion, and luxury graphic aesthetics to maximize your market trust, customer retention, and sales pipelines.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className={`${styles.card} glass`}
              style={{ "--hover-glow": cat.color } as React.CSSProperties}
            >
              <div className={styles.iconContainer}>
                {cat.icon}
              </div>
              
              <h3 className={styles.cardTitle}>{cat.title}</h3>
              
              <p className={styles.cardDesc}>{cat.description}</p>
              
              <ul className={styles.featureList}>
                {cat.features.map((feat, index) => (
                  <li key={index} className={styles.featureItem}>
                    <span className={styles.bullet} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="#contact" className={styles.learnMore}>
                <span>Initiate Project</span>
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
