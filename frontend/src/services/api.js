const API_URL = import.meta.env.VITE_API_URL || "/api";

export async function getProjects() {
    const response = await fetch(`${API_URL}/projects/`);

    if (!response.ok) {
        throw new Error("Impossible de récupérer les projets");
    }

    return response.json();
}

export async function getProjectById(id) {
    const response = await fetch(`${API_URL}/projects/${id}/`);

    if (!response.ok) {
        throw new Error("Impossible de récupérer le projet");
    }

    return response.json();
}

export async function getBlogs() {
    const response = await fetch(`${API_URL}/blogs/`);

    if (!response.ok) {
        throw new Error("Impossible de récupérer les articles");
    }

    return response.json();
}

export async function getBlogById(id) {
    const response = await fetch(`${API_URL}/blogs/${id}/`);

    if (!response.ok) {
        throw new Error("Impossible de récupérer l'article");
    }

    return response.json();
}

export async function getSkills() {
    const response = await fetch(`${API_URL}/skills/`);

    if (!response.ok) {
        throw new Error("Impossible de récupérer les compétences");
    }

    return response.json();
}

export async function likeBlog(blogId, visitorId) {
    const response = await fetch(`${API_URL}/blogs/${blogId}/like/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitor_id: visitorId }),
    });

    if (!response.ok) {
        throw new Error("Erreur lors du like");
    }

    return response.json();
}

export async function unlikeBlog(blogId, visitorId) {
    const response = await fetch(`${API_URL}/blogs/${blogId}/unlike/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitor_id: visitorId }),
    });

    if (!response.ok) {
        throw new Error("Erreur lors du unlike");
    }

    return response.json();
}

export async function getLikeStatus(blogId, visitorId) {
    const response = await fetch(`${API_URL}/blogs/${blogId}/like_status/?visitor_id=${visitorId}`);

    if (!response.ok) {
        throw new Error("Erreur lors de la vérification du like");
    }

    return response.json();
}

export async function getComments(blogId, page = 1) {
    const response = await fetch(`${API_URL}/blogs/${blogId}/comments/?page=${page}`);

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des commentaires");
    }

    return response.json();
}

export async function addComment(blogId, author, content, parentId = null) {
    const body = { author, content };
    if (parentId) {
        body.parent_id = parentId;
    }

    const response = await fetch(`${API_URL}/blogs/${blogId}/add_comment/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du commentaire");
    }

    return response.json();
}

export async function likeComment(commentId, visitorId) {
    const response = await fetch(`${API_URL}/comments/${commentId}/like/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitor_id: visitorId }),
    });

    if (!response.ok) {
        throw new Error("Erreur lors du like");
    }

    return response.json();
}

export async function unlikeComment(commentId, visitorId) {
    const response = await fetch(`${API_URL}/comments/${commentId}/unlike/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitor_id: visitorId }),
    });

    if (!response.ok) {
        throw new Error("Erreur lors du unlike");
    }

    return response.json();
}

export async function getCommentLikeStatus(commentId, visitorId) {
    const response = await fetch(`${API_URL}/comments/${commentId}/like_status/?visitor_id=${visitorId}`);

    if (!response.ok) {
        throw new Error("Erreur lors de la vérification du like");
    }

    return response.json();
}