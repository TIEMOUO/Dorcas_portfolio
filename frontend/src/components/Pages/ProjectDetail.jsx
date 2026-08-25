import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProjectById } from '../../services/api';
import AnimatedSection from '../Layout/AnimatedSection';

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-[#0b0d14] text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-[#0b0d14] text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-red-500 dark:text-red-400 mb-4">
            Erreur
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            {error}
          </h1>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition"
          >
            Retour à la page de projets
          </button>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-[#0b0d14] text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500 dark:text-blue-400 mb-4">
            Projet introuvable
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            Oups, ce projet n'existe pas.
          </h1>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition"
          >
            Retour à la page de projets
          </button>
        </div>
      </section>
    );
  }

  return (
    <AnimatedSection>
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-gray-50 dark:bg-[#0a1628] text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden border-b border-gray-200 dark:border-white/5 pb-16 lg:pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        
        <span 
          style={{ fontFamily: "'Roboto Mono', monospace" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] sm:text-[400px] lg:text-[500px] font-black italic text-gray-900/[0.03] dark:text-white/[0.015] select-none pointer-events-none leading-none z-0"
        >
          D
        </span>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full relative z-10 pt-20">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 mb-10 transition-colors"
          >
            <span className="text-lg">←</span>
            Retour aux projets
          </button>

          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-500 dark:text-blue-400 font-mono">
              Projet {project.id}
            </p>
            <h1 
              style={{ fontFamily: "'Roboto Mono', monospace" }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              {project.title}
            </h1>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl">
              {project.long_description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-400/10 rounded-full px-4 py-1.5 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition shadow-lg shadow-blue-500/20"
                >
                  Voir la démo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-white/5 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
                >
                  Github
                </a>
              )}
              {project.figma && (
                <a
                  href={project.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-white/5 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
                >
                  Figma
                </a>
              )}
              {project.behance && (
                <a
                  href={project.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-white/5 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
                >
                  Behance
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-[#0b0d14] text-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid gap-4">
            {(project.screenshots || []).map((screenshot, index) => (
              <div key={index} className="overflow-hidden rounded-3xl bg-[#f8fafc] dark:bg-[#121624] border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-black/20">
                <img
                  src={screenshot.image}
                  alt={`${project.title} capture ${index + 1}`}
                  className="w-full h-72 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}