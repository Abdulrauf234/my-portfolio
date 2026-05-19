"use client";

import { useState } from "react";
import { Send, CheckCircle, Mail, Phone, MessageSquare, Instagram, Github } from "lucide-react";
import styles from "@/styles/ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Web Development",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Unable to save inquiry. Please check backend connection.");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "Web Development", message: "" });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to submit message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className={styles.blob} />
      <div className="container">
        <div className={styles.grid}>
          {/* Left panel: Info & Socials */}
          <div className={styles.infoPanel}>
            <span className={styles.tag}>Initiate Partnership</span>
            <h2 className={styles.title}>Let&apos;s Build Something <span className={styles.gradientText}>Extraordinary</span></h2>
            <p className={styles.description}>
              Have a premium Web Architecture, commercial Video Editing, or custom Graphics project in mind? Submit your inquiry or connect directly via WhatsApp/Email.
            </p>

            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><MessageSquare size={20} /></div>
                <div>
                  <h4>WhatsApp (Secure Chat)</h4>
                  <a href="https://wa.me/2349138425803" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    (+234) 09138425803
                  </a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconBox}><Phone size={20} /></div>
                <div>
                  <h4>Direct Consultation</h4>
                  <a href="tel:+2349138425803" className={styles.link}>
                    (+234) 09138425803
                  </a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconBox}><Mail size={20} /></div>
                <div>
                  <h4>Official Business Email</h4>
                  <a href="mailto:Abdulraufshittu13@gmail.com" className={styles.link}>
                    Abdulraufshittu13@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.socialsGroup}>
              <h4>Connect Digitally</h4>
              <div className={styles.socialIcons}>
                <a href="https://www.instagram.com/abdu.lrauf2854/" target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} glass`} title="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://github.com/Abdulrauf234" target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} glass`} title="GitHub">
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right panel: Form */}
          <div className={`${styles.formCard} glass`}>
            {success ? (
              <div className={styles.successState}>
                <CheckCircle className={styles.successIcon} />
                <h3>Inquiry Submitted Successfully</h3>
                <p>
                  Thank you for reaching out. We have logged your request in our secure database and will review your parameters within 12 hours.
                </p>
                <button onClick={() => setSuccess(false)} className="btn btn-secondary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>Secure Project Form</h3>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" id="name" name="name" required
                    value={formData.name} onChange={handleChange}
                    placeholder="Enter your name" className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" id="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    placeholder="name@company.com" className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="subject">Category Focus</label>
                  <select 
                    id="subject" name="subject"
                    value={formData.subject} onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="Web Development">Web Development Focus</option>
                    <option value="Video Editing">Video Editing Focus</option>
                    <option value="Graphics Design">Graphics & Brand Identity</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message">Project Parameters</label>
                  <textarea 
                    id="message" name="message" required rows={4}
                    value={formData.message} onChange={handleChange}
                    placeholder="Briefly describe your objectives, timelines, and budget details..." 
                    className={styles.textarea}
                  />
                </div>

                {error && <div className={styles.errorText}>{error}</div>}

                <button type="submit" disabled={submitting} className="btn btn-primary">
                  <span>{submitting ? "Transmitting..." : "Transmit Project Parameters"}</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
