import type { Project, Category } from "./projects";

export type Filter = "all" | Category;

export function filterProjects(projects: Project[], filter: Filter): Project[] {
  if (filter === "all") return projects;
  return projects.filter((p) => p.category === filter);
}
