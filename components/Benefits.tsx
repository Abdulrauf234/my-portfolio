"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, ShieldCheck, Flame, ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/Benefits.module.css";

const BENEFITS = [
  {
    id: 1,
    icon: <TrendingUp size={32} />,
    metric: "+68%",
    title: "Sales Conversion Growth",
    description: "Every button, page layer, and custom copywriting element is architected with a singular focus: guiding visitors through a frictionless, high-converting checkout path.",
  },
  {
    id: 2,
    icon: <Users size={32} />,
    metric: "45%",
    title: "Customer Retention Uplift",
    description: "Interactive UI/UX design keeps users on-site longer. Fluid, premium micro-animations make browsing an experience they remember and return to.",
  },
  {
    id: 3,
    icon: <ShieldCheck size={32} />,
    metric: "100%",
    title: "Brand Trust & Security",
    description: "Sovereign bespoke design immediately validates your brand. No generic templates—establishing custom brand trust that drives premium pricing power.",
  },
  {
    id: 4,
    icon: <Flame size={32} />,
    metric: "98th",
    title: "Lighthouse SEO & Speed",
    description: "Optimized headless development achieves top-percentile load speeds and clean semantic layout, capturing prime placement in Google searches.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="section">
      <div className={styles.backgroundBlob} />
      <div className="container">
        <div className={styles.gridContainer}>
          {/* Text block */}
          <div className={styles.textBlock}>
            <span className={styles.tag}>Optimized Business Growth</span>
            <h2 className={styles.title}>
              Engineering Visuals That <span className={styles.gradientText}>Maximize Cashflow</span>
            </h2>
            <p className={styles.description}>
              We don&apos;t just paint pretty pictures or write arbitrary code. Our core objective is translating luxury aesthetics and technical performance directly into enterprise sales growth, user loyalty, and brand dominance.
            </p>
            
            <div className={styles.actionBlock}>
              <h3 className={styles.actionTitle}>Ready to double your visual engagement?</h3>
              <p className={styles.actionDesc}>
                Book a brief visual consultation and we will analyze your website design and load speed for free.
              </p>
              <Link href="#contact" className="btn btn-primary">
                <span>Request Free Audit</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className={styles.cardsGrid}>
            {BENEFITS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${styles.card} glass`}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconContainer}>{item.icon}</div>
                  <span className={styles.metric}>{item.metric}</span>
                </div>
                <h4 className={styles.cardTitle}>{item.title}</h4>
                <p className={styles.cardDesc}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
