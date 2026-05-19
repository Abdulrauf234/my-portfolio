"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, Sparkles, LayoutDashboard } from "lucide-react";
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  };

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""} glass`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Sparkles className={styles.logoIcon} />
          <span>Abdulrauf <span className={styles.logoAlt}>Saleh</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          <Link href="/#hero" className={styles.navLink}>Home</Link>
          <Link href="/#categories" className={styles.navLink}>Services</Link>
          <Link href="/#projects" className={styles.navLink}>Projects</Link>
          <Link href="/#benefits" className={styles.navLink}>Benefits</Link>
          <Link href="/#play" className={styles.navLink}>Animation Lab</Link>
          <Link href="/#contact" className={styles.navLink}>Contact</Link>
          <Link href="/dashboard" className={styles.dashboardBtn}>
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link>
          <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className={styles.mobileButtons}>
          <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className={styles.mobileMenuToggle} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className={`${styles.mobileDrawer} glass`}>
          <Link href="/#hero" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/#categories" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link href="/#projects" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
          <Link href="/#benefits" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Benefits</Link>
          <Link href="/#play" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Animation Lab</Link>
          <Link href="/#contact" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link href="/dashboard" className={styles.mobileDashboardBtn} onClick={() => setIsMobileMenuOpen(false)}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
