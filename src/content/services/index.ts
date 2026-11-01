import type { PackageId, ProjectSlug } from "@/config/site";
import type { Localized } from "@/lib/i18n";

export type ServiceIcon = "site" | "store" | "booking" | "dashboard" | "mobile";

export type Service = {
  id: string;
  icon: ServiceIcon;
  example: ProjectSlug;
  startsWith: PackageId;
  copy: Localized<{ name: string; for: string; short: string; get: string[]; timeline: string }>;
};

export const services: Service[] = [
  {
    id: "websites",
    icon: "site",
    example: "halcyon",
    startsWith: "launch",
    copy: {
      en: {
        name: "Websites",
        for: "New businesses, clinics, restaurants, agencies and startups that need to look serious online.",
        short: "A fast, beautiful site that explains what you do and gets people to call.",
        get: ["Custom design in your brand", "Mobile-first and fast", "WhatsApp, call and map buttons", "SEO basics and Google indexing"],
        timeline: "7–14 days",
      },
      ar: {
        name: "مواقع",
        for: "بيزنس جديد، عيادات، مطاعم، وكالات وشركات ناشئة محتاجين يبانوا محترمين أونلاين.",
        short: "موقع سريع وشيك بيشرح إنت بتعمل إيه وبيخلّي الناس تكلمك.",
        get: ["تصميم مخصوص بهوية البراند", "للموبايل الأول وسريع", "زراير واتساب واتصال وخريطة", "أساسيات SEO وظهور على جوجل"],
        timeline: "٧–١٤ يوم",
      },
    },
  },
  {
    id: "stores",
    icon: "store",
    example: "maison-ember",
    startsWith: "growth",
    copy: {
      en: {
        name: "Online stores",
        for: "Brands and shop owners moving from Instagram DMs to real orders.",
        short: "A store that feels like your brand, takes payment and sends you the order.",
        get: ["Products, collections and stock", "Online payment or cash on delivery", "Cart, checkout and order emails", "Admin to edit everything yourself"],
        timeline: "3–5 weeks",
      },
      ar: {
        name: "متاجر أونلاين",
        for: "براندات وأصحاب محلات عايزين ينقلوا من رسايل إنستجرام لأوردرات حقيقية.",
        short: "متجر شبه البراند بتاعك، بياخد الدفع وبيبعتلك الأوردر.",
        get: ["منتجات وكولكشنز ومخزون", "دفع أونلاين أو كاش عند الاستلام", "سلة وتشيك أوت وإيميلات أوردرات", "لوحة تعدّل منها كل حاجة بنفسك"],
        timeline: "٣–٥ أسابيع",
      },
    },
  },
  {
    id: "booking",
    icon: "booking",
    example: "pulse-club",
    startsWith: "growth",
    copy: {
      en: {
        name: "Booking systems",
        for: "Gyms, clinics, salons, studios and anyone who sells time or memberships.",
        short: "Customers book and pay online; you stop managing a WhatsApp calendar.",
        get: ["Online booking with capacity", "Memberships and renewals", "Payments and reminders", "Staff and owner dashboards"],
        timeline: "4–6 weeks",
      },
      ar: {
        name: "أنظمة حجز",
        for: "جيمات، عيادات، صالونات، ستوديوهات وأي حد بيبيع مواعيد أو اشتراكات.",
        short: "العملاء بيحجزوا ويدفعوا أونلاين، وإنت تبطّل تدير كاليندر على واتساب.",
        get: ["حجز أونلاين بسعة محددة", "اشتراكات وتجديدات", "دفع وتذكيرات", "لوحات للموظفين والمالك"],
        timeline: "٤–٦ أسابيع",
      },
    },
  },
  {
    id: "dashboards",
    icon: "dashboard",
    example: "atlas-console",
    startsWith: "custom",
    copy: {
      en: {
        name: "Dashboards",
        for: "Businesses with branches, stock, staff or data spread across spreadsheets.",
        short: "One screen that tells you what's selling, what's running out and who's buying.",
        get: ["KPIs and charts that mean something", "Orders, inventory and customers", "Roles and permissions", "Reports and CSV export"],
        timeline: "4–8 weeks",
      },
      ar: {
        name: "لوحات تحكم",
        for: "بيزنس عنده فروع أو مخزون أو موظفين أو داتا متفرقة في شيتات.",
        short: "شاشة واحدة بتقولك إيه اللي بيتباع، إيه اللي هيخلص، ومين بيشتري.",
        get: ["KPIs وشارتات ليها معنى", "أوردرات ومخزون وعملاء", "أدوار وصلاحيات", "تقارير وتصدير CSV"],
        timeline: "٤–٨ أسابيع",
      },
    },
  },
  {
    id: "mobile",
    icon: "mobile",
    example: "tidal",
    startsWith: "custom",
    copy: {
      en: {
        name: "Mobile apps",
        for: "Startups and businesses whose customers live on their phones.",
        short: "One Flutter codebase for iPhone and Android, with an API behind it.",
        get: ["iOS and Android from one codebase", "Offline-friendly and fast", "Arabic and English with RTL", "Backend API and admin"],
        timeline: "6–10 weeks",
      },
      ar: {
        name: "تطبيقات موبايل",
        for: "شركات ناشئة وبيزنس عملاؤهم عايشين على الموبايل.",
        short: "كود Flutter واحد للآيفون والأندرويد، ووراه API.",
        get: ["iOS وAndroid من كود واحد", "سريع وبيشتغل من غير نت", "عربي وإنجليزي بـ RTL", "API ولوحة أدمن"],
        timeline: "٦–١٠ أسابيع",
      },
    },
  },
];
