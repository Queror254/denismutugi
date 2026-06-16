import { describe, it, expect } from "vitest";
import { filterProjects } from "../filterProjects";
import { projects } from "../projects";

describe("filterProjects", () => {
  it("returns all projects when filter is 'all'", () => {
    expect(filterProjects(projects, "all")).toHaveLength(projects.length);
  });
  it("returns only film projects for 'film'", () => {
    const result = filterProjects(projects, "film");
    expect(result.every((p) => p.category === "film")).toBe(true);
  });
  it("returns only documentary projects for 'documentary'", () => {
    const result = filterProjects(projects, "documentary");
    expect(result.every((p) => p.category === "documentary")).toBe(true);
  });
  it("returns only acting projects for 'acting'", () => {
    const result = filterProjects(projects, "acting");
    expect(result.every((p) => p.category === "acting")).toBe(true);
  });
  it("returns an empty array for an empty input", () => {
    expect(filterProjects([], "film")).toHaveLength(0);
  });
});
