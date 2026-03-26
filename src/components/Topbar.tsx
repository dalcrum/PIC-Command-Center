"use client";

import { useState } from "react";
import Link from "next/link";

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-20 h-16 bg-surface border-b border-border flex items-center justify-between px-4 md:px-6">
      {/* Search */}
      <div className="flex-1 max-w-md ml-12 md:ml-0">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search contacts, deals, projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-4">
        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background transition-colors"
          aria-label="Notifications"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>

        {/* User avatar */}
        <Link
          href="/admin"
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-background transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
            <span className="text-white text-sm font-semibold">DC</span>
          </div>
          <span className="hidden md:block text-sm font-medium text-text-primary">
            Dallas
          </span>
        </Link>
      </div>
    </header>
  );
}
