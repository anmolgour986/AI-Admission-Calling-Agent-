import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import Stats from "../components/home/Stats";
import About from "../components/home/About";
import Contact from "../components/home/Contact";
import Footer from "../components/home/Footer";

const Home = () => {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;