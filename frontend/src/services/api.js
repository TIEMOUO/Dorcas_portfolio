const API_URL = "/api";

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