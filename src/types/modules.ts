export type ModuleId = "moonshot" | "orbit" | "astro" | "gravity";

export interface ModuleConfig {
  id: ModuleId;
  name: string;
  aiName: string;
  description: string;
  color: string;
  href: string;
  icon: string; // SVG path
  team: string;
  status: "live" | "building" | "planned";
}

export const MODULES: Record<ModuleId, ModuleConfig> = {
  moonshot: {
    id: "moonshot",
    name: "Moonshot",
    aiName: "Kennedy",
    description: "Retail AI — clients, SKUs, deals, placements",
    color: "#EF9F27",
    href: "/dashboard/moonshot",
    icon: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
    team: "Alex, Michael, Sharon",
    status: "live",
  },
  orbit: {
    id: "orbit",
    name: "Orbit",
    aiName: "Kodiak",
    description: "Social Commerce AI — TikTok Shop, creators, GMV",
    color: "#378ADD",
    href: "/dashboard/orbit",
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418",
    team: "Vijay, Stephanie",
    status: "planned",
  },
  astro: {
    id: "astro",
    name: "Astro",
    aiName: "Chica",
    description: "BizDev & Marketing AI — leads, outreach, content",
    color: "#5A8F1A",
    href: "/dashboard/astro",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    team: "Dallas, Cole",
    status: "building",
  },
  gravity: {
    id: "gravity",
    name: "Gravity",
    aiName: "Boca",
    description: "OPEX AI — financials, HR, commissions, operations",
    color: "#D49A12",
    href: "/dashboard/gravity",
    icon: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z",
    team: "Dallas, Haley, Tim",
    status: "planned",
  },
};

export type UserRole = "Admin" | "Manager" | "TeamMember" | "ClientPortal";
