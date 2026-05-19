"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, Quote, ArrowRightLeft } from "lucide-react";
import styles from "@/styles/Testimonials.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Alexander Vance",
    role: "CEO, Aether Enterprises",
    comment: "Abdulrauf completely transformed our branding and e-commerce channel. The speed optimization alone achieved a 22% bump in checkouts in the first two weeks, and the visual assets feel incredibly luxury. He is an absolute master of modern web architecture.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "Marketing Director, Velo Media",
    comment: "The short-form viral cuts and commercial promo video Abdulrauf produced for our software launch reached over 1.2 million impressions. The custom pacing and sound effects are next-level. Highly recommended for any serious visual brand campaign.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Marcus Sterling",
    role: "Founder, Zenith Capital",
    comment: "Having worked with dozens of designers, I can safely say Abdulrauf's graphic identity work is in a class of its own. He listened carefully to our corporate narrative and translated it into a cohesive premium design guide.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Proven Track Record</span>
          <h2 className={styles.title}>What Our <span className={styles.gradientText}>Partners Say</span></h2>
          <p className={styles.subtitle}>
            Don&apos;t take our word for it. Read how we help industry founders scale their user engagement and click-through rates.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className={styles.swiper}
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.id}>
              <div className={`${styles.card} glass`}>
                <Quote className={styles.quoteIcon} />
                
                <div className={styles.stars}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="var(--accent-cyan)" color="var(--accent-cyan)" />
                  ))}
                </div>

                <p className={styles.comment}>&ldquo;{t.comment}&rdquo;</p>

                <div className={styles.userProfile}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} className={styles.avatar} />
                  <div className={styles.userInfo}>
                    <h4 className={styles.name}>{t.name}</h4>
                    <span className={styles.role}>{t.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
