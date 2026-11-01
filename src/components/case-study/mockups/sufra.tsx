import { Plate } from "@/components/demos/art";
import { categories, dishes, restaurant } from "@/components/demos/sufra-data";
import { PhoneFrame, StatusBar } from "../frames";

const C = { saffron: "#F2B33D", tahini: "#F6EBD9", molokhia: "#2F5D3A", tomato: "#D6412B", coffee: "#2A160C", mute: "#6E5240" };
const ar = { fontFamily: "var(--font-reem-kufi, var(--font-alexandria)), var(--font-plex-arabic), system-ui, sans-serif" };
const body = { fontFamily: "var(--font-plex-arabic, var(--font-alexandria)), system-ui, sans-serif" };

/** The Arabic menu screen guests see after scanning the table QR code. */
export const SufraMenu = () => (
  <PhoneFrame scroll="-30%">
    <div className="w-[24em]" style={{ background: C.tahini, color: C.coffee, ...body }} dir="rtl">
      <StatusBar color={C.coffee} />
      <div className="px-[1.3em] pt-[0.4em]" style={{ background: C.saffron }}>
        <div className="flex items-center justify-between">
          <span className="text-[1.6em] font-bold" style={ar}>
            {restaurant.name.ar}
          </span>
          <span className="rounded-full px-[0.7em] py-[0.25em] text-[0.7em] font-semibold" style={{ background: C.coffee, color: C.saffron }} dir="ltr">
            EN · ع
          </span>
        </div>
        <p className="pb-[0.9em] text-[0.75em]">ترابيزة ٧ · {restaurant.area.ar}</p>
        <div className="-mx-[1.3em] flex gap-[0.4em] overflow-hidden px-[1.3em] pb-[0.8em]">
          {categories.slice(0, 4).map((c, i) => (
            <span key={c.id} className="shrink-0 rounded-full px-[0.9em] py-[0.4em] text-[0.75em] font-semibold" style={i === 1 ? { background: C.coffee, color: C.tahini } : { background: "rgb(42 22 12 / 0.08)" }}>
              {c.label.ar}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-[1.3em] mt-[1em] flex items-center gap-[0.9em] rounded-[1.2em] p-[0.9em]" style={{ background: C.molokhia, color: C.tahini }}>
        <Plate art={dishes[0].art} className="size-[5em] shrink-0" />
        <div>
          <p className="text-[0.65em] font-semibold" style={{ color: C.saffron }}>
            طبق النهارده
          </p>
          <p className="text-[1em] font-bold" style={ar}>
            {dishes[0].name.ar}
          </p>
          <p className="text-[0.8em]" dir="ltr">
            165 ج.م
          </p>
        </div>
      </div>

      <div className="space-y-[0.7em] px-[1.3em] py-[1em]">
        {dishes.slice(1, 7).map((d) => (
          <div key={d.id} className="flex items-center gap-[0.8em] rounded-[1em] bg-white/70 p-[0.7em]">
            <Plate art={d.art} className="size-[4em] shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[0.9em] font-bold" style={ar}>
                {d.name.ar}
              </p>
              <p className="truncate text-[0.68em]" style={{ color: C.mute }}>
                {d.desc.ar}
              </p>
              <p className="mt-[0.2em] text-[0.8em] font-semibold" dir="ltr">
                <span className="block text-end">{d.price} ج.م</span>
              </p>
            </div>
            <span className="grid size-[2em] shrink-0 place-items-center rounded-full text-[1em] font-bold" style={{ background: C.coffee, color: C.saffron }}>
              +
            </span>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 mx-[1em] mb-[1em] flex items-center justify-between rounded-[1em] px-[1.1em] py-[0.9em]" style={{ background: C.coffee, color: C.tahini }}>
        <span className="text-[0.8em] font-semibold">٣ أصناف · اطلب على واتساب</span>
        <span className="text-[0.85em] font-bold" dir="ltr">
          305 ج.م
        </span>
      </div>
    </div>
  </PhoneFrame>
);

/** The dish sheet with sizes and extras, and the order total. */
export const SufraDish = () => {
  const d = dishes[1];
  return (
    <PhoneFrame>
      <div className="flex h-full w-[24em] flex-col" style={{ background: C.saffron, color: C.coffee, ...body }} dir="rtl">
        <StatusBar color={C.coffee} />
        <div className="relative flex h-[15em] items-center justify-center">
          <Plate art={d.art} className="size-[12em] drop-shadow-[0_1.2em_1.2em_rgb(42_22_12/0.35)]" />
          <span className="absolute top-[0.5em] right-[1.2em] rounded-full px-[0.7em] py-[0.2em] text-[0.68em] font-bold" style={{ background: C.tomato, color: "#fff" }}>
            الأكثر طلباً
          </span>
        </div>
        <div className="flex-1 rounded-t-[1.8em] px-[1.4em] pt-[1.3em]" style={{ background: C.tahini }}>
          <div className="flex items-start justify-between gap-[1em]">
            <p className="text-[1.5em] leading-[1.15] font-bold" style={ar}>
              {d.name.ar}
            </p>
            <p className="text-[1.1em] font-bold" dir="ltr">
              105 ج.م
            </p>
          </div>
          <p className="mt-[0.3em] text-[0.75em]" style={{ color: C.mute }}>
            {d.desc.ar}
          </p>
          <p className="mt-[1em] text-[0.72em] font-bold">الحجم</p>
          <div className="mt-[0.4em] grid grid-cols-3 gap-[0.4em]">
            {d.sizes!.map((s, i) => (
              <span key={s.id} className="rounded-[0.7em] border py-[0.55em] text-center text-[0.75em] font-semibold" style={i === 1 ? { background: C.coffee, color: C.tahini, borderColor: C.coffee } : { borderColor: "rgb(42 22 12 / 0.2)" }}>
                {s.label.ar}
              </span>
            ))}
          </div>
          <p className="mt-[1em] text-[0.72em] font-bold">إضافات</p>
          {d.extras!.map((x, i) => (
            <div key={x.id} className="mt-[0.45em] flex items-center justify-between text-[0.78em]">
              <span className="flex items-center gap-[0.5em]">
                <span className="grid size-[1.2em] place-items-center rounded-[0.3em] border text-[0.7em]" style={i === 0 ? { background: C.molokhia, borderColor: C.molokhia, color: "#fff" } : { borderColor: "rgb(42 22 12 / 0.3)" }}>
                  {i === 0 ? "✓" : ""}
                </span>
                {x.label.ar}
              </span>
              <span dir="ltr">+{x.add}</span>
            </div>
          ))}
          <div className="mt-[1.2em] mb-[1.4em] flex gap-[0.5em]">
            <span className="flex items-center gap-[0.8em] rounded-[0.9em] border px-[0.9em] text-[0.9em] font-bold" style={{ borderColor: "rgb(42 22 12 / 0.25)" }}>
              <span>−</span>2<span>+</span>
            </span>
            <span className="flex-1 rounded-[0.9em] py-[0.9em] text-center text-[0.85em] font-bold" style={{ background: C.coffee, color: C.saffron }}>
              أضف للأوردر · 210 ج.م
            </span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
};
