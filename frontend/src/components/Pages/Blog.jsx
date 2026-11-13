import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPalette, faCode, faBolt, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { blogs } from "../../data/blogs";
import AnimatedSection, { StaggerContainer, StaggerItem } from "../Layout/AnimatedSection";

const iconMap = {
  faPencil,
  faPalette,
  faCode,
  faBolt,
};

const upcomingTopics = [
  {
    title: 'Mon parcours vers le génie logiciel : de la conception au développement',
    category: 'Parcours',
  },
  {
    title: 'Architecture logicielle et architecture technique : quelles différences ?',
    category: 'Architecture logicielle',
  },
  {
    title: 'De la maquette Figma à l’intégration frontend',
    category: 'UI/UX Design',
  },
  {
    title: 'Comment utiliser l’intelligence artificielle comme assistant au développement ?',
    category: 'IA & développement',
  },
  {
    title: 'Les enseignements tirés de mes expériences en entreprise',
    category: 'Expériences professionnelles',
  },
];

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const blogsPerPage = 4;
  const categories = [
    { id: 'all', label: 'Tous les articles' },
    ...Array.from(new Set(blogs.map((post) => post.category))).map((category) => ({
      id: category,
      label: category,
    })),
  ];
  const filteredBlogs =
    activeCategory === 'all'
      ? blogs
      : blogs.filter((post) => post.category === activeCategory);
  const pageCount = Math.ceil(filteredBlogs.length / blogsPerPage);
  const displayedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage,
  );

  return (
    <AnimatedSection>
    <section
      id="blog"
      className="py-20 lg:py-28 bg-white dark:bg-[#111827] text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 
            style={{ fontFamily: "'Roboto Mono', monospace" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Mon <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400">Blog</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-4 font-body">
            Des idées, des expériences et des connaissances à partager.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8" aria-label="Filtrer les articles par catégorie">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={activeCategory === category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setCurrentPage(1);
              }}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors font-body ${
                activeCategory === category.id
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {displayedBlogs.map((post) => (
            <StaggerItem key={post.id}>
              <article
                className="group rounded-xl bg-white dark:bg-[#121624] border border-gray-200 dark:border-blue-400/20 hover:border-blue-500/50 dark:hover:border-blue-400/60 transition-all duration-500 overflow-hidden shadow-sm dark:shadow-lg hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="p-5 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={iconMap[post.icon] || faCode} className="text-sm text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/20">
                      {post.category}
                    </span>
                  </div>

                  <h3
                    style={{ fontFamily: "'Roboto Mono', monospace" }}
                    className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 leading-tight"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 font-body">
                    {post.excerpt}
                  </p>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-400 font-body">
                    <time dateTime={post.date}>
                      {new Date(`${post.date}T12:00:00`).toLocaleDateString("fr-FR")}
                    </time>
                    <span>•</span>
                    <span>{post.read_time}</span>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-body"
                  >
                    Lire
                    <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {pageCount > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentPage(index + 1)}
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

        <section className="mt-16 border-t border-gray-200 dark:border-white/10 pt-10" aria-labelledby="upcoming-blog-topics">
          <div className="text-center mb-8">
            <h3
              id="upcoming-blog-topics"
              style={{ fontFamily: "'Roboto Mono', monospace" }}
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
            >
              Sujets à préparer
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-body">
              Quelques pistes pour les prochains articles — elles ne sont pas encore publiées.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingTopics.map((topic) => (
              <article
                key={topic.title}
                className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121624] p-5"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {topic.category}
                </span>
                <h4 className="mt-2 text-sm font-semibold leading-relaxed text-gray-900 dark:text-white font-body">
                  {topic.title}
                </h4>
                <span className="mt-4 inline-flex rounded-full bg-gray-200/70 dark:bg-white/5 px-3 py-1 text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                  À préparer
                </span>
              </article>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-center gap-4 mt-12">
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
            S'abonner au blog
          </a>
          <a
            href="#projects"
            className="px-6 py-3 text-sm bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold border border-gray-200 dark:border-white/10 rounded-xl transition-all duration-300 font-body"
          >
            Explorer mes projets
          </a>
        </div>
      </div>
    </section>
    </AnimatedSection>
  );
}
