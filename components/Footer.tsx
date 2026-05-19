import Link from "next/link";
import { Sparkles, Instagram, Github, Phone, Mail, MessageSquare } from "lucide-react";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} glass`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <Sparkles className={styles.logoIcon} />
              <span>Abdulrauf <span className={styles.logoAlt}>Saleh</span></span>
            </Link>
            <p className={styles.brandDesc}>
              Bespoke Web Architecture, high-octane Video Editing, and premium Visual Brand Identities optimized for maximum sales conversions.
            </p>
            <div className={styles.socials}>
              <a href="https://www.instagram.com/abdu.lrauf2854/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <Instagram size={18} />
              </a>
              <a href="https://github.com/Abdulrauf234" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <Github size={18} />
              </a>
              <a href="https://wa.me/2349138425803" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Creative Lab</h4>
            <ul className={styles.linksList}>
              <li><Link href="#hero">Narrative Hero</Link></li>
              <li><Link href="#categories">Core Capabilities</Link></li>
              <li><Link href="#projects">Recent Works</Link></li>
              <li><Link href="#benefits">Business Value</Link></li>
              <li><Link href="#play">Animation Lab</Link></li>
            </ul>
          </div>

          {/* Business Credentials Col */}
          <div className={styles.credentialsCol}>
            <h4 className={styles.colTitle}>Enterprise Details</h4>
            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <MessageSquare size={16} className={styles.detailIcon} />
                <span>WhatsApp: (+234) 09138425803</span>
              </div>
              <div className={styles.detailItem}>
                <Phone size={16} className={styles.detailIcon} />
                <span>Regular: (+234) 09138425803</span>
              </div>
              <div className={styles.detailItem}>
                <Mail size={16} className={styles.detailIcon} />
                <a href="mailto:Abdulraufshittu13@gmail.com" className={styles.emailLink}>
                  Abdulraufshittu13@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Abdulrauf S. Saleh. All rights reserved. Sculpted for maximum brand sovereignty.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/dashboard" className={styles.bottomLink}>Secure Panel Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
