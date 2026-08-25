import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faFigma, faBehance } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/TIEMOUO", icon: faGithub },
    { name: "LinkedIn", href: "https://linkedin.com/in/ton-profil", icon: faLinkedin },
    { name: "Figma", href: "https://figma.com", icon: faFigma },
    { name: "Behance", href: "https://www.behance.net/dorcastiemouo", icon: faBehance },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-[#0a1628] text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-blue-500/20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-300 dark:border-white/10">
          
          {/* IDENTITÉ */}
          <div className="text-center md:text-left space-y-2">
            <a href="#" className="text-2xl font-extrabold text-gray-900 dark:text-white">
              D.<span className="text-blue-500">orcas</span>
            </a>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md font-body">
              Design UI/UX, développement web & ingénierie logicielle.
            </p>
          </div>

          {/* ICÔNES DES RÉSEAUX SOCIAUX */}
          <div className="flex items-center gap-3">
            {socialLinks.map((network) => (
              <a
                key={network.name}
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={network.name}
                className="w-10 h-10 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 shadow-sm"
              >
                <FontAwesomeIcon icon={network.icon} className="text-base" />
              </a>
            ))}
          </div>

        </div>

        {/* BAS DU FOOTER */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-3 font-body">
          <p>© {currentYear} Dorcas TIEMOUO. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Conçu avec React & Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
}