import type { SVGProps } from "react";
import type { ServiceIcon } from "@/content/services";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

/** Points to the inline end: right in LTR, flips in RTL. */
export const ArrowIcon = ({ size = 18, className, ...props }: IconProps) => (
  <svg {...base(size, props)} className={`rtl:-scale-x-100 ${className ?? ""}`}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRightIcon = ({ size = 18, className, ...props }: IconProps) => (
  <svg {...base(size, props)} className={`rtl:-scale-x-100 ${className ?? ""}`}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowDownIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M12 4v15M6 13l6 6 6-6" />
  </svg>
);

export const PlusIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M12 4v16M4 12h16" />
  </svg>
);

export const MinusIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M4 12h16" />
  </svg>
);

export const CheckIcon = ({ size = 16, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const DownloadIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M12 3v13M6 11l6 6 6-6M4 21h16" />
  </svg>
);

export const MailIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M3 5h18v14H3z" />
    <path d="m3 6 9 7 9-7" />
  </svg>
);

export const PhoneIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  </svg>
);

export const WhatsAppIcon = ({ size = 20, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...props}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.22 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
  </svg>
);

export const GithubIcon = ({ size = 18, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...props}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

export const LinkedinIcon = ({ size = 18, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...props}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V21h-4V9.75Z" />
  </svg>
);

export const TikTokIcon = ({ size = 18, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...props}>
    <path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v3.3a7.6 7.6 0 0 1-3.8-1.1v5.8c0 3.6-2.5 6.2-6 6.2-3.3 0-5.9-2.6-5.9-5.8 0-3.6 3-6.3 6.8-5.8v3.4c-1.7-.4-3.4.7-3.4 2.4 0 1.4 1.1 2.5 2.5 2.5 1.6 0 2.6-1 2.6-3V3h3.3Z" />
  </svg>
);

export const InstagramIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size, props)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
);

export const socialIcons = {
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
} as const;

export const socialNames = { tiktok: "TikTok", instagram: "Instagram", github: "GitHub", linkedin: "LinkedIn" } as const;

/** Geometric line icons for the five services, drawn on the build-sheet grid. */
export const ServiceGlyph = ({ icon, size = 44, ...props }: IconProps & { icon: ServiceIcon }) => {
  const common = { ...base(size, props), viewBox: "0 0 48 48", strokeWidth: 2 };
  switch (icon) {
    case "site":
      return (
        <svg {...common}>
          <rect x="5" y="9" width="38" height="30" />
          <path d="M5 16h38M10 12.5h2M14 12.5h2" />
          <path d="M11 23h16M11 28h10M31 22h7v11h-7z" />
        </svg>
      );
    case "store":
      return (
        <svg {...common}>
          <path d="M8 17h32l-3 22H11z" />
          <path d="M17 17v-3a7 7 0 0 1 14 0v3" />
          <path d="M18 26h12" />
        </svg>
      );
    case "booking":
      return (
        <svg {...common}>
          <rect x="6" y="10" width="36" height="30" />
          <path d="M6 18h36M15 6v8M33 6v8" />
          <path d="m17 29 5 5 9-10" />
        </svg>
      );
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="5" y="7" width="38" height="34" />
          <path d="M5 15h38M12 34V26M20 34V21M28 34V24M36 34V19" />
        </svg>
      );
    case "mobile":
      return (
        <svg {...common}>
          <rect x="14" y="4" width="20" height="40" rx="3" />
          <path d="M21 9h6M20 38h8" />
          <circle cx="24" cy="23" r="6" />
        </svg>
      );
  }
};
