import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPalette, faCode, faBolt, faHeart, faComment, faCopy, faShareNodes, faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getBlogById } from "../../services/api";
import AnimatedSection from "../Layout/AnimatedSection";

const iconMap = {
  faPencil,
  faPalette,
  faCode,
  faBolt,
};

export default function BlogDetail() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [initialLikes, setInitialLikes] = useState(0);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getBlogById(blogId);
        setPost(data);
        setLikeCount(data.likes || 0);
        setInitialLikes(data.likes || 0);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0b0d14] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0b0d14] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Erreur: {error}</p>
          <Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">Retour au blog</Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0b0d14] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article non trouvé</h2>
          <Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">Retour au blog</Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, author: "Vous", text: comment, date: new Date().toLocaleDateString("fr-FR") }
      ]);
      setComment("");
    }
  };

  return (
    <AnimatedSection>
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-gray-50 dark:bg-[#0a1628] text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden border-b border-gray-200 dark:border-white/5 pb-16 lg:pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        
        <span 
          style={{ fontFamily: "'Roboto Mono', monospace" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] sm:text-[400px] lg:text-[500px] font-black italic text-gray-900/[0.03] dark:text-white/[0.015] select-none pointer-events-none leading-none z-0"
        >
          D
        </span>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full relative z-10 pt-20 ">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 mb-10 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
            Retour aux articles
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center">
              <FontAwesomeIcon icon={iconMap[post.icon] || faCode} className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs font-mono px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/20 uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          <h1 
            style={{ fontFamily: "'Roboto Mono', monospace" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
          >
            {post.title}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.read_time} de lecture</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faHeart} className="text-red-400" />
              {likeCount}
            </span>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 dark:bg-[#0b0d14] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <article className="bg-white dark:bg-[#121624] rounded-2xl border border-gray-200 dark:border-blue-400/20 overflow-hidden shadow-lg">
            <div className="p-8">
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                {post.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                    return (
                      <ul key={index} className="list-disc list-inside space-y-1 my-4">
                        {items.map((item, i) => <li key={i}>{item.replace('- ', '')}</li>)}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <p key={index} className="font-bold text-gray-900 dark:text-white my-3">{paragraph.replace(/\*\*/g, '')}</p>;
                  }
                  return <p key={index} className="my-3">{paragraph}</p>;
                })}
              </div>

              <div className="flex items-center justify-between pt-6 mt-8 border-t border-gray-100 dark:border-white/10">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    liked 
                      ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20" 
                      : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10"
                  }`}
                >
                  <FontAwesomeIcon icon={faHeart} className={liked ? "text-red-500" : ""} />
                  <span>{likeCount}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={copied ? "text-green-500" : ""} />
                    <span className="hidden sm:inline">{copied ? "Copié!" : "Copier"}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faShareNodes} />
                    <span className="hidden sm:inline">Partager</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="px-8 pb-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faComment} className="text-blue-500" />
                Commentaires ({comments.length})
              </h3>

              <form onSubmit={handleComment} className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#0b0d14] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-400/50 transition-colors"
                  rows="3"
                />
                <button
                  type="submit"
                  className="mt-3 px-6 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
                >
                  Publier
                </button>
              </form>

              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl bg-gray-50 dark:bg-[#0b0d14] border border-gray-100 dark:border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">{c.author}</span>
                      <span className="text-xs text-gray-400">{c.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </AnimatedSection>
  );
}