import Navbar from "@/components/Navbar";
import HeroSwiper from "@/components/HeroSwiper";
import Categories from "@/components/Categories";
import FeaturedProjects from "@/components/FeaturedProjects";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import AnimationPlay from "@/components/AnimationPlay";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Abdulrauf Saleh | Premium Web & Graphics Design Solutions",
  description: "Bespoke high-performance web development, cinematic video editing, and premium graphic design architectures optimized to maximize customer trust and sales conversions.",
  keywords: "Web Development, Video Editing, Graphics Design, Brand Identity, Next.js developer, Port Harcourt, Lagos, Nigeria, Freelance Designer",
  openGraph: {
    title: "Abdulrauf Saleh | Premium Web & Graphics Design Solutions",
    description: "Bespoke high-performance web development, cinematic video editing, and premium graphic design architectures optimized to maximize customer trust and sales conversions.",
    url: "https://github.com/Abdulrauf234",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSwiper />
        <Categories />
        <FeaturedProjects />
        <Benefits />
        <Testimonials />
        <AnimationPlay />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
