import type { Project } from "./types";

export const maskan: Project = {
  slug: "maskan",
  index: 5,
  name: "Maskan",
  year: "2026",
  theme: { bg: "#C9B79A", fg: "#1C1A16", accent: "#1C1A16", onAccent: "#EDE7DC", muted: "#4A4234" },
  palette: [
    { name: "Limestone", hex: "#EDE7DC" },
    { name: "Sandstone", hex: "#C9B79A" },
    { name: "Basalt", hex: "#1C1A16" },
    { name: "Brick", hex: "#9A4A2F" },
    { name: "Palm", hex: "#3E5B45" },
  ],
  fonts: {
    display: { name: "Instrument Serif", cssVar: "--font-instrument-serif" },
    body: { name: "Inter", cssVar: "--font-inter" },
  },
  stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "SVG map", "Installment calculator", "Viewing scheduler", "Prisma + PostgreSQL", "Zod"],
  copy: {
    en: {
      type: "Real-estate listings",
      tagline: "Find the flat before the broker calls.",
      client: "Developers and brokers selling homes in New Cairo, Sheikh Zayed and the North Coast",
      platform: "Web app · listings, map and booking",
      summary:
        "A property site where buyers filter by area and budget, see the real monthly installment, and book a viewing in a few taps.",
      problem:
        "Property is sold through Facebook groups and 'price in DM'. Buyers can't compare units, don't know what the installment really is, and call five brokers to see one flat. Developers lose serious buyers to friction.",
      approach: [
        { title: "Price is the first filter", text: "Budget, down payment and monthly installment are front and center, because that is how people here actually buy." },
        { title: "See it on the map", text: "Every listing sits on a district map, so buyers understand location before they fall for a kitchen." },
        { title: "Viewing in three taps", text: "Pick a day and a time slot, leave a number, done. The sales team gets a clean lead, not a 'hi, price?'." },
      ],
      features: [
        { title: "Smart filters", text: "Area, type, bedrooms and a price range that updates results instantly." },
        { title: "District map", text: "An illustrated map of Cairo's new districts with live pins." },
        { title: "Installment calculator", text: "Down payment and years in, real monthly payment out." },
        { title: "Viewing scheduler", text: "Day and time slots with confirmation." },
        { title: "Favorites and compare", text: "Save units and compare them side by side." },
        { title: "Listing detail", text: "Specs, finishing, delivery date and payment plan on one page." },
      ],
      results: [
        { value: "3 taps", label: "From listing to a booked viewing" },
        { value: "EGP", label: "Installments in pounds, per month" },
        { value: "Map", label: "Every unit placed by district" },
        { value: "AA", label: "WCAG contrast and keyboard navigation" },
      ],
    },
    ar: {
      type: "منصة عقارات",
      tagline: "لاقي الشقة قبل ما السمسار يتصل.",
      client: "مطوّرين وسماسرة بيبيعوا وحدات في التجمع وزايد والساحل",
      platform: "تطبيق ويب · وحدات وخريطة وحجز معاينات",
      summary: "موقع عقارات المشتري فيه بيفلتر بالمنطقة والميزانية، بيشوف القسط الشهري الحقيقي، وبيحجز معاينة في كام ضغطة.",
      problem:
        "العقارات بتتباع في جروبات فيسبوك و'السعر في الخاص'. المشتري مش قادر يقارن، مش عارف القسط هيبقى كام فعلاً، وبيكلم خمس سماسرة عشان يشوف شقة واحدة. المطوّرين بيخسروا مشترين جادين بسبب اللف ده.",
      approach: [
        { title: "السعر أول فلتر", text: "الميزانية والمقدم والقسط الشهري في الواجهة، لأن الناس هنا بتشتري كده فعلاً." },
        { title: "شوفها على الخريطة", text: "كل وحدة متحطة على خريطة المنطقة، فالمشتري بيفهم المكان قبل ما يتعلق بالمطبخ." },
        { title: "معاينة في تلات ضغطات", text: "تختار يوم وميعاد، تسيب رقمك، وخلاص. فريق المبيعات بياخد عميل واضح، مش 'هاي، السعر؟'." },
      ],
      features: [
        { title: "فلاتر ذكية", text: "المنطقة والنوع وعدد الأوض ونطاق سعر بيحدّث النتايج على طول." },
        { title: "خريطة المناطق", text: "خريطة مرسومة للمدن الجديدة بدبابيس للوحدات." },
        { title: "حاسبة الأقساط", text: "تدخّل المقدم وعدد السنين، يطلعلك القسط الشهري الحقيقي." },
        { title: "حجز المعاينات", text: "أيام ومواعيد وتأكيد للحجز." },
        { title: "المفضلة والمقارنة", text: "تحفظ الوحدات وتقارن بينهم جنب بعض." },
        { title: "صفحة الوحدة", text: "المواصفات والتشطيب وميعاد الاستلام وخطة الدفع في صفحة واحدة." },
      ],
      results: [
        { value: "3 taps", label: "من الوحدة لمعاينة محجوزة" },
        { value: "EGP", label: "الأقساط بالجنيه، شهرياً" },
        { value: "Map", label: "كل وحدة في منطقتها على الخريطة" },
        { value: "AA", label: "تباين WCAG وتنقّل بالكيبورد" },
      ],
    },
  },
};
