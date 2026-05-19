import { db } from "./db";

export async function initializeDatabase() {
  try {
    // Check if we need to seed projects
    const projectCount = await db.project.count();
    if (projectCount === 0) {
      await db.project.createMany({
        data: [
          {
            title: "Vertex E-Commerce Platform",
            description: "A premium, ultra-fast headless Shopify e-commerce platform built with Next.js, featuring real-time custom product personalization and smooth micro-interactions.",
            category: "Web Development",
            imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
            link: "https://github.com/Abdulrauf234",
            featured: true,
            order: 1,
          },
          {
            title: "Aether Brand Identity Film",
            description: "A high-concept brand reveal video combining 3D product rendering, immersive sound design, and sleek cinematic editing to boost customer engagement.",
            category: "Video Editing",
            imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop",
            link: "https://github.com/Abdulrauf234",
            featured: true,
            order: 2,
          },
          {
            title: "Neon Odyssey UI/UX System",
            description: "A futuristic cyberpunk-inspired UI/UX layout and visual guidelines designed for an elite mobile gaming platform, achieving a 45% uplift in user retention.",
            category: "Graphics Design",
            imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
            link: "https://github.com/Abdulrauf234",
            featured: true,
            order: 3,
          },
          {
            title: "Lumina SaaS Landing Hub",
            description: "High-converting premium website for an AI productivity tool. Minimalist dark layout, rich glassmorphism elements, and fully fluid animations.",
            category: "Web Development",
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
            link: "https://github.com/Abdulrauf234",
            featured: false,
            order: 4,
          },
          {
            title: "Apex Esports Promo Film",
            description: "High-octane commercial video editing containing heavy visual effects, custom title animations, and dynamic audio synchronizations.",
            category: "Video Editing",
            imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
            link: "https://github.com/Abdulrauf234",
            featured: false,
            order: 5,
          },
          {
            title: "Hyperion Corporate Identity Set",
            description: "A cohesive premium design set including bespoke modern logos, social media templates, and business brand collaterals for a web design agency.",
            category: "Graphics Design",
            imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
            link: "https://github.com/Abdulrauf234",
            featured: false,
            order: 6,
          },
        ],
      });
      console.log("Database successfully seeded with premium projects.");
    }

    // Check if we need to seed promotions
    const promotionCount = await db.promotion.count();
    if (promotionCount === 0) {
      await db.promotion.createMany({
        data: [
          {
            title: "Brand Identity Launch Special",
            description: "Get a comprehensive corporate graphics and responsive landing page layout package. Limited to first 5 bookings.",
            discount: "25% OFF",
            code: "BRANDELITE25",
            active: true,
            link: "/contact",
          },
          {
            title: "Elite Short-Form Conversion Promo",
            description: "Submit a full-length YouTube video editing order and receive 2 highly engaging TikTok/Reels crop cuts absolutely free.",
            discount: "FREE BONUSES",
            code: "DYNAMICSHORTS",
            active: true,
            link: "/contact",
          },
        ],
      });
      console.log("Database successfully seeded with conversions promotions.");
    }
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}
