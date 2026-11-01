import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoLoader } from "@/components/demos/demo-loader";
import { DemoShell } from "@/components/demos/demo-shell";
import { getDictionary } from "@/content/copy";
import { getProject, projects } from "@/content/projects";
import { href, locales, type Locale } from "@/lib/i18n";
import { projectFontVariables } from "@/lib/project-fonts";
import { pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/utils";

export const dynamicParams = false;

export const generateStaticParams = () => locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));

export const generateMetadata = async ({ params }: PageProps<"/[locale]/demo/[slug]">): Promise<Metadata> => {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const t = getDictionary(locale as Locale);
  return pageMetadata({
    locale: locale as Locale,
    path: `/demo/${slug}`,
    title: `${project.name} — ${t.work.liveBadge}`,
    description: project.copy[locale as Locale].summary,
  });
};

export default async function DemoPage({ params }: PageProps<"/[locale]/demo/[slug]">) {
  const { locale: raw, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  return (
    <div className={projectFontVariables}>
      <DemoShell
        slug={project.slug}
        name={project.name}
        backHref={href(locale, `/work/${project.slug}`)}
        whatsappHref={whatsappUrl(t.demo.startMessage(project.name))}
        copy={{
          back: t.demo.back,
          badge: t.demo.badge,
          desktop: t.demo.desktop,
          mobile: t.demo.mobile,
          view: t.demo.view,
          note: t.demo.note,
          start: t.demo.start,
          reset: t.demo.reset,
        }}
      >
        <DemoLoader slug={project.slug} locale={locale} />
      </DemoShell>
    </div>
  );
}
