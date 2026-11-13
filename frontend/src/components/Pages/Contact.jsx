import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCheckCircle, faExclamationCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub, faBehance } from "@fortawesome/free-brands-svg-icons";
import AnimatedSection from "../Layout/AnimatedSection";

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/dorcas-tiemouo-166131351/", icon: faLinkedin },
  { name: "GitHub", href: "https://github.com/TIEMOUO", icon: faGithub },
  { name: "Behance", href: "https://www.behance.net/dorcastiemouo", icon: faBehance },
];

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // REMPLACE CES TROIS VALEURS PAR TES PROPRES CLÉS EMAILJS
    const SERVICE_ID = "service_t91dvni";
    const TEMPLATE_ID = "template_gdo0yno";
    const PUBLIC_KEY = "ROHSqAfsI3WCZbJG0";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          formRef.current.reset(); // Réinitialise le formulaire
        },
        (error) => {
          setLoading(false);
          setStatus("error");
          console.error("Erreur EmailJS:", error.text);
        }
      );
  };

  return (
    <AnimatedSection>
    <section
      id="contact"
      className="py-20 bg-gray-50 dark:bg-[#0d101d] text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* EN-TÊTE */}
        <div className="text-center mb-12">
          <h2 
            style={{ fontFamily: "'Roboto Mono', monospace" }} 
            className="text-4xl font-bold tracking-tight"
          >
            Me <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">Contacter.</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-body">
            Une question ou un projet en tête ? Envoyez-moi un message direct.
          </p>
        </div>

        {/* GRILLE À DEUX COLONNES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* FORMULAIRE */}
          <form 
            ref={formRef} 
            onSubmit={sendEmail} 
            className="space-y-6 bg-white dark:bg-[#131728] p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl"
          >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2 font-body">
                Nom complet
              </label>
              <input 
                type="text" 
                name="from_name" 
                required 
                placeholder="Dorcas Tiemouo" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm font-body transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2 font-body">
                Adresse Email
              </label>
              <input 
                type="email" 
                name="from_email" 
                required 
                placeholder="votre@email.com" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm font-body transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2 font-body">
              Message
            </label>
            <textarea 
              name="message" 
              rows="5" 
              required 
              placeholder="Bonjour Dorcas, je souhaite discuter d'un projet..." 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm font-body transition-colors resize-none"
            ></textarea>
          </div>

          {/* BOUTON D'ENVOI */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 font-body"
          >
            <FontAwesomeIcon icon={loading ? faSpinner : faPaperPlane} className={loading ? "animate-spin" : ""} />
            <span>{loading ? "Envoi du message..." : "Envoyer le message"}</span>
          </button>

          {/* NOTIFICATION D'ÉTAT */}
          {status === "success" && (
            <div className="p-4 rounded-xl text-sm flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 font-body">
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Votre message a été envoyé avec succès ! Je vous répondrai rapidement.</span>
            </div>
          )}

          {status === "error" && (
            <div className="p-4 rounded-xl text-sm flex items-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-body">
              <FontAwesomeIcon icon={faExclamationCircle} />
              <span>Une erreur est survenue lors de l'envoi. Veuillez réespayer ou me contacter directement par mail.</span>
            </div>
          )}
        </form>

          {/* INFORMATIONS PERSONNELLES */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#131728] p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl">
              <h3 className="text-xl font-bold mb-6 font-body">Mes coordonnées</h3>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-500 dark:text-blue-400">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-body">Email</p>
                    <a href="mailto:dorcastiemouo@gmail.com" className="text-sm font-medium hover:text-blue-500 transition-colors font-body">dorcastiemouo@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-500 dark:text-blue-400">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-body">Téléphone</p>
                    <a href="tel:+237659926363" className="text-sm font-medium hover:text-blue-500 transition-colors font-body">+237 6 59 92 63 63</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-500 dark:text-blue-400">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-body">Localisation</p>
                    <p className="text-sm font-medium font-body">Douala, Cameroun</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4 font-body">
                  Réseaux sociaux
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200 transition-colors hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400"
                    >
                      <FontAwesomeIcon icon={link.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    </AnimatedSection>
  );
}