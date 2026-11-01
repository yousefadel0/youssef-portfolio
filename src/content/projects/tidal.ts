import type { Project } from "./types";

export const tidal: Project = {
  slug: "tidal",
  index: 7,
  name: "Tidal",
  year: "2026",
  theme: { bg: "#0A1F2B", fg: "#F1F5F4", accent: "#5BE3C4", onAccent: "#0A1F2B", muted: "#8FB0B8" },
  palette: [
    { name: "Abyss", hex: "#0A1F2B" },
    { name: "Deep", hex: "#12384A" },
    { name: "Foam", hex: "#F1F5F4" },
    { name: "Seafoam", hex: "#5BE3C4" },
    { name: "Coral", hex: "#FF6B5B" },
  ],
  fonts: {
    display: { name: "Plus Jakarta Sans", cssVar: "--font-jakarta" },
    body: { name: "IBM Plex Sans Arabic", cssVar: "--font-plex-arabic" },
  },
  stack: ["Flutter", "Riverpod", "go_router", "Drift (SQLite)", "fl_chart", "Fastify + TypeScript", "JWT + refresh tokens", "Offline-first sync"],
  copy: {
    en: {
      type: "Mobile app + API",
      tagline: "Know where the month is going.",
      client: "Young professionals in Egypt who want to track spending without a spreadsheet",
      platform: "Flutter · iOS, Android and web + Node API",
      summary:
        "A personal-finance app that logs a purchase in under five seconds, shows where your salary goes, and keeps working offline.",
      problem:
        "Budget apps are built for American bank feeds. In Egypt most spending is cash, cards and instant transfers that no app sees. People give up after a week because logging is slow and the charts don't help. Tidal had to be faster than writing a note, and honest about the numbers.",
      approach: [
        { title: "Five-second logging", text: "A quick-add sheet with a custom keypad, recent categories and one tap to save. Logging becomes a habit, not a chore." },
        { title: "Offline-first", text: "Everything is stored locally with Drift and synced to the API when there's a connection, with conflict-safe merging that is tested." },
        { title: "Calm, clear insights", text: "Weekly and monthly charts and plain-language summaries computed from your real data. No fake AI claims." },
      ],
      features: [
        { title: "Home", text: "Balance, month summary and an animated spending ring." },
        { title: "Transactions", text: "Search, filters, custom category icons, recurring items, receipt photos." },
        { title: "Budgets", text: "Per-category budgets with progress and overspend warnings." },
        { title: "Goals", text: "Savings goals with animated progress and a contribution flow." },
        { title: "Security", text: "Biometric lock, secure token storage, validation on app and API." },
        { title: "Bilingual", text: "English and Arabic with real RTL, EGP formatting, light and dark themes." },
      ],
      results: [
        { value: "<5s", label: "To log a transaction" },
        { value: "60fps", label: "Target on mid-range Android" },
        { value: "Offline", label: "Works without a connection, syncs later" },
        { value: "EN/AR", label: "Full RTL and EGP formatting" },
      ],
    },
    ar: {
      type: "تطبيق موبايل + API",
      tagline: "اعرف الشهر رايح على فين.",
      client: "شباب بيشتغلوا في مصر وعايزين يتابعوا مصاريفهم من غير شيت إكسل",
      platform: "Flutter · iOS وAndroid وويب + Node API",
      summary: "تطبيق فلوس شخصي بيسجّل المصروف في أقل من ٥ ثواني، بيوريك المرتب بيروح فين، وبيشتغل من غير نت.",
      problem:
        "تطبيقات الميزانية معمولة لبنوك أمريكا. في مصر أغلب الصرف كاش وكروت وتحويلات إنستاباي محدش من التطبيقات دي بيشوفها. الناس بتزهق بعد أسبوع عشان التسجيل بطيء والشارتات مش بتفيد. Tidal لازم يبقى أسرع من إنك تكتب نوت، وصريح في الأرقام.",
      approach: [
        { title: "تسجيل في ٥ ثواني", text: "شيت إضافة سريعة بكيباد مخصوص، آخر الفئات، وضغطة واحدة للحفظ. التسجيل يبقى عادة مش مجهود." },
        { title: "أوفلاين الأول", text: "كل حاجة متخزنة على الموبايل بـ Drift وبتتزامن مع الـ API لما النت يرجع، بدمج آمن من التعارض ومتختبر." },
        { title: "أرقام هادية وواضحة", text: "شارتات أسبوعية وشهرية وملخصات بكلام بسيط محسوبة من داتا حقيقية. من غير ادعاءات AI." },
      ],
      features: [
        { title: "الرئيسية", text: "الرصيد، ملخص الشهر ودايرة صرف متحركة." },
        { title: "المعاملات", text: "بحث، فلاتر، أيقونات فئات مخصوصة، معاملات متكررة، صور إيصالات." },
        { title: "الميزانيات", text: "ميزانية لكل فئة مع شريط تقدّم وتنبيه لو عدّيت." },
        { title: "الأهداف", text: "أهداف ادخار بتقدّم متحرك وخطوات إضافة فلوس." },
        { title: "الأمان", text: "قفل بالبصمة، تخزين آمن للتوكنز، وفاليديشن في التطبيق والـ API." },
        { title: "بلغتين", text: "عربي وإنجليزي بـ RTL حقيقي، تنسيق الجنيه، وثيم فاتح وغامق." },
      ],
      results: [
        { value: "<5s", label: "لتسجيل معاملة" },
        { value: "60fps", label: "الهدف على موبايلات أندرويد متوسطة" },
        { value: "Offline", label: "شغال من غير نت، وبيتزامن بعدين" },
        { value: "EN/AR", label: "RTL كامل وتنسيق الجنيه" },
      ],
    },
  },
};
