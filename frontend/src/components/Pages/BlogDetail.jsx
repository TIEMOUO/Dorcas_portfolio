import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPalette, faCode, faBolt, faHeart, faComment, faCopy, faShareNodes, faArrowLeft, faCheck, faReply } from "@fortawesome/free-solid-svg-icons";
import { getBlogById, likeBlog, unlikeBlog, getLikeStatus, getComments, addComment, likeComment, unlikeComment, getCommentLikeStatus } from "../../services/api";
import AnimatedSection from "../Layout/AnimatedSection";

const iconMap = {
  faPencil,
  faPalette,
  faCode,
  faBolt,
};

const getVisitorId = () => {
  let visitorId = localStorage.getItem('blog_visitor_id');
  if (!visitorId) {
    visitorId = 'visitor_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem('blog_visitor_id', visitorId);
  }
  return visitorId;
};

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "il y a quelques sec";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `il y a ${months} mois`;
  const years = Math.floor(months / 12);
  return `il y a ${years} an${years > 1 ? 's' : ''}`;
};

const CommentItem = ({ comment, visitorId, onReply, onLike, likedComments, commentLikes }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isLiked = likedComments[comment.id] || false;
  const likesCount = commentLikes[comment.id] || comment.likes || 0;

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyAuthor.trim() || !replyContent.trim()) return;
    setSubmitting(true);
    await onReply(comment.id, replyAuthor, replyContent);
    setReplyAuthor("");
    setReplyContent("");
    setShowReplyForm(false);
    setSubmitting(false);
  };

  const handleCommentLike = () => {
    onLike(comment.id, isLiked);
  };

  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0b0d14] border border-gray-100 dark:border-white/5">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-900 dark:text-white text-sm">{comment.author}</span>
        <span className="text-xs text-gray-400">{formatTimeAgo(comment.created_at)}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{comment.content}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={handleCommentLike}
          className={`flex items-center gap-1 text-xs transition-colors ${
            isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <FontAwesomeIcon icon={faHeart} className={isLiked ? "text-red-500" : ""} />
          <span>{likesCount}</span>
        </button>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-500 transition-colors"
        >
          <FontAwesomeIcon icon={faReply} />
          <span>Répondre</span>
        </button>
      </div>

      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-4 space-y-2">
          <input
            type="text"
            value={replyAuthor}
            onChange={(e) => setReplyAuthor(e.target.value)}
            placeholder="Votre nom"
            className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-[#121624] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
            maxLength={100}
          />
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Votre réponse..."
            className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-[#121624] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500/50"
            rows="2"
            maxLength={2000}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting || !replyAuthor.trim() || !replyContent.trim()}
              className="px-4 py-1.5 text-xs bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {submitting ? "Envoi..." : "Répondre"}
            </button>
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="px-4 py-1.5 text-xs bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 ml-4 pl-4 border-l-2 border-gray-200 dark:border-white/10 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              visitorId={visitorId}
              onReply={onReply}
              onLike={onLike}
              likedComments={likedComments}
              commentLikes={commentLikes}
            />
          ))}
        </div>
      )}
    </div>
  );
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
  const [comments, setComments] = useState([]);
  const [hasMoreComments, setHasMoreComments] = useState(false);
  const [commentsPage, setCommentsPage] = useState(1);
  const [loadingMoreComments, setLoadingMoreComments] = useState(false);
  const [likedComments, setLikedComments] = useState({});
  const [commentLikes, setCommentLikes] = useState({});
  const [author, setAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");

  const visitorId = getVisitorId();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getBlogById(blogId);
        setPost(data);
        setLikeCount(data.likes || 0);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    async function fetchLikeStatus() {
      try {
        const status = await getLikeStatus(blogId, visitorId);
        setLiked(status.liked);
        setLikeCount(status.likes);
      } catch (err) {
        console.error("Error fetching like status:", err);
      }
    }

    async function fetchComments() {
      try {
        const data = await getComments(blogId, 1);
        setComments(data.comments || []);
        setHasMoreComments(data.has_more || false);
        setCommentsPage(1);

        const likesData = {};
        const likedData = {};
        for (const c of flattenComments(data.comments || [])) {
          try {
            const status = await getCommentLikeStatus(c.id, visitorId);
            likesData[c.id] = status.likes;
            likedData[c.id] = status.liked;
          } catch (e) {
            likesData[c.id] = c.likes || 0;
            likedData[c.id] = false;
          }
        }
        setCommentLikes(likesData);
        setLikedComments(likedData);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    }

    fetchBlog();
    fetchLikeStatus();
    fetchComments();
  }, [blogId, visitorId]);

  const flattenComments = (comments) => {
    let result = [];
    for (const c of comments) {
      result.push(c);
      if (c.replies && c.replies.length > 0) {
        result = result.concat(flattenComments(c.replies));
      }
    }
    return result;
  };

  const loadMoreComments = async () => {
    if (loadingMoreComments || !hasMoreComments) return;
    setLoadingMoreComments(true);
    try {
      const nextPage = commentsPage + 1;
      const data = await getComments(blogId, nextPage);

      const newComments = [...comments];
      for (const c of data.comments || []) {
        if (!newComments.find(existing => existing.id === c.id)) {
          newComments.push(c);
        }
      }

      setComments(newComments);
      setHasMoreComments(data.has_more || false);
      setCommentsPage(nextPage);

      for (const c of flattenComments(data.comments || [])) {
        if (!commentLikes[c.id]) {
          try {
            const status = await getCommentLikeStatus(c.id, visitorId);
            setCommentLikes(prev => ({ ...prev, [c.id]: status.likes }));
            setLikedComments(prev => ({ ...prev, [c.id]: status.liked }));
          } catch (e) {}
        }
      }
    } catch (err) {
      console.error("Error loading more comments:", err);
    }
    setLoadingMoreComments(false);
  };

  const handleLike = async () => {
    try {
      if (liked) {
        const result = await unlikeBlog(blogId, visitorId);
        setLiked(false);
        setLikeCount(result.likes);
      } else {
        const result = await likeBlog(blogId, visitorId);
        setLiked(true);
        setLikeCount(result.likes);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleCommentLike = async (commentId, isCurrentlyLiked) => {
    try {
      if (isCurrentlyLiked) {
        const result = await unlikeComment(commentId, visitorId);
        setCommentLikes(prev => ({ ...prev, [commentId]: result.likes }));
        setLikedComments(prev => ({ ...prev, [commentId]: false }));
      } else {
        const result = await likeComment(commentId, visitorId);
        setCommentLikes(prev => ({ ...prev, [commentId]: result.likes }));
        setLikedComments(prev => ({ ...prev, [commentId]: true }));
      }
    } catch (err) {
      console.error("Error toggling comment like:", err);
    }
  };

  const handleReply = async (parentId, replyAuthor, replyContent) => {
    try {
      const newReply = await addComment(blogId, replyAuthor, replyContent, parentId);

      setComments(prevComments => {
        const addReplyToComment = (comments) => {
          return comments.map(c => {
            if (c.id === parentId) {
              return {
                ...c,
                replies: [...(c.replies || []), newReply]
              };
            }
            if (c.replies && c.replies.length > 0) {
              return {
                ...c,
                replies: addReplyToComment(c.replies)
              };
            }
            return c;
          });
        };
        return addReplyToComment(prevComments);
      });
    } catch (err) {
      console.error("Error adding reply:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError("");

    if (!author.trim()) {
      setCommentError("Veuillez entrer votre nom");
      return;
    }
    if (!commentContent.trim()) {
      setCommentError("Veuillez entrer un commentaire");
      return;
    }

    setSubmitting(true);
    try {
      const newComment = await addComment(blogId, author, commentContent);
      setComments(prev => [newComment, ...prev]);
      setCommentContent("");
      setAuthor("");
    } catch (err) {
      setCommentError("Erreur lors de l'ajout du commentaire");
    }
    setSubmitting(false);
  };

  const handleCopy = () => {
    const textToCopy = `${post.title}\n\n${post.excerpt}\n\n${post.content}`;
    navigator.clipboard.writeText(textToCopy);
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

  return (
    <AnimatedSection>
      {/* HERO - Simple avec juste le titre et fond */}
      <section className="relative min-h-[35vh] flex flex-col justify-center bg-gray-50 dark:bg-[#0a1628] text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden border-b border-gray-200 dark:border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <span
          style={{ fontFamily: "'Roboto Mono', monospace" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] sm:text-[400px] lg:text-[500px] font-black italic text-gray-900/[0.03] dark:text-white/[0.015] select-none pointer-events-none leading-none z-0"
        >
          D
        </span>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full relative z-10 pt-16 pb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 mb-8 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
            Retour aux articles
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/20 uppercase tracking-wider">
              Blog
            </span>
          </div>

          <h1
            style={{ fontFamily: "'Roboto Mono', monospace" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight"
          >
            Mon Blog
          </h1>

          <p className="text-justify text-base text-gray-500 dark:text-gray-400 max-w-xl">
           Des idées, des expériences et des connaissances à partager.

Découvrez mes réflexions sur le développement logiciel, le design, la technologie et les projets qui façonnent mon parcours. Un espace pour apprendre, expérimenter et partager.
          </p>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <div className="min-h-screen bg-gray-50 dark:bg-[#0b0d14] py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <article className="bg-white dark:bg-[#121624] rounded-2xl border border-gray-200 dark:border-blue-400/20 overflow-hidden shadow-lg">
            {/* ARTICLE HEADER - Meta only */}
            <div className="p-8">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={iconMap[post.icon] || faCode} className="text-lg text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/20 uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-justify text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {post.title}
                </h2>

                <p className="text-justify text-base text-gray-600 dark:text-gray-300 mb-6">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.read_time} de lecture</span>
                </div>

                {/* Like button */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      liked
                        ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                        : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10"
                    }`}
                  >
                    <FontAwesomeIcon icon={faHeart} className={liked ? "text-red-500" : ""} />
                    <span>{likeCount}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={copied ? "text-green-500" : ""} />
                    <span>{copied ? "Copié!" : "Copier"}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faShareNodes} />
                    <span>Partager</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ARTICLE CONTENT */}
            <div className="px-8 pb-8 border-t border-gray-100 dark:border-white/10 pt-8">
              <div className="text-justify prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
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
            </div>

            {/* COMMENTS SECTION */}
            <div className="px-8 pb-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FontAwesomeIcon icon={faComment} className="text-blue-500" />
                Commentaires ({comments.length})
              </h3>

              <form onSubmit={handleCommentSubmit} className="mb-8 space-y-3">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Votre nom"
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#0b0d14] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-400/50 transition-colors"
                  maxLength={100}
                />
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#0b0d14] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500/50 dark:focus:border-blue-400/50 transition-colors"
                  rows="3"
                  maxLength={2000}
                />
                {commentError && <p className="text-red-500 text-sm">{commentError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors disabled:opacity-50"
                >
                  {submitting ? "Publication..." : "Publier"}
                </button>
              </form>

              <div className="space-y-4">
                {comments.map((c) => (
                  <CommentItem
                    key={c.id}
                    comment={c}
                    visitorId={visitorId}
                    onReply={handleReply}
                    onLike={handleCommentLike}
                    likedComments={likedComments}
                    commentLikes={commentLikes}
                  />
                ))}
              </div>

              {hasMoreComments && (
                <button
                  onClick={loadMoreComments}
                  disabled={loadingMoreComments}
                  className="mt-6 w-full py-3 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 font-semibold transition-colors disabled:opacity-50"
                >
                  {loadingMoreComments ? "Chargement..." : "Charger plus de commentaires"}
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    </AnimatedSection>
  );
}
