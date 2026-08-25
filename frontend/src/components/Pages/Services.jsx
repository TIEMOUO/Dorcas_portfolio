import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faCode, faPencilRuler, faRocket } from "@fortawesome/free-solid-svg-icons";
import AnimatedSection from "../Layout/AnimatedSection";

const services = [
  {
    id: 1,
    title: "UI/UX Design",
    description: "Création d'interfaces utilisateur intuitives et esthétiques. Wireframes, prototypes et design systems.",
    icon: faPalette,
    features: ["Wireframes", "Prototypage", "Design System", "User Research"],
  },
  {
    id: 2,
    title: "Développement Web",
    description: "Intégration frontend avec React, Angular et Tailwind CSS. Sites responsives et performants.",
    icon: faCode,
    features: ["React / Angular", "Tailwind CSS", "HTML5 / CSS3", "JavaScript ES6+"],
  },
  {
    id: 3,
    title: "Graphic Design",
    description: "Conception d'identités visuelles, logos, supports marketing et réseaux sociaux.",
    icon: faPencilRuler,
    features: ["Logo", "Branding", "Supports Print", "Réseaux Sociaux"],
  },
  {
    id: 4,
    title: "Product Design",
    description: "Vision produit complète, de l'idée à la mise sur le marché avec une approche centrée utilisateur.",
    icon: faRocket,
    features: ["Stratégie", "UX Research", "MVP", "Launch"],
  },
];

export default function Services() {
  return (
    <AnimatedSection>
    <section
      id="services"
      className="py-20 lg:py-28 bg-gray-50 dark:bg-[#0f1520] text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 
            style={{ fontFamily: "'Roboto Mono', monospace" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Mes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-accent-blue to-accent-cyan">Services</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-4 font-body">
            Des solutions créatives et techniques pour donner vie à vos projets digitaux.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group rounded-xl bg-white dark:bg-[#121624] border border-gray-200 dark:border-blue-400/20 p-6 hover:border-blue-500/50 dark:hover:border-blue-400/60 transition-all duration-500 hover:-translate-y-1 shadow-sm dark:shadow-lg flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white flex items-center justify-center mb-5 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={service.icon} className="text-xl" />
              </div>

              <h3 
                style={{ fontFamily: "'Roboto Mono', monospace" }}
                className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              >
                {service.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1 font-body">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-16">
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
            Commencer un projet
          </a>
          <a 
            href="#projects" 
            className="px-8 py-3.5 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold border border-gray-200 dark:border-white/10 rounded-xl transition-all duration-300 font-body"
          >
            Voir mes réalisations
          </a>
        </div>
      </div>
    </section>
    </AnimatedSection>
  );
}
