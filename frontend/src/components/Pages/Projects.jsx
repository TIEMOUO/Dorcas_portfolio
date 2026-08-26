import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../services/api";
import AnimatedSection, { StaggerContainer, StaggerItem } from "../Layout/AnimatedSection";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const projectsPerPage = 2;

  const categories = [
    { id: "all", label: "Tous les projets" },
    { id: "uiux", label: "UI/UX Design" },
    { id: "web", label: "Développement Web" },
    { id: "graphic", label: "Graphic Design" },
    { id: "mobile", label: "Mobile" },
  ];

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));

  const displayedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <AnimatedSection>
    <section 
      id="projects" 
      className="py-20 lg:py-28 bg-white dark:bg-[#111827] text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 
            style={{ fontFamily: "'Roboto Mono', monospace" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Découvrez une sélection de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400">
              mes récents travaux.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <div className="lg:col-span-4 flex lg:flex-row justify-between items-stretch">
            <nav className="flex flex-row lg:flex-col flex-wrap gap-4 lg:gap-6 w-full pr-0 lg:pr-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleFilterChange(cat.id)}
                  className={`text-left text-sm sm:text-base font-medium transition-all duration-300 relative py-1 font-body ${
                    activeFilter === cat.id
                      ? "text-blue-600 dark:text-blue-400 font-bold tracking-wide"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {cat.label}
                  {activeFilter === cat.id && (
                    <span className="absolute left-0 bottom-0 w-12 h-[2px] bg-blue-500 dark:bg-blue-400 rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            <div className="hidden lg:block w-[1px] bg-gradient-to-b from-transparent via-blue-500/30 dark:via-blue-400/30 to-transparent self-stretch" />
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            )}

            {error && (
              <div className="text-center py-20 text-red-500">
                <p>Erreur: {error}</p>
              </div>
            )}

            {!loading && !error && (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6" staggerDelay={0.1}>
              {displayedProjects.map((project) => (
                <StaggerItem key={project.id}>
                  <div
                    className="group rounded-xl bg-white dark:bg-[#121624] border border-gray-200 dark:border-blue-400/20 hover:border-blue-500/50 dark:hover:border-blue-400/60 transition-all duration-500 overflow-hidden shadow-sm dark:shadow-lg flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="relative h-40 overflow-hidden bg-gray-100 dark:bg-[#0a0e17]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#121624] via-transparent to-transparent opacity-60" />
                      </div>

                      <div className="p-4 space-y-2.5">
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3
                          style={{ fontFamily: "'Roboto Mono', monospace" }}
                          className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1"
                        >
                          {project.title}
                        </h3>

                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 font-body">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-white/5 text-xs">
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold hover:underline font-body"
                      >
                        Voir le projet
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            )}

            {pageCount > 1 && (
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                {Array.from({ length: pageCount }, (_, index) => (
                  <button
                    key={index + 1}
                    type="button"
                    onClick={() => handlePageChange(index + 1)}
                    className={`w-10 h-10 rounded-full text-sm font-semibold transition font-body ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-[#111827] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-center gap-4 mt-8 pt-4">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 dark:via-blue-400/40 to-blue-500/80 dark:to-blue-400/80" />
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs">
                <span>✦</span>
                <span className="text-blue-500 dark:text-blue-300 text-sm">✦</span>
                <span>✦</span>
              </div>
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent via-blue-500/40 dark:via-blue-400/40 to-blue-500/80 dark:to-blue-400/80" />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="px-6 py-3 text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 font-body"
              >
                Demander un projet
              </a>
              <a
                href="#parcours"
                className="px-6 py-3 text-sm bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold border border-gray-200 dark:border-white/10 rounded-xl transition-all duration-300 font-body"
              >
                Voir mon parcours
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
    </AnimatedSection>
  );
}
