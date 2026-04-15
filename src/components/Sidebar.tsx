"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MODULES, type ModuleId } from "@/types/modules";

const moduleOrder: ModuleId[] = ["moonshot", "orbit", "astro", "gravity"];

const staticNavItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    exact: true,
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  },
];

const bottomNavItems = [
  {
    name: "Agents",
    href: "/dashboard/agents",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    name: "Admin",
    href: "/admin",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-pic-blue text-white"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40 h-screen
          bg-pic-blue text-white
          flex flex-col
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-16" : "w-64"}
          ${collapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-pic-gold flex items-center justify-center shrink-0">
              <span className="text-pic-black font-bold text-sm">P</span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h1 className="text-sm font-bold text-white truncate tracking-wide uppercase">
                  PIC Command Center
                </h1>
                <p className="text-[10px] text-white/40 truncate uppercase tracking-widest">
                  Proud Impact Collective
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {/* Dashboard */}
          {staticNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-150
                ${
                  isActive(item.href, item.exact)
                    ? "bg-pic-gold text-pic-black"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }
                ${collapsed ? "justify-center" : ""}
              `}
              title={collapsed ? item.name : undefined}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}

          {/* Divider */}
          <div className="pt-3 pb-2 px-3">
            {!collapsed && (
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                Modules
              </p>
            )}
            {collapsed && <div className="border-t border-white/10" />}
          </div>

          {/* Module items */}
          {moduleOrder.map((modId) => {
            const mod = MODULES[modId];
            const active = isActive(mod.href);
            return (
              <Link
                key={mod.id}
                href={mod.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors duration-150 group
                  ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/8"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
                title={collapsed ? mod.name : undefined}
              >
                {/* Module dot indicator */}
                <div className="relative shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={mod.icon} />
                  </svg>
                </div>
                {!collapsed && (
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: mod.color }}
                    />
                    <span className="truncate">{mod.name}</span>
                    {mod.status !== "live" && (
                      <span className="text-[9px] text-white/30 uppercase tracking-wider">
                        {mod.status === "building" ? "Beta" : "Soon"}
                      </span>
                    )}
                  </div>
                )}
                {/* Active left accent bar */}
                {active && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r"
                    style={{ backgroundColor: mod.color }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-2 pb-2 space-y-1 border-t border-white/10 pt-2">
          {bottomNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                transition-colors duration-150
                ${
                  isActive(item.href)
                    ? "bg-pic-gold text-pic-black"
                    : "text-white/40 hover:text-white hover:bg-white/8"
                }
                ${collapsed ? "justify-center" : ""}
              `}
              title={collapsed ? item.name : undefined}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {!collapsed && <span className="text-xs">{item.name}</span>}
            </Link>
          ))}

          {/* Collapse toggle (desktop) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex items-center justify-center w-full p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/8 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
