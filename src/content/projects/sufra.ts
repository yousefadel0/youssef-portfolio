import type { Project } from "./types";

export const sufra: Project = {
  slug: "sufra",
  index: 2,
  name: "Sufra",
  year: "2026",
  theme: { bg: "#F2B33D", fg: "#2A160C", accent: "#2A160C", onAccent: "#F6EBD9", muted: "#5A3418" },
  palette: [
    { name: "Saffron", hex: "#F2B33D" },
    { name: "Tahini", hex: "#F6EBD9" },
    { name: "Molokhia", hex: "#2F5D3A" },
    { name: "Tomato", hex: "#D6412B" },
    { name: "Coffee", hex: "#2A160C" },
  ],
  fonts: {
    display: { name: "Reem Kufi", cssVar: "--font-reem-kufi" },
    body: { name: "IBM Plex Sans Arabic", cssVar: "--font-plex-arabic" },
  },
  stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Zustand", "QR table codes", "WhatsApp order format", "Arabic-first i18n", "Edge caching"],
  copy: {
    en: {
      type: "Restaurant menu & ordering",
      tagline: "The menu that takes the order.",
      client: "Restaurants, cafés and cloud kitchens in Egypt that take orders on WhatsApp",
      platform: "Web app · QR menu, Arabic-first",
      summary:
        "A QR menu that opens in a second, lets guests build their order with sizes and extras, and sends it to the restaurant's WhatsApp, already written.",
      problem:
        "Most restaurants here send a blurry PDF menu on WhatsApp, prices are out of date, and someone types every order by hand. Orders get lost, extras get forgotten, and the owner has no idea which dish actually sells.",
      approach: [
        { title: "No app, no login", text: "Scan the table's QR code and the menu is there. Arabic first, English one tap away, and fast on a weak 4G connection." },
        { title: "Orders that write themselves", text: "Guests pick sizes and extras, and the order lands on WhatsApp as a clean, numbered ticket with the table or address." },
        { title: "Owner in control", text: "Prices, sold-out items and today's specials change from a phone in seconds. No reprinting menus." },
      ],
      features: [
        { title: "Category tabs that follow you", text: "Sticky categories that track the scroll, so a long menu never feels long." },
        { title: "Sizes, extras and notes", text: "Each dish has its own options with live price updates." },
        { title: "Dine-in or delivery", text: "Table number from the QR code, or address and area for delivery fees." },
        { title: "WhatsApp checkout", text: "A formatted order with totals, ready to send to the restaurant." },
        { title: "Arabic and English", text: "Real RTL layout and an Arabic type pairing, not a translated afterthought." },
        { title: "Sold-out and specials", text: "Toggle availability and pin today's dish to the top." },
      ],
      results: [
        { value: "0", label: "Apps to install for guests" },
        { value: "AR/EN", label: "Arabic-first with English toggle" },
        { value: "1 tap", label: "From cart to a written WhatsApp order" },
        { value: "AA", label: "WCAG contrast and keyboard navigation" },
      ],
    },
    ar: {
      type: "منيو ومطلوبات للمطاعم",
      tagline: "المنيو اللي بياخد الأوردر.",
      client: "مطاعم وكافيهات ومطابخ أونلاين في مصر بتاخد أوردرات على واتساب",
      platform: "تطبيق ويب · منيو QR، العربي الأول",
      summary: "منيو QR بيفتح في ثانية، الزبون بيظبط أوردره بالحجم والإضافات، وبيتبعت على واتساب المطعم مكتوب جاهز.",
      problem:
        "أغلب المطاعم هنا بتبعت منيو PDF مش واضح على واتساب، الأسعار قديمة، وحد بيكتب كل أوردر بإيده. أوردرات بتضيع، إضافات بتتنسي، وصاحب المطعم مش عارف أنهي صنف بيتباع فعلاً.",
      approach: [
        { title: "من غير تطبيق ولا تسجيل", text: "تعمل سكان لكود الترابيزة والمنيو قدامك. العربي الأول، والإنجليزي بضغطة، وسريع حتى على نت ضعيف." },
        { title: "أوردرات بتكتب نفسها", text: "الزبون بيختار الحجم والإضافات، والأوردر بيوصل واتساب كتذكرة مرتبة ومترقمة فيها الترابيزة أو العنوان." },
        { title: "صاحب المطعم متحكم", text: "الأسعار والأصناف الخلصانة وطبق اليوم بتتغير من الموبايل في ثواني. من غير ما تطبع منيو تاني." },
      ],
      features: [
        { title: "أقسام بتمشي معاك", text: "تابات الأقسام ثابتة وبتتابع السكرول، فالمنيو الطويل مش بيبان طويل." },
        { title: "أحجام وإضافات وملاحظات", text: "كل صنف ليه اختياراته والسعر بيتحدث على طول." },
        { title: "صالة أو توصيل", text: "رقم الترابيزة من كود الـ QR، أو العنوان والمنطقة لمصاريف التوصيل." },
        { title: "الدفع على واتساب", text: "أوردر مكتوب بالإجمالي، جاهز يتبعت للمطعم." },
        { title: "عربي وإنجليزي", text: "RTL حقيقي وخطوط عربي متناسقة، مش ترجمة على الهامش." },
        { title: "خلصان وعروض", text: "تقفل الصنف لما يخلص وتثبّت طبق اليوم فوق." },
      ],
      results: [
        { value: "0", label: "تطبيقات الزبون محتاج ينزّلها" },
        { value: "AR/EN", label: "العربي الأول مع زرار إنجليزي" },
        { value: "1 tap", label: "من السلة لأوردر مكتوب على واتساب" },
        { value: "AA", label: "تباين WCAG وتنقّل بالكيبورد" },
      ],
    },
  },
};
