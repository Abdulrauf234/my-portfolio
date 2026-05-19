"use client";

import { useState, useRef, useEffect } from "react";
import { Play, RotateCcw, Sliders, Cpu, Sparkles, Layers } from "lucide-react";
import styles from "@/styles/AnimationPlay.module.css";

type LabType = "physics" | "timeline" | "morph";

export default function AnimationPlay() {
  const [activeLab, setActiveLab] = useState<LabType>("physics");
  const [speed, setSpeed] = useState<number>(2);
  const [density, setDensity] = useState<number>(50);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // HTML5 Physics Canvas Simulation
  useEffect(() => {
    if (activeLab !== "physics" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = 350;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = density;
      const colors = ["#38bdf8", "#2563eb", "#60a5fa", "#ffffff"];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: Math.random() * 4 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw links between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (isPlaying) {
          p1.x += p1.vx;
          p1.y += p1.vy;

          if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
          if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [activeLab, speed, density, isPlaying]);

  return (
    <section id="play" className="section">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Interactive Brand Lab</span>
          <h2 className={styles.title}>Visual <span className={styles.gradientText}>Animation Lab</span></h2>
          <p className={styles.subtitle}>
            Test, manipulate, and play with high-performance physics systems and vector dynamics designed to hook user attention.
          </p>
        </div>

        <div className={`${styles.labWindow} glass`}>
          {/* Controls Sidebar */}
          <div className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Lab Instruments</h3>
            
            <div className={styles.tabList}>
              <button 
                onClick={() => setActiveLab("physics")}
                className={`${styles.tabBtn} ${activeLab === "physics" ? styles.activeTab : ""}`}
              >
                <Cpu size={18} />
                <div className={styles.btnText}>
                  <strong>Neural Canvas</strong>
                  <span>Interactive Node Web</span>
                </div>
              </button>

              <button 
                onClick={() => setActiveLab("timeline")}
                className={`${styles.tabBtn} ${activeLab === "timeline" ? styles.activeTab : ""}`}
              >
                <Layers size={18} />
                <div className={styles.btnText}>
                  <strong>Timeline Ramping</strong>
                  <span>Dynamic speed curve</span>
                </div>
              </button>

              <button 
                onClick={() => setActiveLab("morph")}
                className={`${styles.tabBtn} ${activeLab === "morph" ? styles.activeTab : ""}`}
              >
                <Sparkles size={18} />
                <div className={styles.btnText}>
                  <strong>Vector Morph</strong>
                  <span>SVG organic fields</span>
                </div>
              </button>
            </div>

            {/* Sliders and variables parameters control panel */}
            <div className={styles.controlsPanel}>
              <div className={styles.controlHeader}>
                <Sliders size={16} />
                <span>Simulation Parameters</span>
              </div>

              {activeLab === "physics" && (
                <>
                  <div className={styles.sliderGroup}>
                    <div className={styles.sliderLabels}>
                      <span>Particle Speed</span>
                      <span>{speed}x</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="8" step="0.5"
                      value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
                      className={styles.sliderRange}
                    />
                  </div>

                  <div className={styles.sliderGroup}>
                    <div className={styles.sliderLabels}>
                      <span>Node Density</span>
                      <span>{density}px</span>
                    </div>
                    <input 
                      type="range" min="15" max="100" step="5"
                      value={density} onChange={(e) => setDensity(Number(e.target.value))}
                      className={styles.sliderRange}
                    />
                  </div>
                </>
              )}

              {activeLab === "timeline" && (
                <div className={styles.timelineParameters}>
                  <p className={styles.helpText}>Adjusting acceleration frames simulates high-end cinematic video speed ramp edits.</p>
                  <div className={styles.sliderGroup}>
                    <div className={styles.sliderLabels}>
                      <span>Ramping Speed</span>
                      <span>{speed}s</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="4" step="0.25"
                      value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
                      className={styles.sliderRange}
                    />
                  </div>
                </div>
              )}

              {activeLab === "morph" && (
                <div className={styles.morphParameters}>
                  <p className={styles.helpText}>SVG filter frequencies control organic corporate branding backgrounds.</p>
                  <div className={styles.sliderGroup}>
                    <div className={styles.sliderLabels}>
                      <span>Viscosity</span>
                      <span>{density / 10}</span>
                    </div>
                    <input 
                      type="range" min="20" max="90" step="5"
                      value={density} onChange={(e) => setDensity(Number(e.target.value))}
                      className={styles.sliderRange}
                    />
                  </div>
                </div>
              )}

              <div className={styles.actionRow}>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`${styles.actionBtn} ${isPlaying ? styles.pauseBtn : styles.playBtn}`}
                >
                  <Play size={16} />
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </button>
                <button 
                  onClick={() => {
                    setSpeed(2);
                    setDensity(50);
                    setIsPlaying(true);
                  }}
                  className={styles.resetBtn}
                  title="Reset Simulation"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Sandbox Render Window */}
          <div className={styles.viewport}>
            <div className={styles.viewportHeader}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
              <span className={styles.viewportTitle}>live_render_preview.exe</span>
            </div>

            <div className={styles.renderArea}>
              {activeLab === "physics" && (
                <canvas ref={canvasRef} className={styles.physicsCanvas} />
              )}

              {activeLab === "timeline" && (
                <div className={styles.timelineWorkspace}>
                  <div 
                    className={`${styles.timelineObject} ${isPlaying ? styles.timelineAnimating : ""}`}
                    style={{ animationDuration: `${speed}s` } as React.CSSProperties}
                  />
                  <div className={styles.curveVisualizer}>
                    <svg viewBox="0 0 100 100" className={styles.svgCurve}>
                      <path d="M 0 100 C 20 100, 40 0, 100 0" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" />
                    </svg>
                    <span className={styles.curveLabel}>Bezier Curve (Ease-In-Out)</span>
                  </div>
                </div>
              )}

              {activeLab === "morph" && (
                <div className={styles.morphWorkspace}>
                  <svg viewBox="0 0 200 200" className={styles.morphSvg}>
                    <defs>
                      <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation={density / 5} result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                      </filter>
                    </defs>
                    <g filter="url(#goo)" fill="url(#morph-gradient)" className={styles.svgGroup}>
                      <circle cx="80" cy="100" r="45" className={isPlaying ? styles.bubble1 : ""} />
                      <circle cx="120" cy="100" r="40" className={isPlaying ? styles.bubble2 : ""} />
                    </g>
                    <linearGradient id="morph-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent-cyan)" />
                      <stop offset="100%" stopColor="var(--accent-blue)" />
                    </linearGradient>
                  </svg>
                  <span className={styles.morphLabel}>Fluid WebGL Simulation</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
