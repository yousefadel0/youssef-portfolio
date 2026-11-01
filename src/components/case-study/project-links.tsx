import Link from "next/link";
import { ArrowIcon, ArrowUpRightIcon, GithubIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/content/copy";
import { projectLinks, type Project } from "@/content/projects";
import { href, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = { project: Project; locale: Locale; t: Dictionary; showCaseStudy?: boolean; className?: string };

/**
 * Case study, live demo and code links in the build's own colors.
 * Missing URLs render as a quiet "coming soon" chip instead of a dead link.
 */
export const ProjectLinks = ({ project, locale, t, showCaseStudy = true, className }: Props) => {
  const { liveUrl, githubUrl } = projectLinks(project.slug);
  const { theme } = project;
  const chip = "inline-flex h-12 items-center gap-2.5 px-4 text-[0.92rem] font-medium";

  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {showCaseStudy ? (
        <Link
          href={href(locale, `/work/${project.slug}`)}
          data-cursor="read"
          className={cn(chip, "group/cs px-5 transition-transform duration-300 hover:-translate-y-0.5")}
          style={{ background: theme.accent, color: theme.onAccent }}
        >
          {t.work.caseStudy}
          <ArrowIcon size={17} className="transition-transform duration-500 ease-expo group-hover/cs:translate-x-1 rtl:group-hover/cs:-translate-x-1" />
          <span className="sr-only">: {project.name}</span>
        </Link>
      ) : null}

      {liveUrl ? (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={cn(chip, "border transition-opacity hover:opacity-75")} style={{ borderColor: theme.fg, color: theme.fg }}>
          {t.work.liveDemo}
          <ArrowUpRightIcon size={16} />
          <span className="sr-only">
            : {project.name} {t.common.newTab}
          </span>
        </a>
      ) : (
        <span className={cn(chip, "cursor-default border border-dashed")} style={{ borderColor: `${theme.fg}66`, color: theme.fg }}>
          <span aria-hidden className="size-1.5 rounded-full motion-safe:animate-pulse" style={{ background: theme.fg }} />
          {t.work.demoSoon}
        </span>
      )}

      {githubUrl ? (
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={cn(chip, "transition-opacity hover:opacity-75")} style={{ color: theme.fg }}>
          <GithubIcon size={17} />
          {t.work.code}
          <span className="sr-only">
            : {project.name} {t.common.newTab}
          </span>
        </a>
      ) : (
        <span className={cn(chip, "cursor-default opacity-80")} style={{ color: theme.fg }}>
          <GithubIcon size={17} />
          {t.work.codeSoon}
        </span>
      )}
    </div>
  );
};
