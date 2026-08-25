import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Retour en haut"
          className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
        >
          <FontAwesomeIcon icon={faChevronUp} className="text-lg" />
        </button>
      )}
    </>
  );
}
