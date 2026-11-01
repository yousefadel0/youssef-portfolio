import type { ProjectSlug } from "@/config/site";
import { cn } from "@/lib/utils";
import { AtlasDesktop, AtlasMobile } from "./mockups/atlas";
import { EmberDesktop, EmberMobile } from "./mockups/ember";
import { HalcyonDesktop, HalcyonMobile } from "./mockups/halcyon";
import { MaskanDesktop, MaskanMobile } from "./mockups/maskan";
import { PulseDesktop, PulseMobile } from "./mockups/pulse";
import { SufraDish, SufraMenu } from "./mockups/sufra";
import { TidalHome, TidalQuickAdd } from "./mockups/tidal";

const screens: Record<ProjectSlug, { primary: () => React.JSX.Element; secondary: () => React.JSX.Element; primaryIsPhone?: boolean }> = {
  "maison-ember": { primary: EmberDesktop, secondary: EmberMobile },
  halcyon: { primary: HalcyonDesktop, secondary: HalcyonMobile },
  "pulse-club": { primary: PulseDesktop, secondary: PulseMobile },
  "atlas-console": { primary: AtlasDesktop, secondary: AtlasMobile },
  tidal: { primary: TidalHome, secondary: TidalQuickAdd, primaryIsPhone: true },
  sufra: { primary: SufraMenu, secondary: SufraDish, primaryIsPhone: true },
  maskan: { primary: MaskanDesktop, secondary: MaskanMobile },
};

/** True for app-only builds, whose main screen is a phone. */
export const isPhoneFirst = (slug: ProjectSlug) => Boolean(screens[slug].primaryIsPhone);

/** A single screen of a build: the desktop view (or main phone screen for app-only builds), or its mobile companion. */
export const ProjectScreen = ({ slug, view, className }: { slug: ProjectSlug; view: "primary" | "secondary"; className?: string }) => {
  const Screen = screens[slug][view];
  return (
    <div className={className} dir="ltr" aria-hidden>
      <Screen />
    </div>
  );
};

/**
 * The composed showcase: desktop screen with the phone overlapping its corner,
 * or two phones side by side for app-only builds.
 */
export const ProjectComposite = ({ slug, className }: { slug: ProjectSlug; className?: string }) => {
  const { primary: Primary, secondary: Secondary, primaryIsPhone } = screens[slug];

  if (primaryIsPhone) {
    return (
      <div className={cn("relative flex items-end justify-center gap-[6%]", className)} dir="ltr" aria-hidden>
        <div className="w-[40%] translate-y-[6%]">
          <Secondary />
        </div>
        <div className="w-[44%]">
          <Primary />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative pe-[8%] pb-[10%]", className)} dir="ltr" aria-hidden>
      <Primary />
      <div className="absolute right-0 bottom-0 w-[26%]">
        <Secondary />
      </div>
    </div>
  );
};
