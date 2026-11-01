import Link from "next/link";
import { ArrowIcon, ArrowUpRightIcon, GithubIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/content/copy";
import { projectLinks, type Project } from "@/content/projects";
import { href, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = { project: Project; locale: Locale; t: Dictionary; showCaseStudy?: boolean; className?: string };

/**
 * Case study, live demo and code links in the build's own colors.
 * The live demo is the build's own deployment when `liveUrl` is set in site.ts,
 * otherwise the working demo hosted inside this site at /demo/<slug>.
 */
export const ProjectLinks = ({ project, locale, t, showCaseStudy = true, className }: Props) => {
  const { liveUrl, githubUrl } = projectLinks(project.slug);
  const { theme } = project;
  const chip = "inline-flex h-12 items-center gap-2.5 px-4 text-[0.92rem] font-medium";
  const demoHref = liveUrl || href(locale, `/demo/${project.slug}`);

  const demoInner = (
    <>
      <span aria-hidden className="relative flex size-2">
        <span className="absolute inline-flex size-full rounded-full opacity-70 motion-safe:animate-ping" style={{ background: "currentColor" }} />
        <span className="relative inline-flex size-2 rounded-full" style={{ background: "currentColor" }} />
      </span>
      {t.work.tryDemo}
      <ArrowUpRightIcon size={16} className="transition-transform duration-500 ease-expo group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5" />
      <span className="sr-only">: {project.name}</span>
    </>
  );

  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {liveUrl ? (
        <a href={demoHref} target="_blank" rel="noopener noreferrer" data-cursor="open" className={cn(chip, "group/demo px-5 transition-transform duration-300 hover:-translate-y-0.5")} style={{ background: theme.accent, color: theme.onAccent }}>
          {demoInner}
          <span className="sr-only">{t.common.newTab}</span>
        </a>
      ) : (
        <Link href={demoHref} data-cursor="open" className={cn(chip, "group/demo px-5 transition-transform duration-300 hover:-translate-y-0.5")} style={{ background: theme.accent, color: theme.onAccent }}>
          {demoInner}
        </Link>
      )}

      {showCaseStudy ? (
        <Link href={href(locale, `/work/${project.slug}`)} data-cursor="read" className={cn(chip, "group/cs border transition-opacity hover:opacity-75")} style={{ borderColor: theme.fg, color: theme.fg }}>
          {t.work.caseStudy}
          <ArrowIcon size={17} className="transition-transform duration-500 ease-expo group-hover/cs:translate-x-1 rtl:group-hover/cs:-translate-x-1" />
          <span className="sr-only">: {project.name}</span>
        </Link>
      ) : null}

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
