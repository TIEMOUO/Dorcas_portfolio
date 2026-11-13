import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '#' },
    { name: 'À propos', href: '#about' },
    {name:'Mon parcours', href:'#parcours'},
    { name: 'Projets', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#0a1628]/90 backdrop-blur-md border-b border-gray-200 dark:border-blue-500/20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
{/* LOGO DESIGNÉ (Simple) */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-2xl font-extrabold tracking-tight text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">
            D.<span className="text-gray-900 dark:text-white">orcas</span>
          </span>
        </a>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden lg:flex items-center space-x-7">
          {/* Liens avec animation hover */}
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 relative py-1 group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300 ease-out group-hover:w-full rounded-full" />
              </a>
            ))}
          </div>

          <div className="h-5 w-[1px] bg-gray-200 dark:bg-white/10 mx-2 transition-colors" />

          {/* Bouton changement de thème */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 bg-gray-100 dark:bg-white/5 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 border border-gray-200 dark:border-white/10 rounded-xl transition-all duration-200"
            aria-label="Changer de thème"
          >
            <i className={theme === 'dark' ? 'fas fa-circle-half-stroke  text-blue-400' : 'fas fa-moon text-blue-100'} aria-hidden="true" />
          </button>

          

          {/* BOUTON 2 : Me Contact (Bleu Plein) */}
          {/* <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-accent-blue hover:bg-blue-600 rounded-xl transition-all duration-300 shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 hover:-translate-y-0.5"
          >
            Me contacter
          </a> */}
        </nav>

        {/* CONTROLES MOBILE */}
        <div className="flex items-center space-x-3 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 rounded-lg transition-all duration-200"
            aria-label="Changer de thème"
          >
            <i className={theme === 'dark' ? 'fas fa-circle-half-stroke text-blue-400' : 'fas fa-moon text-blue-500'} aria-hidden="true" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200"
            aria-label="Menu principal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* NAVIGATION MOBILE (DRAWER) */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0a1628] border-b border-gray-200 dark:border-white/10 px-6 py-6 space-y-4 transition-colors">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:pl-1 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
          
          <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-white/10">
            <a
              href="/images/CV_TIEMOUO_DJIOLIO_DORCAS.pdf"
              download="CV_TIEMOUO_DJIOLIO_DORCAS.pdf"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center px-4 py-2.5 text-sm font-semibold text-blue-500 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/30 dark:border-blue-400/30 rounded-xl"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            Télécharger mon CV
            </a>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20"
            >
              Me contacter
            </a>
          </div>
        </div>
      )}
    </header>
  );
}