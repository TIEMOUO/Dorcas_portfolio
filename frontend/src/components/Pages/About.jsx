import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faPen, faCode, faDatabase, faVideo, faLock, faRocket, faLayerGroup, faFileCode } from "@fortawesome/free-solid-svg-icons";
import { faFigma, faGithub, faReact, faNodeJs } from "@fortawesome/free-brands-svg-icons";
import { getSkills } from "../../services/api";
import AnimatedSection from "../Layout/AnimatedSection";

const iconMap = {
  faPalette,
  faPen,
  faCode,
  faDatabase,
  faVideo,
  faRocket,
  faLayerGroup,
  faFileCode,
  faFigma,
  faGithub,
  faReact,
  faNodeJs,
};

export default function About() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const data = await getSkills();
        setSkills(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  const masteredSkills = skills.filter(s => s.mastered);
  const lockedSkills = skills.filter(s => !s.mastered);

  return (
    <AnimatedSection>
    <section 
      id="about" 
      className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-[#0d101d] dark:to-[#0b0d14] text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* EN-TÊTE DE LA SECTION */}
        <div className="text-center mb-16">
          <h2 
            style={{ fontFamily: "'Roboto Mono', monospace" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            À <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400">propos de moi.</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-4 font-body">
            Mon histoire, ma vision et mes compétences
          </p>
        </div>

        <div className="w-full items-center mb-20">

          {/* TEXTE À CÔTÉ DE LA PHOTO */}
          <div className="lg:col-span-7 space-y-6">
            <h3 
              style={{ fontFamily: "'Roboto Mono', monospace" }}
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-snug"
            >
              Passionnée par la création numérique et l'ingénierie logicielle.
            </h3>

            <p className="text-justify text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-body">
              Je suis Dorcas, une passionnée de création numérique qui aime donner forme aux idées. 
              Mon parcours se situe à la croisée du design, du développement web et de la conception de produits, 
              avec une même envie derrière chacun de mes projets : comprendre un besoin, imaginer une solution 
              et la transformer en quelque chose de concret.
            </p>

            <p className="text-justify text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-body">
              J'ai commencé par le design et la conception d'interfaces, ce qui m'a appris à accorder de l'importance 
              aux détails, à la simplicité et à l'expérience utilisateur. Aujourd'hui, je développe mes compétences en ingénierie 
              logicielle pour aller plus loin et participer à la construction d'un produit de l'idée jusqu'à sa réalisation.
            </p>
          </div>

        </div>

        {/* SECTION COMPÉTENCES */}
        <div className="w-full pt-12 border-t border-gray-200 dark:border-white/10 space-y-8">
          <div className="text-center">
            <h3 
              style={{ fontFamily: "'Roboto Mono', monospace" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              Mes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400">Compétences.</span>
            </h3>
          </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {masteredSkills.map((skill, index) => (
              <div
                key={`mastered-${index}`}
                className="group flex items-center justify-start gap-3 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-blue-500/10 dark:bg-blue-500/10 text-gray-900 dark:text-blue-200 border border-blue-500/20 dark:border-blue-500/30 hover:border-blue-500 shadow-sm transform hover:-translate-y-1 transition-all duration-300 font-body"
              >
                <FontAwesomeIcon icon={iconMap[skill.icon] || faCode} className="text-base group-hover:scale-125 transition-transform text-blue-600 dark:text-blue-400" />
                <span className="truncate">{skill.name}</span>
              </div>
            ))}

            {lockedSkills.map((skill, index) => (
              <div
                key={`locked-${index}`}
                className="flex items-center justify-start gap-3 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-medium bg-gray-200/60 dark:bg-[#131622] text-gray-500 dark:text-gray-500 border border-gray-300/80 dark:border-white/5 opacity-75 font-body"
              >
                <FontAwesomeIcon icon={iconMap[skill.icon] || faLock} className="text-sm text-blue-600/70 dark:text-blue-400/50" />
                <span className="truncate">{skill.name}</span>
              </div>
            ))}
          </div>
          )}

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#projects" 
              className="px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 font-body"
            >
              Voir mes projets
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3.5 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold border border-gray-200 dark:border-white/10 rounded-xl transition-all duration-300 font-body"
            >
              Discutons ensemble
            </a>
          </div>
        </div>

      </div>
    </section>
    </AnimatedSection>
  );
}