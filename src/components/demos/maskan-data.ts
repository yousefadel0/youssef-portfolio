import type { BuildingArt } from "./art";

/** Listings for the Maskan builds: shared by the case-study mockups and the live demo. Fictional units. */

export type Area = "New Cairo" | "Sheikh Zayed" | "New Capital" | "North Coast" | "6th of October";
export type UnitType = "Apartment" | "Villa" | "Townhouse" | "Chalet";

export type Listing = {
  id: string;
  title: string;
  compound: string;
  area: Area;
  type: UnitType;
  beds: number;
  baths: number;
  size: number;
  price: number;
  finishing: "Fully finished" | "Semi-finished" | "Core & shell";
  delivery: string;
  /** Position on the district map, in percent. */
  pin: { x: number; y: number };
  art: BuildingArt;
};

export const areas: Area[] = ["New Cairo", "Sheikh Zayed", "New Capital", "North Coast", "6th of October"];
export const types: UnitType[] = ["Apartment", "Villa", "Townhouse", "Chalet"];

/** District label positions on the illustrated map. */
export const districts: { area: Area; x: number; y: number; w: number; h: number }[] = [
  { area: "North Coast", x: 4, y: 6, w: 44, h: 16 },
  { area: "Sheikh Zayed", x: 8, y: 40, w: 22, h: 20 },
  { area: "6th of October", x: 10, y: 64, w: 24, h: 22 },
  { area: "New Cairo", x: 56, y: 46, w: 22, h: 22 },
  { area: "New Capital", x: 78, y: 54, w: 18, h: 22 },
];

const sand: Omit<BuildingArt, "floors" | "cols" | "kind"> = { sky: "#E9DCC6", wall: "#EDE7DC", trim: "#9A4A2F", window: "#3B4A52" };
const dusk: Omit<BuildingArt, "floors" | "cols" | "kind"> = { sky: "#D8B48C", wall: "#F4EEE4", trim: "#1C1A16", window: "#5C6E78" };
const sea: Omit<BuildingArt, "floors" | "cols" | "kind"> = { sky: "#BFD6D6", wall: "#FBF8F2", trim: "#3E5B45", window: "#2F6F7E" };

export const listings: Listing[] = [
  { id: "mk-101", title: "Corner apartment with garden view", compound: "Basalt Residence", area: "New Cairo", type: "Apartment", beds: 3, baths: 2, size: 165, price: 7_450_000, finishing: "Fully finished", delivery: "Ready to move", pin: { x: 64, y: 55 }, art: { ...sand, floors: 6, cols: 4, kind: "tower" } },
  { id: "mk-102", title: "Twin house on the central park", compound: "Palm Crescent", area: "Sheikh Zayed", type: "Townhouse", beds: 4, baths: 3, size: 240, price: 13_900_000, finishing: "Semi-finished", delivery: "Q3 2027", pin: { x: 18, y: 50 }, art: { ...dusk, floors: 2, cols: 5, kind: "villa" } },
  { id: "mk-103", title: "Sea-view chalet, first row", compound: "Lagoon Bay", area: "North Coast", type: "Chalet", beds: 2, baths: 2, size: 110, price: 8_200_000, finishing: "Fully finished", delivery: "Summer 2027", pin: { x: 26, y: 13 }, art: { ...sea, floors: 2, cols: 4, kind: "chalet" } },
  { id: "mk-104", title: "Standalone villa with private pool", compound: "Basalt Hills", area: "New Cairo", type: "Villa", beds: 5, baths: 5, size: 420, price: 32_500_000, finishing: "Core & shell", delivery: "Q1 2028", pin: { x: 71, y: 60 }, art: { ...dusk, floors: 2, cols: 6, kind: "villa" } },
  { id: "mk-105", title: "Starter apartment near the monorail", compound: "Capital Gardens", area: "New Capital", type: "Apartment", beds: 2, baths: 1, size: 112, price: 4_350_000, finishing: "Semi-finished", delivery: "Q4 2026", pin: { x: 86, y: 63 }, art: { ...sand, floors: 7, cols: 3, kind: "tower" } },
  { id: "mk-106", title: "Family apartment, three bedrooms", compound: "October Oaks", area: "6th of October", type: "Apartment", beds: 3, baths: 2, size: 150, price: 5_600_000, finishing: "Fully finished", delivery: "Ready to move", pin: { x: 21, y: 74 }, art: { ...sea, floors: 5, cols: 4, kind: "tower" } },
  { id: "mk-107", title: "End-unit townhouse with roof", compound: "Palm Crescent", area: "Sheikh Zayed", type: "Townhouse", beds: 3, baths: 3, size: 210, price: 11_750_000, finishing: "Fully finished", delivery: "Q2 2027", pin: { x: 24, y: 47 }, art: { ...sand, floors: 2, cols: 5, kind: "villa" } },
  { id: "mk-108", title: "Lagoon chalet with terrace", compound: "Lagoon Bay", area: "North Coast", type: "Chalet", beds: 3, baths: 2, size: 140, price: 10_400_000, finishing: "Semi-finished", delivery: "Summer 2028", pin: { x: 36, y: 15 }, art: { ...sea, floors: 2, cols: 5, kind: "chalet" } },
];

export const egp = (n: number) => `EGP ${new Intl.NumberFormat("en-US").format(Math.round(n))}`;
export const egpShort = (n: number) => (n >= 1_000_000 ? `EGP ${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M` : egp(n));

/** Equal monthly installments with no interest, as most developer payment plans here work. */
export const monthly = (price: number, downPct: number, years: number) => (price * (1 - downPct / 100)) / (years * 12);
