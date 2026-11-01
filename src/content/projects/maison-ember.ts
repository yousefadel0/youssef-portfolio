import type { Project } from "./types";

export const maisonEmber: Project = {
  slug: "maison-ember",
  index: 1,
  name: "Maison Ember",
  year: "2026",
  theme: { bg: "#1E1B18", fg: "#F6F1E9", accent: "#D9C7AE", onAccent: "#1E1B18", muted: "#B9AE9F" },
  palette: [
    { name: "Linen", hex: "#F6F1E9" },
    { name: "Charcoal", hex: "#1E1B18" },
    { name: "Ember", hex: "#C2562F" },
    { name: "Sand", hex: "#D9C7AE" },
  ],
  fonts: {
    display: { name: "Fraunces", cssVar: "--font-fraunces" },
    body: { name: "Inter", cssVar: "--font-inter" },
  },
  stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Lenis", "Zustand", "Prisma + SQLite", "Stripe Checkout"],
  copy: {
    en: {
      type: "E-commerce store",
      tagline: "Selling a smell through a screen.",
      client: "A new luxury candle brand opening its first online store",
      platform: "Web · mobile-first",
      summary:
        "A quiet-luxury storefront for hand-poured candles. Editorial pages, scent notes you can see, and a checkout that gets out of the way.",
      problem:
        "Luxury products die on generic store templates. Candles are bought on feeling: smell, warmth, the ritual of lighting one. None of that survives a grid of product cards and a loud 'Add to cart'. The store had to feel like walking into the shop, and still convert on a phone.",
      approach: [
        { title: "Editorial first", text: "The home page reads like a magazine spread: a slow cinematic hero, a craft story, then the products. Selling comes after wanting." },
        { title: "Scent you can see", text: "Each product shows top, heart and base notes as a visual pyramid, so customers can compare candles without smelling them." },
        { title: "Zero-friction cart", text: "A persistent cart drawer with fly-to-cart motion, and Stripe Checkout in test mode with a mock fallback, so the full purchase flow works on day one." },
      ],
      features: [
        { title: "Shop with filters", text: "Filter by collection, scent family and size; sort; quick view; skeleton loading." },
        { title: "Product detail", text: "Gallery with zoom, scent pyramid, size selector and related products." },
        { title: "Animated cart drawer", text: "Persisted cart state, quantity controls and free-shipping progress." },
        { title: "Checkout flow", text: "Stripe Checkout test mode, mock checkout without keys, order success page." },
        { title: "Journal", text: "Three long-form articles on craft and ritual to support SEO and brand." },
        { title: "16+ products, 4 collections", text: "Seeded through Prisma so the store feels full from the first visit." },
      ],
      results: [
        { value: "90+", label: "Lighthouse performance target" },
        { value: "AA", label: "WCAG contrast and keyboard navigation" },
        { value: "16+", label: "Products across 4 collections" },
        { value: "320px→4K", label: "Responsive range" },
      ],
    },
    ar: {
      type: "متجر أونلاين",
      tagline: "إزاي تبيع ريحة من ورا شاشة.",
      client: "براند شموع فاخرة جديد بيفتح أول متجر أونلاين ليه",
      platform: "ويب · للموبايل الأول",
      summary: "متجر هادي وفخم لشموع معمولة باليد. صفحات بروح المجلات، نوتات ريحة تقدر تشوفها، وتشيك أوت مش بيعطّلك.",
      problem:
        "المنتجات الفاخرة بتموت على قوالب المتاجر العادية. الشمع بيتشرى بالإحساس: الريحة، الدفا، طقس إنك تولّعها. ولا حاجة من دول بتعيش وسط جريد كروت و'أضف للسلة' بصوت عالي. المتجر لازم يحسسك إنك داخل المحل، ويبيع برضه على الموبايل.",
      approach: [
        { title: "المحتوى الأول", text: "الصفحة الرئيسية بتتقري زي صفحة مجلة: هيرو سينمائي هادي، حكاية الصنعة، وبعدين المنتجات. البيع بييجي بعد الرغبة." },
        { title: "ريحة تقدر تشوفها", text: "كل منتج بيعرض النوتات العليا والوسطى والأساسية كهرم مرئي، فالعميل يقارن بين الشموع من غير ما يشمّها." },
        { title: "سلة من غير تعقيد", text: "درج سلة ثابت مع أنيميشن طيران المنتج للسلة، وStripe Checkout في وضع التجربة مع بديل وهمي، فالشراء كله شغال من أول يوم." },
      ],
      features: [
        { title: "متجر بفلاتر", text: "فلترة بالكولكشن ونوع الريحة والحجم، ترتيب، عرض سريع، وتحميل بسكيلتون." },
        { title: "صفحة المنتج", text: "جاليري بزووم، هرم الريحة، اختيار الحجم ومنتجات مشابهة." },
        { title: "درج سلة متحرك", text: "السلة محفوظة، تحكم في الكمية وشريط للشحن المجاني." },
        { title: "خطوات الدفع", text: "Stripe في وضع التجربة، دفع وهمي من غير مفاتيح، وصفحة نجاح الأوردر." },
        { title: "المجلة", text: "٣ مقالات طويلة عن الصنعة والطقوس تدعم الـ SEO والبراند." },
        { title: "+16 منتج، 4 كولكشنز", text: "داتا جاهزة بـ Prisma فالمتجر يبان مليان من أول زيارة." },
      ],
      results: [
        { value: "90+", label: "هدف أداء Lighthouse" },
        { value: "AA", label: "تباين WCAG وتنقّل بالكيبورد" },
        { value: "16+", label: "منتج في 4 كولكشنز" },
        { value: "320px→4K", label: "مدى التجاوب" },
      ],
    },
  },
};
