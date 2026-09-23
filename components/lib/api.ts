const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchUserProfile() {
  const res = await fetch(`${API_BASE_URL}/users/profile`);
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function fetchTasks(status?: string, search?: string) {
  const params = new URLSearchParams();
  if (status && status !== "all") params.append("status", status);
  if (search) params.append("search", search);

  const res = await fetch(`${API_BASE_URL}/tasks?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}