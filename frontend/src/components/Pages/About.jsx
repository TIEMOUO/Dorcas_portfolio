import { skillCategories } from "../../data/skills";
import AnimatedSection, { StaggerContainer, StaggerItem } from "../Layout/AnimatedSection";

export default function About() {
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
        <div id="skills" className="w-full pt-12 border-t border-gray-200 dark:border-white/10 space-y-8 scroll-mt-24">
          <div className="text-center">
            <h3 
              style={{ fontFamily: "'Roboto Mono', monospace" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              Mes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400">Compétences.</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 font-body">
              Des domaines et des outils mobilisés au fil de mes projets et de mon apprentissage.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
            {skillCategories.map((category) => (
              <StaggerItem key={category.id}>
                <article className="h-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#131728] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 dark:hover:border-blue-400/40">
                  <h4
                    style={{ fontFamily: "'Roboto Mono', monospace" }}
                    className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-4"
                  >
                    {category.title}
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-lg border border-blue-500/20 dark:border-blue-400/20 bg-blue-500/5 dark:bg-blue-400/5 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 font-body"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="px-6 py-3 text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 font-body"
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className="px-6 py-3 text-sm bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold border border-gray-200 dark:border-white/10 rounded-xl transition-all duration-300 font-body"
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