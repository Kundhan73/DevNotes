export const API_BASE = "http://localhost:5001/api";

export const noteApi = {
    setToken(token: string) {
        localStorage.setItem("devnotes_token", token);
    },

    getToken() {
        return localStorage.getItem("devnotes_token");
    },

    logout() {
        localStorage.removeItem("devnotes_token");
        return Promise.resolve();
    },

    async signup(username: string, email: string, password: string) {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Signup failed");

        return data;
    },

    async login(email: string, password: string) {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Login failed");

        this.setToken(data.token);
        return data.user;
    },

    async getCurrentUser() {
        const token = this.getToken();
        if (!token) throw new Error("No token");

        const res = await fetch(`${API_BASE}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Not authenticated");

        return res.json();
    },

    async getNotes() {
        const res = await fetch(`${API_BASE}/notes`, {
            headers: { Authorization: `Bearer ${this.getToken()}` }
        });

        if (!res.ok) throw new Error("Failed to fetch notes");
        return res.json();
    },

    async createNote(noteData: any) {
        const res = await fetch(`${API_BASE}/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.getToken()}`
            },
            body: JSON.stringify(noteData)
        });

        if (!res.ok) throw new Error("Failed to create note");
        return res.json();
    },

    async updateNote(id: string, noteData: any) {
        const res = await fetch(`${API_BASE}/notes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.getToken()}`
            },
            body: JSON.stringify(noteData)
        });

        if (!res.ok) throw new Error("Failed to update note");
        return res.json();
    },

    async deleteNote(id: string) {
        const res = await fetch(`${API_BASE}/notes/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${this.getToken()}` }
        });

        if (!res.ok) throw new Error("Failed to delete note");
        return res.json();
    }
};
