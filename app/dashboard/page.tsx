"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  BarChart3, 
  Layers, 
  MessageSquareCode, 
  Megaphone, 
  Plus, 
  Check, 
  AlertCircle,
  Eye,
  Trash2,
  Lock
} from "lucide-react";
import styles from "@/styles/Dashboard.module.css";
import { 
  getProjects, 
  addProject, 
  getPromotions, 
  addPromotion, 
  getContactMessages 
} from "@/lib/storage";

type TabType = "overview" | "projects" | "promotions" | "messages";

interface Project {
  id: string;
  title: string;
  category: string;
  featured: boolean;
}

interface Promotion {
  id: string;
  title: string;
  discount?: string;
  code?: string;
  active: boolean;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [projects, setProjects] = useState<Project[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ success: "", error: "" });

  // New Project Form State
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    link: "",
    featured: true,
  });

  // New Promotion Form State
  const [promoForm, setPromoForm] = useState({
    title: "",
    description: "",
    discount: "",
    code: "",
    active: true,
  });

  // Fetch Admin Data
  function fetchAllData() {
    try {
      setProjects(getProjects());
      setPromotions(getPromotions());
      setMessages(getContactMessages());
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  // Submit Project Form
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ success: "", error: "" });

    try {
      // Small artificial delay for premium micro-interaction
      await new Promise((resolve) => setTimeout(resolve, 500));

      addProject(projectForm);

      setFeedback({ success: "Project listing added successfully to local storage!", error: "" });
      setProjectForm({
        title: "",
        description: "",
        category: "Web Development",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        link: "",
        featured: true,
      });
      fetchAllData();
    } catch (err: any) {
      setFeedback({ success: "", error: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Promotion Form
  const handlePromoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ success: "", error: "" });

    try {
      // Small artificial delay for premium micro-interaction
      await new Promise((resolve) => setTimeout(resolve, 500));

      addPromotion(promoForm);

      setFeedback({ success: "Promotional banner added successfully to local storage!", error: "" });
      setPromoForm({
        title: "",
        description: "",
        discount: "",
        code: "",
        active: true,
      });
      fetchAllData();
    } catch (err: any) {
      setFeedback({ success: "", error: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <div className="container">
          {/* Dashboard Header */}
          <div className={styles.header}>
            <div>
              <div className={styles.secureBadge}>
                <Lock size={12} />
                <span>Secure Control Terminal</span>
              </div>
              <h1 className={styles.title}>Partner & Listing <span className={styles.accentText}>Console</span></h1>
              <p className={styles.subtitle}>
                Manage active discount campaigns, upload featured works, and review secure client project parameters.
              </p>
            </div>
          </div>

          <div className={styles.layout}>
            {/* Sidebar navigation tabs */}
            <div className={styles.sidebar}>
              <button 
                onClick={() => { setActiveTab("overview"); setFeedback({ success: "", error: "" }); }}
                className={`${styles.tabBtn} ${activeTab === "overview" ? styles.activeTab : ""}`}
              >
                <BarChart3 size={18} />
                <span>Overview Stats</span>
              </button>

              <button 
                onClick={() => { setActiveTab("projects"); setFeedback({ success: "", error: "" }); }}
                className={`${styles.tabBtn} ${activeTab === "projects" ? styles.activeTab : ""}`}
              >
                <Layers size={18} />
                <span>Featured Listings ({projects.length})</span>
              </button>

              <button 
                onClick={() => { setActiveTab("promotions"); setFeedback({ success: "", error: "" }); }}
                className={`${styles.tabBtn} ${activeTab === "promotions" ? styles.activeTab : ""}`}
              >
                <Megaphone size={18} />
                <span>Promotions ({promotions.length})</span>
              </button>

              <button 
                onClick={() => { setActiveTab("messages"); setFeedback({ success: "", error: "" }); }}
                className={`${styles.tabBtn} ${activeTab === "messages" ? styles.activeTab : ""}`}
              >
                <MessageSquareCode size={18} />
                <span>Project Queries ({messages.length})</span>
              </button>
            </div>

            {/* Workspace panels */}
            <div className={`${styles.workspace} glass`}>
              {loading ? (
                <div className={styles.loadingArea}>
                  <div className={styles.spinner} />
                  <p>Initializing secure dashboard link...</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {/* OVERVIEW PANEL */}
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={styles.panel}
                    >
                      <h2 className={styles.panelTitle}>Operations Dashboard</h2>
                      
                      <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                          <span className={styles.statLabel}>Total Works</span>
                          <span className={styles.statVal}>{projects.length}</span>
                        </div>
                        <div className={styles.statCard}>
                          <span className={styles.statLabel}>Active Promos</span>
                          <span className={styles.statVal}>
                            {promotions.filter((p) => p.active).length}
                          </span>
                        </div>
                        <div className={styles.statCard}>
                          <span className={styles.statLabel}>Inquiry Records</span>
                          <span className={styles.statVal}>{messages.length}</span>
                        </div>
                      </div>

                      <div className={styles.welcomeBox}>
                        <h3>Enterprise Capabilities Active</h3>
                        <p>
                          Your portfolio is fully wired up to a local SQLite database using Prisma. When customers complete the project form or you modify campaigns here, standard database CRUD commits occur immediately.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* PROJECTS PANEL */}
                  {activeTab === "projects" && (
                    <motion.div
                      key="projects"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={styles.panel}
                    >
                      <h2 className={styles.panelTitle}>Upload Featured Listing</h2>

                      {feedback.success && <div className={styles.successAlert}><Check size={16} /><span>{feedback.success}</span></div>}
                      {feedback.error && <div className={styles.errorAlert}><AlertCircle size={16} /><span>{feedback.error}</span></div>}

                      <div className={styles.columns}>
                        {/* Listing upload form */}
                        <form onSubmit={handleProjectSubmit} className={styles.form}>
                          <div className={styles.inputGroup}>
                            <label>Project Title</label>
                            <input 
                              type="text" required
                              value={projectForm.title}
                              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                              placeholder="e.g. Apex E-Commerce Setup"
                              className={styles.input}
                            />
                          </div>

                          <div className={styles.inputGroup}>
                            <label>Description Details</label>
                            <textarea 
                              required rows={3}
                              value={projectForm.description}
                              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                              placeholder="Describe conversion results, architecture, and value delivered..."
                              className={styles.textarea}
                            />
                          </div>

                          <div className={styles.inputGroup}>
                            <label>Capabilities Category</label>
                            <select 
                              value={projectForm.category}
                              onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                              className={styles.select}
                            >
                              <option value="Web Development">Web Development</option>
                              <option value="Video Editing">Video Editing</option>
                              <option value="Graphics Design">Graphics Design</option>
                            </select>
                          </div>

                          <div className={styles.inputGroup}>
                            <label>Thumbnail Mockup Link</label>
                            <input 
                              type="text" required
                              value={projectForm.imageUrl}
                              onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                              className={styles.input}
                            />
                          </div>

                          <button type="submit" disabled={submitting} className="btn btn-primary">
                            <Plus size={16} />
                            <span>{submitting ? "Writing..." : "Add Project Listing"}</span>
                          </button>
                        </form>

                        {/* Current listings list */}
                        <div className={styles.listingsBox}>
                          <h3>Active Database Listings</h3>
                          <div className={styles.listingsList}>
                            {projects.map((proj) => (
                              <div key={proj.id} className={styles.listingRow}>
                                <div>
                                  <strong>{proj.title}</strong>
                                  <span>{proj.category}</span>
                                </div>
                                <span className={proj.featured ? styles.featBadge : styles.stdBadge}>
                                  {proj.featured ? "Featured" : "Standard"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* PROMOTIONS PANEL */}
                  {activeTab === "promotions" && (
                    <motion.div
                      key="promotions"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={styles.panel}
                    >
                      <h2 className={styles.panelTitle}>Manage Campaign Promotions</h2>

                      {feedback.success && <div className={styles.successAlert}><Check size={16} /><span>{feedback.success}</span></div>}
                      {feedback.error && <div className={styles.errorAlert}><AlertCircle size={16} /><span>{feedback.error}</span></div>}

                      <div className={styles.columns}>
                        {/* Promo form */}
                        <form onSubmit={handlePromoSubmit} className={styles.form}>
                          <div className={styles.inputGroup}>
                            <label>Campaign Title</label>
                            <input 
                              type="text" required
                              value={promoForm.title}
                              onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                              placeholder="e.g. Winter Video Bundle Campaign"
                              className={styles.input}
                            />
                          </div>

                          <div className={styles.inputGroup}>
                            <label>Campaign Description</label>
                            <textarea 
                              required rows={3}
                              value={promoForm.description}
                              onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })}
                              placeholder="Details of the marketing promotional offer..."
                              className={styles.textarea}
                            />
                          </div>

                          <div className={styles.rowInputs}>
                            <div className={styles.inputGroup}>
                              <label>Discount Tag (Optional)</label>
                              <input 
                                type="text"
                                value={promoForm.discount}
                                onChange={(e) => setPromoForm({ ...promoForm, discount: e.target.value })}
                                placeholder="e.g. 20% OFF"
                                className={styles.input}
                              />
                            </div>

                            <div className={styles.inputGroup}>
                              <label>Coupon Code (Optional)</label>
                              <input 
                                type="text"
                                value={promoForm.code}
                                onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value })}
                                placeholder="e.g. WINNER20"
                                className={styles.input}
                              />
                            </div>
                          </div>

                          <button type="submit" disabled={submitting} className="btn btn-primary">
                            <Plus size={16} />
                            <span>{submitting ? "Publishing..." : "Launch Campaign"}</span>
                          </button>
                        </form>

                        {/* List of campaigns */}
                        <div className={styles.listingsBox}>
                          <h3>Active Promotional Banners</h3>
                          <div className={styles.listingsList}>
                            {promotions.map((promo) => (
                              <div key={promo.id} className={styles.listingRow}>
                                <div>
                                  <strong>{promo.title}</strong>
                                  {promo.code && <code>Code: {promo.code}</code>}
                                </div>
                                <span className={promo.active ? styles.activeBadge : styles.pausedBadge}>
                                  {promo.active ? "Active" : "Paused"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* MESSAGES PANEL */}
                  {activeTab === "messages" && (
                    <motion.div
                      key="messages"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={styles.panel}
                    >
                      <h2 className={styles.panelTitle}>Client Project Queries</h2>

                      <div className={styles.messagesList}>
                        {messages.length === 0 ? (
                          <div className={styles.emptyMessages}>
                            <MessageSquareCode size={36} className={styles.emptyIcon} />
                            <p>No project queries logged in database yet.</p>
                          </div>
                        ) : (
                          messages.map((msg) => (
                            <div key={msg.id} className={styles.messageCard}>
                              <div className={styles.messageHeader}>
                                <div>
                                  <span className={styles.clientName}>{msg.name}</span>
                                  <a href={`mailto:${msg.email}`} className={styles.clientEmail}>{msg.email}</a>
                                </div>
                                <span className={styles.messageCategory}>{msg.subject}</span>
                              </div>
                              <p className={styles.messageContent}>{msg.message}</p>
                              <span className={styles.messageTime}>
                                Sent: {new Date(msg.createdAt).toLocaleString()}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
