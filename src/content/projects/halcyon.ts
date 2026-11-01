import type { Project } from "./types";

export const halcyon: Project = {
  slug: "halcyon",
  index: 2,
  name: "Halcyon",
  year: "2026",
  theme: { bg: "#0C0E14", fg: "#EDEAE2", accent: "#39E58C", onAccent: "#0C0E14", muted: "#8A90A0" },
  palette: [
    { name: "Deep ink", hex: "#0C0E14" },
    { name: "Bone", hex: "#EDEAE2" },
    { name: "Signal mint", hex: "#39E58C" },
    { name: "Slate", hex: "#8A90A0" },
  ],
  fonts: {
    display: { name: "Space Grotesk", cssVar: "--font-space-grotesk" },
    body: { name: "Inter", cssVar: "--font-inter" },
  },
  stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP ScrollTrigger", "Lenis", "MDX", "Zod", "Resend"],
  copy: {
    en: {
      type: "Startup landing site",
      tagline: "Calm software, explained in one scroll.",
      client: "A Series-A B2B product-analytics startup selling to growth teams",
      platform: "Web · marketing site + content",
      summary:
        "A marketing site for an analytics platform where the product demo is built in code and comes alive as you scroll, not a screenshot.",
      problem:
        "Analytics startups all look the same: purple gradient, floating dashboard screenshot, 'Revolutionize your workflow'. Buyers can't tell them apart, so they don't book demos. Halcyon needed to show the product working in the first five seconds and sound like people who know what they're doing.",
      approach: [
        { title: "Live product hero", text: "The hero is a real, animated mockup of the dashboard built in code. Charts draw, numbers tick and the cursor moves the data." },
        { title: "Scroll-driven story", text: "Pinned sections walk through one question a growth team asks, from raw events to an answer, as you scroll." },
        { title: "Built to convert", text: "Pricing toggle, comparison table and a multi-step demo booking form with validation, spam protection and email delivery." },
      ],
      features: [
        { title: "Interactive feature explorer", text: "Tabs that swap live UI states, not static images." },
        { title: "Pricing page", text: "Monthly/yearly toggle, full comparison table and pricing FAQ." },
        { title: "Customers & blog", text: "Three deep case studies, four blog posts and a changelog in MDX." },
        { title: "Book-a-demo flow", text: "Multi-step form with progress, zod validation, honeypot and Resend email." },
        { title: "Analytics-ready", text: "Event hooks and a privacy-friendly analytics snippet slot." },
        { title: "Full SEO", text: "Metadata, sitemap, robots, JSON-LD and generated OG images." },
      ],
      results: [
        { value: "95+", label: "Lighthouse performance, a11y and SEO target" },
        { value: "0", label: "Screenshots used for the product: all code" },
        { value: "12+", label: "Pages incl. product, customers, blog, legal" },
        { value: "AA", label: "WCAG contrast and keyboard navigation" },
      ],
    },
    ar: {
      type: "موقع لشركة ناشئة",
      tagline: "سوفتوير هادي، متشرح في سكرول واحد.",
      client: "شركة ناشئة B2B في مرحلة Series-A بتبيع منصة تحليلات لفرق النمو",
      platform: "ويب · موقع تسويقي + محتوى",
      summary: "موقع تسويقي لمنصة تحليلات، الديمو بتاع المنتج فيه مبني بالكود وبيتحرك مع السكرول، مش سكرين شوت.",
      problem:
        "شركات التحليلات كلها شبه بعض: جريدينت بنفسجي، سكرين شوت داشبورد طايرة، و'غيّر طريقة شغلك'. المشتري مش بيفرّق بينهم، فمش بيحجز ديمو. Halcyon كان محتاج يوري المنتج شغال في أول ٥ ثواني، ويتكلم زي ناس فاهمة هي بتعمل إيه.",
      approach: [
        { title: "هيرو بمنتج لايف", text: "الهيرو موكاب حقيقي متحرك للداشبورد مبني بالكود. الشارتات بتترسم، الأرقام بتعد، والماوس بيحرك الداتا." },
        { title: "حكاية بالسكرول", text: "سكاشن مثبتة بتمشي معاك في سؤال واحد بيسأله فريق النمو، من الداتا الخام لحد الإجابة." },
        { title: "معمول عشان يبيع", text: "سويتش أسعار، جدول مقارنة، وفورم حجز ديمو متعدد الخطوات بفاليديشن وحماية من السبام وإيميل." },
      ],
      features: [
        { title: "مستكشف المميزات", text: "تابات بتبدّل حالات UI حقيقية، مش صور ثابتة." },
        { title: "صفحة الأسعار", text: "سويتش شهري/سنوي، جدول مقارنة كامل وأسئلة عن الأسعار." },
        { title: "العملاء والمدونة", text: "٣ دراسات حالة، ٤ مقالات، وchangelog بـ MDX." },
        { title: "حجز ديمو", text: "فورم بخطوات وprogress، فاليديشن zod، honeypot وإيميل Resend." },
        { title: "جاهز للتحليلات", text: "Event hooks ومكان لسكريبت تحليلات بيحترم الخصوصية." },
        { title: "SEO كامل", text: "Metadata وsitemap وrobots وJSON-LD وصور OG متولّدة." },
      ],
      results: [
        { value: "95+", label: "هدف Lighthouse للأداء والإتاحة والـ SEO" },
        { value: "0", label: "سكرين شوتس للمنتج: كله كود" },
        { value: "12+", label: "صفحة منها المنتج والعملاء والمدونة" },
        { value: "AA", label: "تباين WCAG وتنقّل بالكيبورد" },
      ],
    },
  },
};
