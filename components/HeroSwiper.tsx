"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code, Film, Palette, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import styles from "@/styles/HeroSwiper.module.css";

const SLIDES = [
  {
    id: 1,
    icon: <Code size={36} className={styles.slideIcon} />,
    tag: "Next-Gen Web Architecture",
    title: "Sovereign Web Solutions",
    subtitle: "We engineer lightning-fast React and Next.js applications custom-built to maximize customer trust, click-through rates, and digital conversions.",
    ctaPrimary: "Explore Projects",
    ctaPrimaryLink: "#projects",
    ctaSecondary: "Start a Project",
    ctaSecondaryLink: "#contact",
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop",
    benefits: ["SEO & Load Optimized", "Interactive & Fluid UI", "Custom E-Commerce Hubs"],
  },
  {
    id: 2,
    icon: <Film size={36} className={styles.slideIcon} />,
    tag: "Attention-Grabbing Cinematic Assets",
    title: "Elite Video Editing & SFX",
    subtitle: "High-octane commercial and social video styling curated to capture raw audience attention, retain views, and build immediate brand reputation.",
    ctaPrimary: "Watch Motion Lab",
    ctaPrimaryLink: "#play",
    ctaSecondary: "Get a Video Quote",
    ctaSecondaryLink: "#contact",
    bgImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1920&auto=format&fit=crop",
    benefits: ["Heavy Visual FX & Audio Sync", "Viral Social Formatting", "Corporate Promotional Films"],
  },
  {
    id: 3,
    icon: <Palette size={36} className={styles.slideIcon} />,
    tag: "High-Fidelity Branding Systems",
    title: "Bespoke Graphics & Branding",
    subtitle: "Sculpting visual systems that feel elite, luxury, and cohesive. Logo design, marketing collateral, and UI mockups optimized for conversions.",
    ctaPrimary: "See Brand Folio",
    ctaPrimaryLink: "#projects",
    ctaSecondary: "Book Free Consultation",
    ctaSecondaryLink: "#contact",
    bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop",
    benefits: ["Custom Luxury Logo Sets", "Full Identity Guidelines", "High-Converting Promo Collaterals"],
  },
];

export default function HeroSwiper() {
  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.glowOverlay} />
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className={styles.mySwiper}
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.swiperSlide}>
            {/* Background Image with Elite Mist Blue gradient overlay */}
            <div
              className={styles.backgroundImage}
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            />
            <div className={styles.darkGradient} />

            {/* Slide Content */}
            <div className={styles.contentContainer}>
              <div className="container">
                <div className={styles.slideGrid}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={styles.textContent}
                  >
                    <div className={`${styles.tagWrapper} glass`}>
                      {slide.icon}
                      <span className={styles.tagText}>{slide.tag}</span>
                    </div>

                    <h1 className={styles.title}>
                      {slide.title.split(" ").map((word, i) => (
                        <span key={i} className={i === 1 ? styles.accentWord : ""}>
                          {word}{" "}
                        </span>
                      ))}
                    </h1>

                    <p className={styles.subtitle}>{slide.subtitle}</p>

                    {/* Key Benefits for trust/conversions */}
                    <div className={styles.benefitsRow}>
                      {slide.benefits.map((benefit, index) => (
                        <div key={index} className={styles.benefitItem}>
                          <CheckCircle2 size={16} className={styles.checkIcon} />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Call to Actions */}
                    <div className={styles.ctaRow}>
                      <Link href={slide.ctaPrimaryLink} className="btn btn-primary">
                        <span>{slide.ctaPrimary}</span>
                        <ArrowRight size={18} />
                      </Link>
                      <Link href={slide.ctaSecondaryLink} className="btn btn-secondary">
                        <span>{slide.ctaSecondary}</span>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
