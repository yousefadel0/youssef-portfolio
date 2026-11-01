import type { Project } from "./types";

export const atlasConsole: Project = {
  slug: "atlas-console",
  index: 6,
  name: "Atlas Console",
  year: "2026",
  theme: { bg: "#E7E9EC", fg: "#16181B", accent: "#F5A524", onAccent: "#16181B", muted: "#555B63" },
  palette: [
    { name: "Graphite", hex: "#16181B" },
    { name: "Panel", hex: "#22262B" },
    { name: "Mist", hex: "#E7E9EC" },
    { name: "Atlas amber", hex: "#F5A524" },
    { name: "Positive", hex: "#3DBE7A" },
    { name: "Negative", hex: "#E5484D" },
  ],
  fonts: {
    display: { name: "Inter", cssVar: "--font-inter" },
    body: { name: "JetBrains Mono", cssVar: "--font-jetbrains" },
  },
  stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "TanStack Table", "TanStack Query", "Recharts", "Zustand", "Prisma + SQLite", "Framer Motion"],
  copy: {
    en: {
      type: "Admin dashboard",
      tagline: "Twelve branches, one calm screen.",
      client: "A multi-branch retail business managing orders, stock, customers and staff",
      platform: "Web app · desktop, tablet and mobile",
      summary:
        "An operations console for a retail chain: revenue, orders, inventory, customers and staff in one fast, keyboard-friendly dashboard with light and dark themes.",
      problem:
        "Owners of growing shops end up with five tools and no answers. Sales live in the POS, stock in a spreadsheet, customers in WhatsApp. Generic admin templates show pretty charts with no meaning. The business needed one place to see what's selling, what's running out and who's buying again.",
      approach: [
        { title: "Dense but calm", text: "Tabular numbers, a strict grid and one accent color. Information-rich without visual noise." },
        { title: "Charts that mean something", text: "A restrained, validated color system, direct labels and real tooltips. Every chart answers a question." },
        { title: "Power-user speed", text: "Command palette, keyboard shortcuts, saved table views, virtualized rows and a shared date range across pages." },
      ],
      features: [
        { title: "Overview", text: "KPI tiles with sparklines, revenue with range picker, sales by branch, goals." },
        { title: "Orders table", text: "Server-side search, filters, sort, saved views, bulk actions, CSV export." },
        { title: "Inventory", text: "Product CRUD, stock levels, low-stock alerts, movement history, inline edits." },
        { title: "Customers", text: "Segments, lifetime value and a cohort retention heatmap." },
        { title: "Roles & audit", text: "Admin, manager and viewer roles with a permission matrix and audit log." },
        { title: "Reports", text: "Scheduled report builder and a printable report view." },
      ],
      results: [
        { value: "12 mo", label: "Of realistic seeded data" },
        { value: "⌘K", label: "Command palette with real actions" },
        { value: "2", label: "Polished themes: light and dark" },
        { value: "90+", label: "Lighthouse performance target" },
      ],
    },
    ar: {
      type: "لوحة تحكم",
      tagline: "١٢ فرع، في شاشة واحدة هادية.",
      client: "بيزنس تجزئة بأكتر من فرع بيدير أوردرات ومخزون وعملاء وموظفين",
      platform: "تطبيق ويب · كمبيوتر وتابلت وموبايل",
      summary: "لوحة تشغيل لسلسلة محلات: الإيرادات والأوردرات والمخزون والعملاء والموظفين في داشبورد واحد سريع، بيتحكم بالكيبورد، بثيم فاتح وغامق.",
      problem:
        "أصحاب المحلات اللي بتكبر بيلاقوا نفسهم بخمس أدوات ومن غير إجابات. المبيعات في الكاشير، المخزون في شيت، والعملاء على واتساب. قوالب الأدمن العادية بتعرض شارتات حلوة من غير معنى. البيزنس كان محتاج مكان واحد يشوف فيه إيه اللي بيتباع، إيه اللي هيخلص، ومين بيرجع يشتري.",
      approach: [
        { title: "مليان بس هادي", text: "أرقام جدولية، جريد صارم ولون مميز واحد. معلومات كتير من غير دوشة." },
        { title: "شارتات ليها معنى", text: "ألوان محسوبة ومتختبرة، ليبلز مباشرة وتولتيبس حقيقية. كل شارت بيجاوب على سؤال." },
        { title: "سرعة للمحترفين", text: "Command palette، اختصارات كيبورد، فيوز محفوظة للجداول، صفوف virtualized ونطاق تاريخ مشترك بين الصفحات." },
      ],
      features: [
        { title: "نظرة عامة", text: "كروت KPI بسباركلاينز، الإيرادات بنطاق تاريخ، المبيعات حسب الفرع، والأهداف." },
        { title: "جدول الأوردرات", text: "بحث وفلاتر وترتيب على السيرفر، فيوز محفوظة، إجراءات جماعية، تصدير CSV." },
        { title: "المخزون", text: "إدارة المنتجات، مستويات المخزون، تنبيهات النقص، سجل الحركة، تعديل مباشر." },
        { title: "العملاء", text: "شرائح، قيمة العميل على المدى الطويل، وهيت ماب للاحتفاظ بالعملاء." },
        { title: "الأدوار والسجل", text: "أدوار أدمن ومدير ومشاهد بمصفوفة صلاحيات وسجل تعديلات." },
        { title: "التقارير", text: "بناء تقارير مجدولة وصفحة تقرير للطباعة." },
      ],
      results: [
        { value: "12 mo", label: "داتا واقعية لـ ١٢ شهر" },
        { value: "⌘K", label: "Command palette بأوامر حقيقية" },
        { value: "2", label: "ثيمين متظبطين: فاتح وغامق" },
        { value: "90+", label: "هدف أداء Lighthouse" },
      ],
    },
  },
};
