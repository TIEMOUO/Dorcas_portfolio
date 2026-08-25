import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function WhatsApp() {
  const whatsappNumber = "237659926363";
  const message = "Bonjour Dorcas, je souhaite discuter d'un projet avec vous.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20BA5C] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 animate-bounce"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
    </a>
  );
}
