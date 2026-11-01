/** Menu data for the Sufra builds: shared by the case-study mockups and the live demo. */

export type Lang = "en" | "ar";
type T = Record<Lang, string>;

export type DishArt = { plate: string; base: string; top: string; garnish: string };

export type Dish = {
  id: string;
  cat: string;
  name: T;
  desc: T;
  price: number;
  art: DishArt;
  tag?: "popular" | "spicy" | "new";
  soldOut?: boolean;
  sizes?: { id: string; label: T; add: number }[];
  extras?: { id: string; label: T; add: number }[];
};

export const restaurant = { name: { en: "Beit Sufra", ar: "بيت سفرة" }, area: { en: "Zamalek, Cairo", ar: "الزمالك، القاهرة" }, deliveryFee: 25 };

export const categories: { id: string; label: T }[] = [
  { id: "specials", label: { en: "Today", ar: "النهارده" } },
  { id: "bowls", label: { en: "Koshary & bowls", ar: "كشري وأطباق" } },
  { id: "grills", label: { en: "Grills", ar: "مشويات" } },
  { id: "sandwiches", label: { en: "Sandwiches", ar: "ساندوتشات" } },
  { id: "desserts", label: { en: "Desserts", ar: "حلويات" } },
  { id: "drinks", label: { en: "Drinks", ar: "مشروبات" } },
];

const sizes = [
  { id: "s", label: { en: "Small", ar: "صغير" }, add: 0 },
  { id: "m", label: { en: "Medium", ar: "وسط" }, add: 20 },
  { id: "l", label: { en: "Large", ar: "كبير" }, add: 40 },
];

export const dishes: Dish[] = [
  {
    id: "molokhia",
    cat: "specials",
    name: { en: "Molokhia with roast chicken", ar: "ملوخية بالفراخ المحمرة" },
    desc: { en: "Garlic-coriander molokhia, vermicelli rice, quarter chicken.", ar: "ملوخية بالتقلية، رز بالشعرية، ربع فرخة." },
    price: 165,
    art: { plate: "#F6EBD9", base: "#2F5D3A", top: "#C98A3A", garnish: "#F6EBD9" },
    tag: "popular",
  },
  {
    id: "koshary",
    cat: "bowls",
    name: { en: "Sufra koshary", ar: "كشري سفرة" },
    desc: { en: "Rice, lentils, pasta, tomato daqqa, crispy onions.", ar: "رز وعدس ومكرونة، صلصة ودقة، بصل مقرمش." },
    price: 85,
    art: { plate: "#F6EBD9", base: "#8A5A2B", top: "#D6412B", garnish: "#E9B44C" },
    tag: "popular",
    sizes,
    extras: [
      { id: "onion", label: { en: "Extra crispy onions", ar: "بصل مقرمش زيادة" }, add: 10 },
      { id: "hot", label: { en: "Extra hot sauce", ar: "شطة زيادة" }, add: 5 },
      { id: "chickpea", label: { en: "Chickpeas", ar: "حمص" }, add: 10 },
    ],
  },
  {
    id: "fattah",
    cat: "bowls",
    name: { en: "Beef fattah", ar: "فتة باللحمة" },
    desc: { en: "Toasted bread, rice, garlic-vinegar sauce, slow-cooked beef.", ar: "عيش محمص، رز، صلصة بالخل والتوم، لحمة مطهية على مهل." },
    price: 210,
    art: { plate: "#F6EBD9", base: "#F0D9A8", top: "#8C3B22", garnish: "#D6412B" },
  },
  {
    id: "kofta",
    cat: "grills",
    name: { en: "Kofta plate", ar: "طبق كفتة" },
    desc: { en: "Charcoal kofta, tahini, salad, baladi bread.", ar: "كفتة على الفحم، طحينة، سلطة، عيش بلدي." },
    price: 190,
    art: { plate: "#F6EBD9", base: "#6B3A1F", top: "#3E7B47", garnish: "#F6EBD9" },
    extras: [{ id: "tahini", label: { en: "Extra tahini", ar: "طحينة زيادة" }, add: 10 }],
  },
  {
    id: "tawook",
    cat: "grills",
    name: { en: "Shish tawook", ar: "شيش طاووق" },
    desc: { en: "Marinated chicken, garlic toum, pickles, fries.", ar: "فراخ متتبلة، ثومية، مخلل، بطاطس." },
    price: 180,
    art: { plate: "#F6EBD9", base: "#E3A23A", top: "#B5532E", garnish: "#3E7B47" },
    tag: "spicy",
  },
  {
    id: "hawawshi",
    cat: "sandwiches",
    name: { en: "Hawawshi", ar: "حواوشي" },
    desc: { en: "Spiced minced beef baked in baladi bread.", ar: "لحمة مفرومة متبلة في عيش بلدي في الفرن." },
    price: 95,
    art: { plate: "#F6EBD9", base: "#C98A3A", top: "#7A3E1D", garnish: "#D6412B" },
    extras: [{ id: "cheese", label: { en: "Add cheese", ar: "جبنة" }, add: 20 }],
  },
  {
    id: "taameya",
    cat: "sandwiches",
    name: { en: "Taameya sandwich", ar: "ساندوتش طعمية" },
    desc: { en: "Green falafel, tahini, salad, pickles.", ar: "طعمية خضرا، طحينة، سلطة، مخلل." },
    price: 25,
    art: { plate: "#F6EBD9", base: "#E9C98A", top: "#4F7A3A", garnish: "#D6412B" },
    tag: "new",
    extras: [{ id: "egg", label: { en: "Add boiled egg", ar: "بيضة مسلوقة" }, add: 10 }],
  },
  {
    id: "omali",
    cat: "desserts",
    name: { en: "Om Ali", ar: "أم علي" },
    desc: { en: "Baked pastry, milk, nuts, raisins.", ar: "رقاق بالفرن، لبن، مكسرات، زبيب." },
    price: 70,
    art: { plate: "#F6EBD9", base: "#F0D9A8", top: "#C98A3A", garnish: "#8A5A2B" },
  },
  {
    id: "basbousa",
    cat: "desserts",
    name: { en: "Basbousa with cream", ar: "بسبوسة بالقشطة" },
    desc: { en: "Semolina cake, syrup, fresh cream.", ar: "بسبوسة بالشربات والقشطة." },
    price: 55,
    art: { plate: "#F6EBD9", base: "#E3A23A", top: "#F6EBD9", garnish: "#B5532E" },
    soldOut: true,
  },
  {
    id: "karkade",
    cat: "drinks",
    name: { en: "Iced karkade", ar: "كركديه ساقع" },
    desc: { en: "Hibiscus, a little sugar, lots of ice.", ar: "كركديه بسكر خفيف وتلج كتير." },
    price: 30,
    art: { plate: "#F6EBD9", base: "#9C1F2E", top: "#C2364A", garnish: "#F6EBD9" },
  },
  {
    id: "mango",
    cat: "drinks",
    name: { en: "Fresh mango", ar: "مانجا فريش" },
    desc: { en: "Seasonal mango, blended to order.", ar: "مانجا الموسم، متخفوقة على الطلب." },
    price: 45,
    art: { plate: "#F6EBD9", base: "#F2A33A", top: "#F7C25B", garnish: "#2F5D3A" },
  },
];

export const tagLabel: Record<NonNullable<Dish["tag"]>, T> = {
  popular: { en: "Popular", ar: "الأكثر طلباً" },
  spicy: { en: "Spicy", ar: "حرّاق" },
  new: { en: "New", ar: "جديد" },
};
