import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBolt,
  faCheck,
  faCode,
  faCopy,
  faPalette,
  faPencil,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { blogs } from "../../data/blogs";
import AnimatedSection from "../Layout/AnimatedSection";

const iconMap = {
  faPencil,
  faPalette,
  faCode,
  faBolt,
};

const sectionHeadings = new Set([
  "Ce que j’en retiens",
  "Ce que cette double compétence m’apporte",
  "Une leçon importante",
  "Une autre manière d’apprendre",
]);

export default function BlogDetail() {
  const { blogId } = useParams();
  const post = blogs.find((article) => String(article.id) === blogId);
  const [copied, setCopied] = useState(false);
  const [actionError, setActionError] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${post.title}\n\n${post.excerpt}\n\n${post.content}`,
      );
      setCopied(true);
      setActionError("");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setActionError("Impossible de copier le contenu de l’article.");
    }
  };

  const handleShare = async () => {
    if (!navigator.share) {
      await handleCopy();
      return;
    }

    try {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
      setActionError("");
    } catch (error) {
      if (error.name !== "AbortError") {
        setActionError("Impossible de partager cet article.");
      }
    }
  };

  if (!post) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-[#0b0d14] text-gray-900 dark:text-white">
        <div className="text-center px-6">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <Link to="/#blog" className="text-blue-600 dark:text-blue-400 hover:underline">
            Retour au blog
          </Link>
        </div>
      </section>
    );
  }

  const contentBlocks = post.content.trim().split(/\r?\n\s*\r?\n/);

  return (
    <AnimatedSection>
      <section className="relative min-h-[35vh] flex flex-col justify-center bg-gray-50 dark:bg-[#0a1628] text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden border-b border-gray-200 dark:border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full relative z-10 pt-16 pb-10">
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 mb-8 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Retour aux articles
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/20 uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          <h1
            style={{ fontFamily: "'Roboto Mono', monospace" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight"
          >
            {post.title}
          </h1>

          <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl">
            {post.excerpt}
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 dark:bg-[#0b0d14] py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <article className="bg-white dark:bg-[#121624] rounded-2xl border border-gray-200 dark:border-blue-400/20 overflow-hidden shadow-lg">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full max-h-[28rem] object-cover"
              />
            )}

            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={iconMap[post.icon] || faCode}
                    className="text-lg text-blue-600 dark:text-blue-400"
                  />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/20 uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {post.title}
              </h2>

              <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <time dateTime={post.date}>
                  {new Date(`${post.date}T12:00:00`).toLocaleDateString("fr-FR")}
                </time>
                <span aria-hidden="true">•</span>
                <span>{post.read_time} de lecture</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={copied ? "text-green-500" : ""} />
                  <span>{copied ? "Copié !" : "Copier"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faShareNodes} />
                  <span>Partager</span>
                </button>
              </div>
              {actionError && (
                <p role="status" className="mt-3 text-sm text-red-500">
                  {actionError}
                </p>
              )}
            </div>

            <div className="px-8 pb-8 border-t border-gray-100 dark:border-white/10 pt-8">
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                {contentBlocks.map((block, index) => {
                  const lines = block.split(/\r?\n/).map((line) => line.trim());
                  const text = lines.join(" ");

                  if (sectionHeadings.has(text)) {
                    return (
                      <h2 key={index} className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
                        {text}
                      </h2>
                    );
                  }

                  if (lines.length > 1 && lines.every((line) => line.endsWith(";"))) {
                    return (
                      <ul key={index} className="list-disc list-inside space-y-1 my-4">
                        {lines.map((line) => <li key={line}>{line.slice(0, -1)}</li>)}
                      </ul>
                    );
                  }

                  if (lines.length > 1) {
                    return (
                      <p key={index} className="my-3 whitespace-pre-line">
                        {lines.join("\n")}
                      </p>
                    );
                  }

                  return <p key={index} className="my-3">{text}</p>;
                })}
              </div>
            </div>
          </article>
        </div>
      </div>
    </AnimatedSection>
  );
}
