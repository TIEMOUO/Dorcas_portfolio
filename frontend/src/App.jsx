import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import GoToTop from './components/Layout/GoToTop';
import WhatsApp from './components/Layout/WhatsApp';
import PageTransition from './components/Layout/PageTransition';
import Hero from './components/Pages/Hero';
import About from './components/Pages/About';
import Projects from './components/Pages/Projects';
import ProjectDetail from './components/Pages/ProjectDetail';
import Parcours from './components/Pages/Parcours';
import Blog from './components/Pages/Blog';
import BlogDetail from './components/Pages/BlogDetail';
import Services from './components/Pages/Services';
import Contact from './components/Pages/Contact';

function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <About />
      <Projects />
      <Parcours/>
      <Services/>
      <Blog/>
      <Contact/>
    </PageTransition>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0b0d14] text-gray-900 dark:text-white font-sans flex flex-col justify-between transition-colors duration-300">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:projectId" element={<PageTransition><ProjectDetail /></PageTransition>} />
            <Route path="/blog/:blogId" element={<PageTransition><BlogDetail /></PageTransition>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <GoToTop />
        <WhatsApp />
      </div>
    </BrowserRouter>
  );
}