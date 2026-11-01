import type { Project } from "./types";

export const pulseClub: Project = {
  slug: "pulse-club",
  index: 3,
  name: "Pulse Club",
  year: "2026",
  theme: { bg: "#C9F31D", fg: "#0E0F0C", accent: "#0E0F0C", onAccent: "#C9F31D", muted: "#3D4312" },
  palette: [
    { name: "Night", hex: "#0E0F0C" },
    { name: "Chalk", hex: "#F3F1EA" },
    { name: "Volt", hex: "#C9F31D" },
    { name: "Graphite", hex: "#2A2B27" },
  ],
  fonts: {
    display: { name: "Archivo", cssVar: "--font-archivo" },
    body: { name: "IBM Plex Sans Arabic", cssVar: "--font-plex-arabic" },
  },
  stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL / SQLite", "Auth.js", "Zod", "Paymob-ready billing", "Vitest"],
  copy: {
    en: {
      type: "Booking & membership system",
      tagline: "The front desk, running itself.",
      client: "Sports clubs, gyms, clinics and salons that sell memberships and classes",
      platform: "Web app · member, staff and owner roles",
      summary:
        "A full membership and class-booking platform: plans, payments, bookings with waitlists, QR check-in and a staff dashboard, in Arabic and English.",
      problem:
        "Most clubs in Egypt run on a notebook, a WhatsApp group and an Excel sheet. Members don't know when their plan expires, classes get double-booked, and nobody chases late payments. They need software that handles the rules, not just shows a calendar.",
      approach: [
        { title: "Rules engine first", text: "Subscription states, renewals, double-booking prevention, waitlist promotion and late-cancel policy live in tested business logic, not in the UI." },
        { title: "Three apps in one", text: "Members book and pay, staff check people in, owners see revenue and expiring memberships. Each role sees only what it should." },
        { title: "Arabic as a first-class citizen", text: "Real RTL layout, an Arabic type pairing, EGP pricing and realistic Arabic data from the seed." },
      ],
      features: [
        { title: "Plans & payments", text: "Plan builder, payment gateway abstraction with a working test gateway, Paymob-ready." },
        { title: "Class booking", text: "Capacity, waitlist with auto-promotion, cancel with late policy." },
        { title: "QR check-in", text: "Member pass with QR and a staff scan screen with attendance log." },
        { title: "Staff dashboard", text: "Members, scheduling calendar, revenue summary, expiring memberships." },
        { title: "Notifications", text: "In-app and email stubs for confirmations and renewal reminders." },
        { title: "Security", text: "Hashed passwords, server-side authorization, zod validation, auth rate limiting." },
      ],
      results: [
        { value: "5", label: "Subscription states handled by tested rules" },
        { value: "3", label: "Roles: owner, staff, member" },
        { value: "EN/AR", label: "Full RTL with language switcher" },
        { value: "AA", label: "WCAG contrast and keyboard navigation" },
      ],
    },
    ar: {
      type: "نظام حجز واشتراكات",
      tagline: "الريسبشن، بيشغّل نفسه.",
      client: "نوادي رياضية وجيمات وعيادات وصالونات بتبيع اشتراكات وكلاسات",
      platform: "تطبيق ويب · أدوار للعضو والموظف والمالك",
      summary: "منصة كاملة للاشتراكات وحجز الكلاسات: باقات، دفع، حجوزات بقايمة انتظار، تشيك إن بالـ QR ولوحة للموظفين، بالعربي والإنجليزي.",
      problem:
        "أغلب النوادي في مصر شغالة بكشكول وجروب واتساب وشيت إكسل. العضو مش عارف اشتراكه بيخلص إمتى، الكلاسات بتتحجز مرتين، ومحدش بيتابع المتأخرين في الدفع. محتاجين سوفتوير بيطبّق القواعد، مش بس بيعرض كاليندر.",
      approach: [
        { title: "القواعد الأول", text: "حالات الاشتراك والتجديد ومنع الحجز المزدوج وترقية قايمة الانتظار وسياسة الإلغاء المتأخر، كلها في منطق متختبر، مش في الواجهة." },
        { title: "٣ تطبيقات في واحد", text: "العضو بيحجز ويدفع، الموظف بيسجّل الحضور، والمالك بيشوف الإيرادات والاشتراكات اللي قربت تخلص. كل دور بيشوف اللي يخصه بس." },
        { title: "العربي مش ترجمة", text: "RTL حقيقي، خطوط عربي متناسقة، أسعار بالجنيه، وداتا عربي واقعية." },
      ],
      features: [
        { title: "الباقات والدفع", text: "بناء الباقات، طبقة دفع مع بوابة تجريبية شغالة، وجاهزة لـ Paymob." },
        { title: "حجز الكلاسات", text: "سعة محددة، قايمة انتظار بترقية تلقائية، وإلغاء بسياسة واضحة." },
        { title: "تشيك إن بالـ QR", text: "كارت عضوية بـ QR وشاشة سكان للموظف مع سجل حضور." },
        { title: "لوحة الموظفين", text: "الأعضاء، كاليندر المواعيد، ملخص الإيرادات، الاشتراكات اللي هتخلص." },
        { title: "إشعارات", text: "إشعارات داخل التطبيق وإيميلات لتأكيد الحجز وتذكير التجديد." },
        { title: "الأمان", text: "باسوردات متشفرة، صلاحيات على السيرفر، فاليديشن zod، وحماية تسجيل الدخول." },
      ],
      results: [
        { value: "5", label: "حالات اشتراك بقواعد متختبرة" },
        { value: "3", label: "أدوار: مالك، موظف، عضو" },
        { value: "EN/AR", label: "RTL كامل مع تبديل اللغة" },
        { value: "AA", label: "تباين WCAG وتنقّل بالكيبورد" },
      ],
    },
  },
};
