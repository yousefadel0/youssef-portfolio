import { getProject } from "@/content/projects";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Live demo by Youssef Adel";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return renderOg({ kicker: "Live demo", title: "Try it live" });
  return renderOg({
    kicker: `Live demo · ${project.copy.en.type}`,
    title: `Try ${project.name} live`,
    footer: project.copy.en.tagline,
    bg: project.theme.bg,
    fg: project.theme.fg,
    accent: project.theme.accent,
    onAccent: project.theme.onAccent,
  });
}
