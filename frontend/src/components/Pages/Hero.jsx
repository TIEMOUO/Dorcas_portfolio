import React from "react";
import AnimatedSection from "../Layout/AnimatedSection";

export default function Hero() {
  const technologies = [
    { name: "React", icon: "fa-brands fa-react" },
    { name: "Angular", icon: "fa-brands fa-angular" },
    { name: "JavaScript", icon: "fa-brands fa-js" },
    { name: "Tailwind CSS", icon: "fa-brands fa-tailwind" },
    { name: "Bootstrap", icon: "fa-brands fa-bootstrap" },
    { name: "Git", icon: "fa-brands fa-git-alt" },
    { name: "GitHub", icon: "fa-brands fa-github" },
    { name: "Figma", icon: "fa-brands fa-figma" },
    { name: "Python", icon: "fa-brands fa-python" },
  ];

  return (
    <AnimatedSection>
      <style>{`
        /* ================================
           ARC ANIMATIONS
        ================================= */

        @keyframes dynamic-arc-1 {
          0% {
            transform: rotate(-45deg) scale(0.98);
          }

          50% {
            transform: rotate(50deg) scale(1.05);
          }

          100% {
            transform: rotate(-45deg) scale(0.98);
          }
        }

        @keyframes dynamic-arc-2 {
          0% {
            transform: rotate(45deg) scale(1.04);
          }

          50% {
            transform: rotate(-50deg) scale(0.97);
          }

          100% {
            transform: rotate(45deg) scale(1.04);
          }
        }

        .animate-arc-dynamic-1 {
          animation: dynamic-arc-1 3.2s cubic-bezier(0.45, 0.05, 0.55, 0.95)
            infinite;
          transform-origin: center;
        }

        .animate-arc-dynamic-2 {
          animation: dynamic-arc-2 3.8s cubic-bezier(0.45, 0.05, 0.55, 0.95)
            infinite;
          transform-origin: center;
        }

        /* ================================
           TECHNOLOGY CAROUSEL
        ================================= */

        @keyframes technology-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .technology-track {
          animation: technology-scroll 30s linear infinite;
          width: max-content;
        }

        .technology-track:hover {
          animation-play-state: paused;
        }

        /* ================================
           SOFT NEON
        ================================= */

        @keyframes soft-pulse {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(1);
          }

          50% {
            opacity: 0.7;
            transform: scale(1.08);
          }
        }

        .soft-neon {
          animation: soft-pulse 4s ease-in-out infinite;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-arc-dynamic-1,
          .animate-arc-dynamic-2,
          .technology-track,
          .soft-neon {
            animation: none;
          }
        }
      `}</style>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          min-h-[680px]
          lg:min-h-[720px]
          flex
          flex-col
          bg-[#0a1628]
          dark:bg-[#0a1628]
          bg-white
          text-white
          dark:text-white
          text-gray-900
          overflow-hidden
          rounded-b-[15px]
          border-b border-white/5
          dark:border-white/5
          border-gray-200
          font-['Poppins',sans-serif]
        "
      >

        {/* ================================
            BACKGROUND GRID
        ================================= */}

        <div
          className="
            absolute
            inset-0
            pointer-events-none
            opacity-0
            dark:opacity-60
            hidden
            dark:block
          "
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.025) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255,255,255,0.025) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="
            absolute
            inset-0
            pointer-events-none
            opacity-5
            block
            dark:hidden
          "
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(0,0,0,0.1) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.1) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* ================================
            LARGE BACKGROUND D
        ================================= */}

        <span
          style={{ fontFamily: "'Roboto Mono', monospace" }}
          className="
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            text-[350px]
            sm:text-[500px]
            lg:text-[700px]
            font-black
            italic
            text-white/[0.018]
            dark:text-white/[0.018]
            text-gray-200/[0.03]
            select-none
            pointer-events-none
            leading-none
          "
        >
          D
        </span>

        {/* ================================
            DECORATIVE STARS LEFT
        ================================= */}

        <div
          className="
            hidden
            lg:flex
            absolute
            left-7
            top-1/2
            -translate-y-1/2
            flex-col
            gap-4
            text-blue-400/50
            dark:text-blue-400/50
            text-gray-400/30
            text-xs
          "
        >
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>

        {/* ================================
            DECORATIVE STARS RIGHT
        ================================= */}

        <div
          className="
            hidden
            lg:flex
            absolute
            right-7
            top-1/2
            -translate-y-1/2
            flex-col
            gap-4
            text-blue-400/50
            dark:text-blue-400/50
            text-gray-400/30
            text-xs
          "
        >
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div
          id="home"
          className="
            relative
            z-10
            flex-1
            w-full
            max-w-6xl
            mx-auto
            px-6
            sm:px-8
            lg:px-10
            flex
            items-center
          "
        >

          <div
            className="
              w-full
              grid
              grid-cols-1
              lg:grid-cols-2
              items-center
              gap-8
              lg:gap-4
              pt-14
              pb-12
            "
          >

            {/* =================================================
                LEFT — TEXT
            ================================================= */}

            <div
              className="
                text-center
                lg:text-left
                max-w-xl
                mx-auto
                lg:mx-0
              "
            >

              {/* MAIN TITLE */}

              <h1
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                }}
                className="
                  text-4xl
                  sm:text-5xl
                  lg:text-[52px]
                  xl:text-[64px]
                  font-bold
                  leading-[1.05]
                  tracking-tight
                  text-blue-400
                  dark:text-white
                  text-gray-900
                "
              >
                Hey, Je suis{" "}
                <span className="text-blue-400 dark:text-blue-400 text-blue-600 mb-6">
                  Dorcas  TIEMOUO
                </span>
                
              </h1>

              {/* PROFESSION */}

              <h2
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                }}
                className="
                  mt-3
                  text-lg
                  sm:text-xl
                  lg:text-2xl
                  font-bold
                  text-blue-400
                  dark:text-blue-400
                  text-blue-600
                "
              >
                Software Engineer
                <span className="animate-pulse">|</span>
              </h2>

              {/* SHORT DESCRIPTION */}

              <p
                className="
                  mt-5
                  max-w-lg
                  mx-auto
                  lg:mx-0
                  text-sm
                  sm:text-[15px]
                  leading-7
                  text-gray-400
                  dark:text-gray-400
                  text-gray-600
                "
              >
                Je conçois des applications web modernes,
                intuitives et performantes, à la croisée de
                la technologie et du design.
              </p>

              {/* QUICK INFOS */}

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  justify-center
                  lg:justify-start
                  gap-2
                "
              >
                <span
                  className="
                    px-3
                    py-1.5
                    rounded-full
                    border
                    border-white/10
                    dark:border-white/10
                    border-gray-300
                    bg-white/5
                    dark:bg-white/5
                    bg-gray-100
                    text-[10px]
                    font-['Roboto_Mono']
                    text-gray-300
                    dark:text-gray-300
                    text-gray-700
                  "
                >
                  Web Development
                </span>

                <span
                  className="
                    px-3
                    py-1.5
                    rounded-full
                    border
                    border-white/10
                    dark:border-white/10
                    border-gray-300
                    bg-white/5
                    dark:bg-white/5
                    bg-gray-100
                    text-[10px]
                    font-['Roboto_Mono']
                    text-gray-300
                    dark:text-gray-300
                    text-gray-700
                  "
                >
                  UI / UX
                </span>

                <span
                  className="
                    px-3
                    py-1.5
                    rounded-full
                    border
                    border-white/10
                    dark:border-white/10
                    border-gray-300
                    bg-white/5
                    dark:bg-white/5
                    bg-gray-100
                    text-[10px]
                    font-['Roboto_Mono']
                    text-gray-300
                    dark:text-gray-300
                    text-gray-700
                  "
                >
                Entrepreuneure Tech
                </span>
              </div>

              {/* DESKTOP ONLY: BUTTONS + SOCIAL LINKS */}

              <div className="hidden lg:flex flex-col items-start gap-4 mt-8">

                {/* BUTTONS */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    justify-center
                    lg:justify-start
                    gap-3
                  "
                >

                  <a
                    href="#projects"
                    className="
                      px-6
                      py-3
                      bg-blue-500
                      hover:bg-blue-600
                      text-white
                      text-xs
                      font-semibold
                      rounded-lg
                      transition-all
                      duration-300
                      shadow-lg
                      shadow-blue-500/20
                      hover:-translate-y-0.5
                    "
                  >
                    Voir mes projets
                  </a>

                  <a
                    href="/images/CV_TIEMOUO_DJIOLIO_DORCAS.pdf"
                    download="CV_TIEMOUO_DJIOLIO_DORCAS.pdf"
                    className="
                      px-6
                      py-3
                      border
                      border-white/10
                      dark:border-white/10
                      border-gray-400
                      bg-white/10
                      dark:bg-white/5
                      hover:bg-white/10
                      dark:hover:bg-white/10
                      hover:bg-gray-200
                      text-base
                      dark:text-white
                      text-gray-800
                      text-xs
                      font-semibold
                      rounded-lg
                      transition-all
                      duration-300
                    "
                  >
                    Télécharger mon CV
                  </a>

                </div>

                {/* SOCIAL LINKS */}

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    lg:justify-start
                    gap-5
                  "
                >

                  <a
                    href="https://www.linkedin.com/in/dorcas-tiemouo-166131351/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="
                      text-gray-500
                      dark:text-gray-400
                      text-gray-600
                      hover:text-blue-400
                      dark:hover:text-blue-400
                      transition-colors
                      duration-300
                      text-lg
                    "
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>

                  <a
                    href="https://github.com/TIEMOUO"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="
                      text-gray-500
                      dark:text-gray-400
                      text-gray-600
                      hover:text-blue-400
                      dark:hover:text-blue-400
                      transition-colors
                      duration-300
                      text-lg
                    "
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>

                  <a
                    href="https://www.behance.net/dorcastiemouo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Behance"
                    className="
                      text-gray-500
                      dark:text-gray-400
                      text-gray-600
                      hover:text-blue-400
                      dark:hover:text-blue-400
                      transition-colors
                      duration-300
                      text-lg
                    "
                  >
                    <i className="fa-brands fa-behance"></i>
                  </a>

                  <a
                    href="#contact"
                    aria-label="Email"
                    className="
                      text-gray-500
                      dark:text-gray-400
                      text-gray-600
                      hover:text-blue-400
                      dark:hover:text-blue-400
                      transition-colors
                      duration-300
                      text-lg
                    "
                  >
                    <i className="fa-solid fa-envelope"></i>
                  </a>

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT — PHOTO + ANIMATED ARCS
            ================================================= */}

            <div
              className="
                relative
                flex
                items-center
                justify-center
                min-h-[300px]
                sm:min-h-[350px]
                lg:min-h-[500px]
              "
            >

              {/* BLUE NEON GLOW */}

              <div
                className="
                  soft-neon
                  absolute
                  w-64
                  h-64
                  sm:w-80
                  sm:h-80
                  lg:w-[400px]
                  lg:h-[400px]
                  rounded-full
                  bg-blue-500/20
                  blur-[90px]
                  pointer-events-none
                "
              />

              {/* IMAGE + ARCS CONTAINER */}

              <div
                className="
                  relative
                  w-[310px]
                  h-[310px]
                  sm:w-[370px]
                  sm:h-[370px]
                  lg:w-[440px]
                  lg:h-[440px]
                  flex
                  items-center
                  justify-center
                "
              >

                {/* ARC 1 */}

                <svg
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    animate-arc-dynamic-1
                    pointer-events-none
                    text-blue-400
                    drop-shadow-[0_0_12px_rgba(96,165,250,0.45)]
                  "
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  <path
                    d="M 18,100 A 82,82 0 0,1 182,100"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </svg>

                {/* ARC 2 */}

                <svg
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    animate-arc-dynamic-2
                    pointer-events-none
                    text-white/25
                  "
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  <path
                    d="M 182,100 A 82,82 0 0,1 18,100"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                {/* SMALL DECORATIVE DOTS */}

                <span
                  className="
                    absolute
                    top-12
                    right-14
                    w-2
                    h-2
                    rounded-full
                    bg-blue-400
                    shadow-[0_0_12px_rgba(96,165,250,0.9)]
                  "
                />

                <span
                  className="
                    absolute
                    bottom-14
                    left-12
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-white/60
                  "
                />

                {/* PHOTO */}

                <div
                  className="
                    relative
                    z-10
                    w-[245px]
                    h-[245px]
                    sm:w-[290px]
                    sm:h-[290px]
                    lg:w-[340px]
                    lg:h-[340px]
                    rounded-full
                    overflow-hidden
                    border
                    border-blue-400/40
                    dark:border-blue-400/40
                    border-gray-300
                    bg-[#080f1c]
                    dark:bg-[#080f1c]
                    bg-gray-100
                    shadow-[0_0_50px_rgba(59,130,246,0.18)]
                    dark:shadow-[0_0_50px_rgba(59,130,246,0.18)]
                    shadow-gray-300/30
                    p-1.5
                    group
                  "
                >

                  <img
                    src="/images/dorcas26.png"
                    alt="Dorcas TIEMOUO"
                    className="
                      w-full
                      h-full
                      object-cover
                      object-top
                      rounded-full
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* MOBILE ONLY: BUTTONS + SOCIAL LINKS UNDER IMAGE */}
        <div className="lg:hidden flex flex-col items-center gap-5 mt-8 w-full px-4 ">
          
          <div className="flex flex-wrap items-center justify-center gap-3 w-full mb-6">
            <a
              href="#projects"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
            >
              Voir mes projets
            </a>
            <a
              href="/images/CV_TIEMOUO_DJIOLIO_DORCAS.pdf"
              download="CV_TIEMOUO_DJIOLIO_DORCAS.pdf"
              className="px-6 py-3 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg transition-all duration-300"
            >
              Télécharger mon CV
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 mb-8">
            <a href="https://www.linkedin.com/in/dorcas-tiemouo-166131351/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-2xl">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://github.com/TIEMOUO" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-2xl">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.behance.net/dorcastiemouo" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-2xl">
              <i className="fa-brands fa-behance"></i>
            </a>
            <a href="#contact" aria-label="Email" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-2xl">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>

        </div>

        {/* =====================================================
            TECHNOLOGIES CAROUSEL
        ===================================================== */}

        <div
          id="technology-strip"
          className="
            relative
            z-20
            w-full
            border-t
            border-white/10
            dark:border-white/10
            border-gray-200
            bg-gradient-to-r
            from-[#101d32]
            via-[#0c182b]
            to-[#101d32]
            dark:from-[#101d32]
            dark:via-[#0c182b]
            dark:to-[#101d32]
            from-gray-100
            via-gray-50
            to-gray-100
            overflow-hidden
          "
        >

          {/* TOP LABEL */}

          <div
            className="
              absolute
              left-0
              top-0
              bottom-0
              z-20
              hidden
              sm:flex
              items-center
              px-6
              bg-gradient-to-r
              from-[#0c182b]
              dark:from-[#0c182b]
              from-gray-100
              to-transparent
            "
          >
            <span
              className="
                text-[9px]
                font-['Roboto_Mono']
                uppercase
                tracking-[0.2em]
                text-gray-500
                dark:text-gray-500
                whitespace-nowrap
              "
            >
              Tools & Technologies
            </span>
          </div>

          {/* CAROUSEL */}

          <div className="overflow-hidden py-5">

            <div className="technology-track flex items-center">

              {/* FIRST SET */}

              {technologies.map((tech, index) => (
                <div
                  key={`first-${index}`}
                  className="
                    flex
                    items-center
                    gap-2
                    mx-6
                    sm:mx-8
                    whitespace-nowrap
                    text-gray-400
                    dark:text-gray-400
                    hover:text-blue-400
                    dark:hover:text-blue-400
                    transition-colors
                    duration-300
                  "
                >

                  <span
                    className="
                      flex
                      items-center
                      justify-center
                      text-lg
                      w-6
                    "
                  >
                    <i className={tech.icon}></i>
                  </span>

                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      font-semibold
                      tracking-wide
                    "
                  >
                    {tech.name}
                  </span>

                  <span className="text-gray-700 dark:text-gray-600 ml-5">
                    ✦
                  </span>

                </div>
              ))}

              {/* DUPLICATE SET FOR INFINITE LOOP */}

              {technologies.map((tech, index) => (
                <div
                  key={`second-${index}`}
                  className="
                    flex
                    items-center
                    gap-2
                    mx-6
                    sm:mx-8
                    whitespace-nowrap
                    text-gray-400
                    dark:text-gray-400
                    hover:text-blue-400
                    dark:hover:text-blue-400
                    transition-colors
                    duration-300
                  "
                >

                  <span
                    className="
                      flex
                      items-center
                      justify-center
                      text-lg
                      w-6
                    "
                  >
                    <i className={tech.icon}></i>
                  </span>

                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      font-semibold
                      tracking-wide
                    "
                  >
                    {tech.name}
                  </span>

                  <span className="text-gray-700 dark:text-gray-600 ml-5">
                    ✦
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>
    </AnimatedSection>
  );
}