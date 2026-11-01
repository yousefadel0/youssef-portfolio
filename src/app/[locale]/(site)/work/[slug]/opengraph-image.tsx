import { getProject } from "@/content/projects";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Case study by Youssef Adel";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return renderOg({ kicker: "Case study", title: "Portfolio build" });
  return renderOg({
    kicker: `${project.copy.en.type} · Portfolio build`,
    title: project.name,
    footer: project.copy.en.tagline,
    bg: project.theme.bg,
    fg: project.theme.fg,
    accent: project.theme.accent,
    onAccent: project.theme.onAccent,
  });
}
