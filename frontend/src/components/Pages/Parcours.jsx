import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faSchool, faBook } from "@fortawesome/free-solid-svg-icons";
import { faBuilding, faPalette, faPencil, faChartLine, faRocket, faBolt } from "@fortawesome/free-solid-svg-icons";
import AnimatedSection from "../Layout/AnimatedSection";

export default function Parcours() {
  const academicData = [
    {
      period: "2021 – 2022",
      title: "Baccalauréat TI",
      location: "Lycée Bilingue de Bafoussam",
      tag: "Diplôme",
      icon: faGraduationCap,
    },
    {
      period: "2022 – 2024",
      title: "DUT Génie Logiciel",
      location: "JFN-HUI",
      tag: "Formation",
      icon: faSchool,
    },
    {
      period: "2024 – Présent",
      title: "Cycle Ingénieur ENSPD",
      location: "ENSPD",
      tag: "Ingénieur",
      icon: faBook,
    },
  ];

  const experienceData = [
    {
      period: "2021",
      title: "Stage BEAC",
      location: "BEAC",
      tag: "Analyse",
      description: "Modélisation MERISE",
      icon: faBuilding,
    },
    {
      period: "2023",
      title: "Product Designer",
      location: "GESTA",
      tag: "UI/UX",
      description: "Identité visuelle",
      icon: faPalette,
    },
    {
      period: "2023",
      title: "Designer Graphique",
      location: "BALACCUL",
      tag: "Branding",
      description: "Supports digitaux",
      icon: faPencil,
    },
    {
      period: "2024",
      title: "Stage CENADI",
      location: "CENADI",
      tag: "Web Dev",
      description: "HTML, CSS, JS",
      icon: faChartLine,
    },
    {
      period: "2025",
      title: "Projets Angular",
      location: "ENSPD",
      tag: "Frontend",
      description: "Tests & Collab",
      icon: faBolt,
    },
    {
      period: "2026",
      title: "Stage Afrikpay",
      location: "Afrikpay",
      tag: "Figma",
      description: "UI/UX & Angular",
      icon: faRocket,
    },
  ];

  const [currentPage, setCurrentPage] = React.useState(0);
  const cardsPerPage = 2;
  const totalPages = Math.ceil(experienceData.length / cardsPerPage);

  return (
    <AnimatedSection>
    <section
      id="parcours"
      className="py-20 lg:py-28 bg-gray-100 dark:bg-[#0a0e17] text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 
            style={{ fontFamily: "'Roboto Mono', monospace" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Mon <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-accent-blue to-accent-cyan">Parcours</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto font-body">
            Formation académique et expériences professionnelles.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-xs sm:text-sm font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-8 text-center">
            Parcours Académique
          </h3>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500/30 transform -translate-x-1/2" />

            {academicData.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className="relative mb-8 last:mb-0 h-16"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white dark:text-gray-950 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <FontAwesomeIcon icon={item.icon} className="text-sm" />
                    </div>
                  </div>

                  {isLeft ? (
                    <div className="absolute left-1/2 transform -translate-x-full pr-6 flex justify-end">
                      <div className="flex flex-col items-end max-w-xs">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                            {item.period}
                          </span>
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/20">
                            {item.tag}
                          </span>
                        </div>
                        <h4 
                          style={{ fontFamily: "'Roboto Mono', monospace" }}
                          className="text-base font-bold text-gray-900 dark:text-white"
                        >
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-body">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute left-1/2 transform translate-x-0 pl-6 flex justify-start">
                      <div className="flex flex-col items-start max-w-xs">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                            {item.period}
                          </span>
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/20">
                            {item.tag}
                          </span>
                        </div>
                        <h4 
                          style={{ fontFamily: "'Roboto Mono', monospace" }}
                          className="text-base font-bold text-gray-900 dark:text-white"
                        >
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-body">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-xs sm:text-sm font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-8 text-center">
            Expériences Professionnelles
          </h3>

          <div className="relative">
            <div className="hidden lg:flex justify-center">
              <div className="flex gap-4 min-w-max px-10">
                {experienceData.map((item, index) => (
                  <div key={index} className="relative group flex-shrink-0">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-3 w-full">
                        {index !== 0 && (
                          <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500/60 to-transparent dark:from-blue-400/60" />
                        )}
                        
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white dark:text-gray-950 flex items-center justify-center shadow-lg shadow-blue-500/30 dark:shadow-blue-400/30 group-hover:scale-110 transition-transform duration-300 z-10">
                          <FontAwesomeIcon icon={item.icon} className="text-xs" />
                        </div>
                        
                        {index !== experienceData.length - 1 && (
                          <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500/60 to-blue-500/30 dark:from-blue-400/60 dark:to-blue-400/30" />
                        )}
                      </div>

                      <div className="mt-3 w-36 p-3 rounded-lg bg-white dark:bg-[#121624] border border-gray-200 dark:border-blue-400/20 shadow-sm dark:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-400/60 transition-all duration-300 hover:-translate-y-1">
                        <div className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">
                          {item.period}
                        </div>
                        <h4 
                          style={{ fontFamily: "'Roboto Mono', monospace" }}
                          className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight"
                        >
                          {item.title}
                        </h4>
                        <div className="text-[8px] text-gray-500 dark:text-gray-400 mt-0.5 font-body">
                          {item.location}
                        </div>
                        <p className="text-[9px] text-gray-600 dark:text-gray-400 leading-tight mt-1.5 font-body">
                          {item.description}
                        </p>
                        <span className="inline-block mt-2 text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/20 font-semibold">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:hidden px-4">
              <div className="flex justify-center gap-4">
                {experienceData.slice(currentPage * cardsPerPage, currentPage * cardsPerPage + cardsPerPage).map((item, idx) => {
                  const actualIndex = currentPage * cardsPerPage + idx;
                  return (
                    <div key={actualIndex} className="relative group flex-shrink-0">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white dark:text-gray-950 flex items-center justify-center shadow-lg shadow-blue-500/30 dark:shadow-blue-400/30 group-hover:scale-110 transition-transform duration-300 z-10">
                          <FontAwesomeIcon icon={item.icon} className="text-xs" />
                        </div>

                        <div className="mt-3 w-36 p-3 rounded-lg bg-white dark:bg-[#121624] border border-gray-200 dark:border-blue-400/20 shadow-sm dark:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-400/60 transition-all duration-300 hover:-translate-y-1">
                          <div className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">
                            {item.period}
                          </div>
                          <h4 
                            style={{ fontFamily: "'Roboto Mono', monospace" }}
                            className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight"
                          >
                            {item.title}
                          </h4>
                          <div className="text-[8px] text-gray-500 dark:text-gray-400 mt-0.5 font-body">
                            {item.location}
                          </div>
                          <p className="text-[9px] text-gray-600 dark:text-gray-400 leading-tight mt-1.5 font-body">
                            {item.description}
                          </p>
                          <span className="inline-block mt-2 text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/20 font-semibold">
                            {item.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-3 mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-8 h-8 rounded-full font-mono font-bold text-xs transition-all duration-300 ${
                      currentPage === i
                        ? "bg-blue-500 dark:bg-blue-400 text-white dark:text-gray-950"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-500/20 dark:hover:bg-blue-400/20"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 dark:via-blue-400/40 to-blue-500/80 dark:to-blue-400/80" />
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs">
            <span>✦</span>
            <span className="text-blue-500 dark:text-blue-300 text-sm">✦</span>
            <span>✦</span>
          </div>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent via-blue-500/40 dark:via-blue-400/40 to-blue-500/80 dark:to-blue-400/80" />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#contact" 
            className="px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 font-body"
          >
            Travaillons ensemble
          </a>
          <a 
            href="#projects" 
            className="px-8 py-3.5 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold border border-gray-200 dark:border-white/10 rounded-xl transition-all duration-300 font-body"
          >
            Voir mes projets
          </a>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
    </AnimatedSection>
  );
}
