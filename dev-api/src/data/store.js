export const store = {
  users: [
    {
      id: "u1",
      name: "Alex Chen",
      email: "alex@example.com",
      role: "Full Stack Intern",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
  ],
  projects: [
    {
      id: "p1",
      userId: "u1",
      name: "API Gateway Redesign",
      description: "Migrating REST endpoints to GraphQL with custom middleware.",
      techStack: ["Next.js", "TypeScript", "GraphQL"],
    },
    {
      id: "p2",
      userId: "u1",
      name: "Auth Microservice",
      description: "OAuth2 and JWT integration with RBAC support.",
      techStack: ["Node.js", "Redis", "Docker"],
    },
  ],
  tasks: [
    {
      id: "t1",
      projectId: "p1",
      title: "Implement JWT refresh token logic",
      category: "Backend",
      status: "in-progress", // "todo" | "in-progress" | "completed"
      priority: "high",      // "low" | "medium" | "high"
      dueDate: "2026-09-15",
    },
    {
      id: "t2",
      projectId: "p1",
      title: "Design Responsive Sidebar Navigation",
      category: "Frontend",
      status: "completed",
      priority: "medium",
      dueDate: "2026-09-10",
    },
  ],
};