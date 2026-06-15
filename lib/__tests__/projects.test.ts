import { describe, it, expect } from "vitest";
import {
  getFeaturedProjects,
  getProjectBySlug,
  getProjectsByCategory,
  getAdjacentProjects,
  projects,
} from "../projects";

describe("getFeaturedProjects", () => {
  it("returns only featured projects", () => {
    expect(getFeaturedProjects().every((p) => p.featured)).toBe(true);
  });
  it("returns at least one project", () => {
    expect(getFeaturedProjects().length).toBeGreaterThan(0);
  });
});

describe("getProjectBySlug", () => {
  it("returns the correct project for a known slug", () => {
    expect(getProjectBySlug("home-again")?.title).toBe("Home Again");
  });
  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("getProjectsByCategory", () => {
  it("returns only projects matching the category", () => {
    const films = getProjectsByCategory("film");
    expect(films.every((p) => p.category === "film")).toBe(true);
  });
  it("returns at least one film", () => {
    expect(getProjectsByCategory("film").length).toBeGreaterThan(0);
  });
});

describe("getAdjacentProjects", () => {
  it("returns the requested count", () => {
    expect(getAdjacentProjects("home-again", 2)).toHaveLength(2);
  });
  it("does not include the source project", () => {
    const adj = getAdjacentProjects("home-again", 2);
    expect(adj.every((p) => p.slug !== "home-again")).toBe(true);
  });
  it("wraps around when source is the last project", () => {
    const last = projects[projects.length - 1];
    expect(getAdjacentProjects(last.slug, 2)).toHaveLength(2);
  });
});
