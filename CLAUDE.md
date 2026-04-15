# CLAUDE.md — PIC Command Center

> This is the authoritative context file for Claude Code. Read this fully before writing any code. Every architectural decision, naming convention, color, module structure, and data rule lives here. When in doubt, refer back to this file.

---

## What this project is

PIC Command Center is the AI-native operating system for Proud Impact Collective. It is the master platform that sits above four specialized modules — Moonshot, Orbit, Astro, and Gravity. Every team member and client logs in here. Access to each module is granted from this layer. Houston AI is the cross-platform intelligence layer that lives here and eventually connects across all modules.

**Live URL:** proudimpact.ai
**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Supabase, Vercel
**Repo:** Private GitHub — main branch is production, never push directly to main

---

## Brand & design system

### Official brand colors (from PIC Brand Identity doc)
| Token | Hex | Usage |
|---|---|---|
| `pic-black` | `#0b0f19` | Deepest background, true black contexts |
| `pic-navy` | `#0a1f32` | Primary surface — page bg, cards, sections |
| `pic-blue` | `#0f2944` | Elevated surfaces — header, nav, raised cards |
| `pic-dark-gray` | `#b3b3b3` | Muted text, borders on dark surfaces |
| `pic-light-gray` | `#cdcdcd` | Secondary text, disabled states, captions |
| `pic-gold` | `#c08d20` | THE primary accent — CTAs, active states, highlights, logo accent |

### Module accent colors
| Module | Color | Hex |
|---|---|---|
| Moonshot (Retail AI) | Orange | `#EF9F27` |
| Orbit (Social Commerce AI) | Blue | `#378ADD` |
| Astro (BizDev & Marketing AI) | Green | `#5A8F1A` |
| Gravity (OPEX AI) | Yellow/Gold | `#D49A12` |

### Official typography system (from PIC Brand Identity doc)
| Role | Font | Style |
|---|---|---|
| H1 / Display | Klein Condensed | Bold, ALL CAPS — hero sections, module names |
| H2 / Editorial | Times New Roman | Italic — section titles, card headers |
| H3 / UI Labels | Montserrat | Uppercase, tracked — nav, table headers, labels |
| H4 | Times New Roman | Regular — supporting headings |
| Body copy | Montserrat | Regular — all paragraph text |
| CTA buttons | Montserrat | Bold, uppercase — all calls to action |
| Captions / sub copy | Klein Condensed | Bold, ALL CAPS — meta labels, tags |

> **Web font loading:** Klein Condensed is a premium font — load via Adobe Fonts or a licensed CDN. Montserrat is available on Google Fonts. Times New Roman is a system font (always available).

### Design principles
- **Dark platform throughout.** Background is `#0b0f19` (PIC Black). Surfaces are `#0a1f32` (PIC Navy). Nav/header is `#0f2944` (PIC Blue). This is not a light UI with a dark header — it is a fully dark platform.
- **Gold is the accent. Use it sparingly.** `#c08d20` on CTAs, active nav items, module name highlights, hover states. Not on every element.
- **Left accent bars** (3px, module color) on module cards — this is a PIC design signature carried from Moonshot CRM.
- **Dot indicators** (8–10px circles, module color) next to module names throughout the UI.
- No gradients on backgrounds. Flat, clean surfaces only.
- Text on dark: white (`#ffffff`) for primary, `#cdcdcd` for secondary, `#b3b3b3` for muted.
- Card borders on dark: `1px solid rgba(255,255,255,0.08)` — subtle, not harsh.
- Spacing: generous. Don't crowd. Breathe.
- CTAs: gold background (`#c08d20`), near-black text (`#0b0f19`), Montserrat Bold uppercase.

---

## Platform structure

### Top-level pages / routes

**Architecture decision: One Next.js app with Vercel subdomain rewrites (not separate apps)**

Build everything as one Next.js app at `proudimpact.ai`. When modules are stable (end of Q2 / Q3), add Vercel rewrite rules so `moonshot.proudimpact.ai` transparently routes to `/dashboard/moonshot` — zero code changes required. This avoids cross-subdomain auth complexity while preserving the premium subdomain URLs for the future.

```
/                         → Landing / login redirect
/login                    → Supabase Auth login page
/dashboard                → Command Center home (after login)
/dashboard/moonshot       → Moonshot module entry
/dashboard/orbit          → Orbit module entry
/dashboard/astro          → Astro module entry
/dashboard/gravity        → Gravity module entry
/dashboard/agents         → Paperclip AI agent management panel
/dashboard/settings       → User settings, team settings, API/token usage
/dashboard/settings/team  → Team member management, roles, access
/dashboard/settings/usage → Token usage and AI cost tracker
/admin                    → Admin-only: user management, role assignment
```

### Dashboard layout

The Command Center dashboard has four sections visible after login:

1. **Top navigation bar** — PIC logo/wordmark left, navigation links center, user avatar + settings right.
2. **Company dashboard** — KPI overview cards pulling from all four modules. Designed for leadership to see the full picture at a glance.
3. **Module launcher grid** — four large clickable cards (Moonshot, Orbit, Astro, Gravity). Each card shows module name, AI name, live status, and a quick stat from that module.
4. **Agent panel shortcut** — Paperclip AI integration tile linking to `/dashboard/agents`.

---

## Module definitions

### Moonshot — Retail AI
- **URL:** moonshot.proudimpact.ai (or `/dashboard/moonshot`)
- **AI assistant name:** Kennedy
- **Color:** `#EF9F27` (orange)
- **What it does:** Client accounts, SKU management, dynamic sell sheets, deal tracking, retail portal access, distributor contacts.
- **Key data:** Clients, SKUs, placements, deals, contacts, sell sheets
- **Team:** Client success, account managers, retail team (Alex, Michael, Sharon)
- **Status:** Most mature module — data already migrated from ClickUp

### Orbit — Social Commerce AI
- **URL:** orbit.proudimpact.ai (or `/dashboard/orbit`)
- **AI assistant name:** Kodiak
- **Color:** `#378ADD` (blue)
- **What it does:** TikTok Shop intelligence, creator pipeline management, GMV tracking, campaign performance, ecom growth for brand clients.
- **Key data:** Campaigns, creators, GMV, orders, brand clients
- **Team:** Ecom team, TikTok Shop managers, creator ops (Vijay)
- **Status:** In spec/early build phase

### Astro — BizDev & Marketing AI
- **URL:** astro.proudimpact.ai (or `/dashboard/astro`)
- **AI assistant name:** Chica
- **Color:** `#5A8F1A` (green)
- **What it does:** Full growth engine. Lead generation, outreach sequencing, deal flow management, content creation, content hosting, distribution across channels.
- **Key data:** Leads, BD pipeline, outreach sequences, content assets, deals
- **Team:** BizDev team, marketing team (Dallas, Cole)
- **Status:** Apollo.io MCP integrated. First agent (lead gen pipeline) planned here.

### Gravity — OPEX AI
- **URL:** gravity.proudimpact.ai (or `/dashboard/gravity`)
- **AI assistant name:** Boca
- **Color:** `#D49A12` (yellow)
- **What it does:** The entry point for all new clients. Operational efficiency, OPEX bucket tracking, team capacity, financial control, invoicing coordination.
- **Key data:** Clients (source of truth), contracts, OPEX buckets, team capacity, invoices
- **Team:** Dallas, Haley (COO), finance ops
- **Status:** Gravity owns the client onboarding funnel — all new clients enter here first, then get pushed to Moonshot and/or Orbit.

### Houston AI — future (not yet built)
- **AI name:** Houston
- **Access:** Leadership only
- **What it does:** Cross-platform master AI. Sees across all four modules. Queries Otter AI meeting database. Built last — after all modules are solid and data is clean.

---

## Agent management — Paperclip AI integration

Paperclip AI is integrated as the agent visibility and management layer. It surfaces in the Command Center under `/dashboard/agents`.

### What the agents panel shows
- All active agents across all modules
- Agent name, which module it belongs to, trigger type, last run, status
- Run history and output log per agent
- Enable / disable / pause controls
- Human checkpoint queue — tasks waiting for approval before the agent proceeds

### Agent module ownership
| Agent | Module | Trigger | Status |
|---|---|---|---|
| Lead gen pipeline | Astro | New qualified lead in Apollo | Planned — first to build |
| Sell sheet generator | Moonshot | New SKU added to database | Planned |
| Creator outreach | Orbit | New campaign briefed | Planned |
| OPEX weekly report | Gravity | Weekly schedule (Monday AM) | Planned |
| Houston cross-module intel | Command Center | On-demand (leadership only) | Future |

### Agent architecture rules
- Agents live and are visualized inside their module — a Moonshot agent is managed from Moonshot, but all agents are also visible from the central Agents panel.
- Each agent has scoped database access only — an Astro agent cannot query Moonshot's SKU data. This is enforced at the Supabase RLS level.
- All agents require at least one human checkpoint until they have proven track record.
- Agent runs are logged to Supabase with: agent_id, module, trigger, input_summary, output_summary, status, tokens_used, cost_usd, timestamp.

---

## Data architecture — Supabase

**Project ID:** `madgicifvkkofxvbalqp`

### Core shared tables (accessible across all modules)
```sql
clients           -- Source of truth. Created in Gravity on contract sign.
                  -- id, name, contract_date, status, tier, primary_contact, 
                  --   retail_active (bool), ecom_active (bool)

contacts          -- People at client companies
                  -- id, client_id (FK), name, email, role, phone, linkedin

users             -- Internal PIC team members
                  -- id, email, name, role, avatar_url, module_access (array)

roles             -- Admin | Manager | TeamMember | ClientPortal
```

### Module-specific tables (live within that module's schema)
```
moonshot:  skus, placements, sell_sheets, deals, distributor_contacts
orbit:     campaigns, creators, gmv_records, tiktok_products
astro:     leads, bd_pipeline, outreach_sequences, content_assets
gravity:   contracts, opex_buckets, capacity_records, invoices
```

### Agent logging table (Command Center level)
```sql
agent_runs        -- id, agent_id, module, trigger, input_summary, 
                  --   output_summary, status, tokens_used, cost_usd, 
                  --   created_at, approved_by
```

### Token usage table (for Command Center cost tracker)
```sql
ai_usage          -- id, user_id, module, model, tokens_in, tokens_out,
                  --   cost_usd, created_at
```

### Security rules — non-negotiable
- Row-Level Security (RLS) enabled on every table without exception.
- `clients` table: team members see all clients. Client portal users see only their own client row.
- Module tables: team members with module access see that module's data. Others cannot query.
- Agent tables: agents have service-role access scoped to their module only.
- No raw client data (PII, revenue, scan data) goes into AI prompts without sanitization first.
- API keys live in Vercel environment variables only. Never in code. Never in chat.

---

## Auth & access control

**Auth provider:** Supabase Auth (email/password + magic link)

### Roles and what they can access
| Role | Access |
|---|---|
| `Admin` | Everything — all modules, all settings, user management, agent controls |
| `Manager` | Assigned modules + dashboard + agent panel for their modules |
| `TeamMember` | Assigned modules only. No admin settings. |
| `ClientPortal` | Read-only view of their own client data in assigned module(s) |

### Access flow
1. User visits `proudimpact.ai` → redirected to `/login`
2. Supabase Auth authenticates → session created
3. Middleware reads user role + `module_access` array
4. User lands on `/dashboard` — sees only the modules they have access to
5. Module tiles that are locked show grayed out with a lock icon (not hidden — users should know they exist)

---

## GitHub & deployment

- **Repo structure:** Monorepo — one repo, one `apps/command-center` directory
- **Branch strategy:**
  - `main` = production (Vercel auto-deploys on merge)
  - `dev` = staging environment (test here before merging)
  - `feature/*` = individual feature branches (branch from `dev`, PR into `dev`)
- **Branch protection:** `main` requires PR + review before merge. No direct pushes.
- **Environment variables:** Stored in Vercel per environment (dev / production). Never in `.env` committed to repo.

---

## External tool integrations

| Tool | Purpose | Connection method | Owner |
|---|---|---|---|
| Apollo.io | Lead gen, contact enrichment | MCP + direct API | Dallas |
| Supabase | Database, Auth, Edge Functions | SDK | Dallas |
| Vercel | Deployment, env vars | GitHub integration | Dallas |
| Otter AI | Meeting transcription + database | API (annual plan) | Dallas |
| Slack | Team comms, agent notifications | MCP + webhooks | Dallas |
| ClickUp | Project management (under review) | MCP | Haley |
| Google Workspace | Docs, Drive, email | OAuth | Team |
| QuickBooks | Accounting | API (future) | Haley |
| Ramp | Expense management | API (future) | Haley |
| Paperclip AI | Agent management and visibility | Integration (Command Center) | Dallas |
| Claude API | AI for all module assistants | Anthropic SDK | Dallas |

---

## AI model usage

- **Primary model:** `claude-sonnet-4-6` — default for all module-level AI calls
- **Light tasks** (autocomplete, suggestions, quick lookups): consider `claude-haiku-4-5-20251001`
- **Houston AI** (cross-platform, future): `claude-opus-4-6`
- **Token tracking:** Every AI call must log to `ai_usage` table — user_id, module, model, tokens_in, tokens_out, cost_usd. This powers the cost dashboard in settings.
- **Context rules:** Each module AI (Kennedy, Kodiak, Chica, Boca) has context scoped to that module's data only. They do not share context with each other.
- **Prompt security:** Never inject raw client PII, revenue data, or API keys into prompts. Sanitize and abstract before sending.

---

## Key user flows to build (priority order)

### 1. Login → Dashboard (Sprint 1)
- User hits `proudimpact.ai`
- Supabase Auth login page
- On success: middleware checks role and `module_access`
- Redirect to `/dashboard`
- Dashboard renders module tiles based on access (locked tiles for modules not assigned)

### 2. Dashboard home (Sprint 1)
- Top nav: PIC wordmark left, module links center, user menu right
- KPI cards row: active clients, open deals, GMV (30d), OPEX vs budget
- Module launcher grid: 4 cards (Moonshot, Orbit, Astro, Gravity) + Agents tile
- Each module card shows: name, AI name, dot color, one live stat, click → enters module

### 3. Module entry (Sprint 2)
- Each module has its own layout within the Command Center shell
- Module sidebar: nav items specific to that module
- Module AI assistant (Kennedy / Kodiak / Chica / Boca) accessible via chat panel
- Data loaded from Supabase filtered to that module's tables + shared `clients`

### 4. Agent panel — Paperclip AI (Sprint 2)
- `/dashboard/agents` shows all agents across all modules
- Table view: agent name, module, status (active/paused/pending approval), last run, next run
- Click into agent: see run history, input/output log, checkpoint queue
- Toggle enable/disable per agent
- Checkpoint queue: list of outputs waiting for human approval before proceeding

### 5. Settings & user management (Sprint 3)
- `/dashboard/settings` — personal settings: name, email, avatar, password
- `/dashboard/settings/team` — admin only: add/remove users, assign roles and module access
- `/dashboard/settings/usage` — token usage dashboard: chart of usage by module by user, cost breakdown, monthly total

---

## What to build first — Sprint 1 checklist

- [ ] Next.js app scaffolded with TypeScript + Tailwind in monorepo
- [ ] Supabase project connected — `clients`, `users`, `roles` tables created with RLS
- [ ] Supabase Auth configured — email/password, magic link
- [ ] Login page (`/login`) — PIC brand, clean, minimal
- [ ] Auth middleware — reads role + module_access, protects all `/dashboard` routes
- [ ] Dashboard shell — top nav, sidebar, main content area
- [ ] Dashboard home — KPI cards (static/placeholder data OK for now) + module launcher grid
- [ ] Module tiles — Moonshot, Orbit, Astro, Gravity — correct colors, AI names, locked states
- [ ] Agents tile — links to `/dashboard/agents` (placeholder page OK for now)
- [ ] Settings page skeleton — profile tab only to start
- [ ] Dev and staging environments on Vercel configured
- [ ] GitHub branch protection on `main` enabled

---

## File structure (target)

```
/apps
  /command-center
    /app
      /login          → Login page
      /dashboard
        /page.tsx     → Dashboard home
        /moonshot     → Moonshot module shell
        /orbit        → Orbit module shell
        /astro        → Astro module shell
        /gravity      → Gravity module shell
        /agents       → Paperclip AI agent panel
        /settings
          /page.tsx   → Personal settings
          /team       → Team management (admin only)
          /usage      → Token/cost dashboard
      /admin          → Admin panel
    /components
      /ui             → Shared design system components
      /modules        → Module-specific components
      /agents         → Agent panel components
      /layout         → Nav, sidebar, shell
    /lib
      /supabase.ts    → Supabase client
      /auth.ts        → Auth helpers
      /ai.ts          → Claude API wrapper + usage logger
      /apollo.ts      → Apollo.io MCP client
    /types
      /database.ts    → Supabase type definitions
      /modules.ts     → Module-level types
    middleware.ts     → Auth + role-based route protection
    CLAUDE.md         → This file (copy into repo root)
```

---

## Naming conventions

- **Components:** PascalCase — `ModuleTile.tsx`, `AgentRunLog.tsx`
- **Hooks:** camelCase with `use` prefix — `useModuleAccess.ts`, `useAgentStatus.ts`
- **API routes:** kebab-case — `/api/agents/run-log`, `/api/usage/monthly`
- **Database columns:** snake_case — `created_at`, `client_id`, `tokens_used`
- **Environment variables:** SCREAMING_SNAKE_CASE — `SUPABASE_URL`, `ANTHROPIC_API_KEY`
- **CSS / Tailwind:** Use design tokens (`text-pic-orange`) not raw hex values in JSX

---

## Things that must never happen

- No API keys in source code or chat history
- No direct pushes to `main` branch
- No cross-client data exposure — RLS is always on
- No AI prompt that contains raw PII or revenue data without sanitization
- No agent with full database access — always scoped to its module
- No shared AI context between modules — Kennedy does not know what Chica knows
- No building Houston AI before all four modules are stable

---

## Reference — module AI names

| Module | Tool name | AI name | Space reference |
|---|---|---|---|
| Command Center | PIC Command Center | Houston | Mission Control, Houston TX |
| Retail AI | Moonshot | Kennedy | Kennedy Space Center, FL |
| Social Commerce AI | Orbit | Kodiak | Kodiak Island Spaceport, AK |
| BizDev & Marketing AI | Astro | Chica | Boca Chica, TX (SpaceX Starbase) |
| OPEX AI | Gravity | Boca | Boca Chica shortened |

---

*Last updated: April 2026 — PIC Architecture & Roadmap Session*
*Maintained by: Dallas Crum, Proud Impact Collective*

---

## Auth & access control (UPDATED)

**Auth provider:** Supabase Auth with **Google OAuth (primary)**. PIC is a Google Workspace org — all team members sign in with their `@proudimpact.com` Google account. No separate password.

- Google OAuth via Supabase — one click, authenticate with PIC Google account, done.
- Restrict Google OAuth to `@proudimpact.com` domain only. Personal Gmail accounts cannot log in as team members.
- Clients get magic link login (email link) — no Google Workspace account required.

### Roles and what they can access
| Role | Access |
|---|---|
| `Admin` | Everything — all modules, settings, user management, agents, full activity log across all users |
| `Manager` | Assigned modules + dashboard + agent panel for their modules. Activity log for their modules only. |
| `TeamMember` | Assigned modules only. No admin settings. Own activity only. |
| `ClientPortal` | Read-only view of their own client data in Moonshot and/or Orbit only. Never sees Command Center shell. |

### Access flow — internal team
1. Visit `proudimpact.ai` → `/login`
2. Click "Sign in with Google" → Google OAuth via Supabase
3. Domain check: must be `@proudimpact.com` — else rejected
4. Middleware reads role + `module_access` from `users` table
5. Land on `/dashboard` — assigned modules visible, locked modules grayed but visible (not hidden)

### Access flow — clients
1. Admin sends client a magic link invitation from Command Center
2. Client clicks link → authenticated via Supabase magic link
3. Middleware reads `ClientPortal` role + granted modules
4. Client lands directly in Moonshot client view or Orbit client view — **never sees Command Center shell**
5. Client sees only their own company data — enforced by RLS at database level
6. Q2 scope: client portal only in Moonshot and Orbit. Command Center manages which is enabled per client via toggle.

### Session management (best practice)
- Session timeout: 8 hours inactivity → auto logout
- Concurrent sessions: allowed (team on multiple devices)
- Failed login lockout: 5 attempts → 15 min cooldown (Supabase default)
- Token refresh: automatic via Supabase SDK
- On logout: clear all cookies → redirect `/login`
- HTTPS enforced via Vercel (default)

---

## Notification & communication layer

Three channels, one source of truth: **in-app → Slack → Gmail**. Every notification type maps to which channels fire and for whom.

### Notification types and routing
| Event | In-app | Slack | Gmail |
|---|---|---|---|
| Agent checkpoint needs approval | ✓ (bell + badge) | ✓ (immediate) | ✓ |
| Agent run completed | ✓ | ✓ | — |
| Agent run failed | ✓ | ✓ (immediate) | ✓ |
| New client onboarded in Gravity | ✓ | ✓ | — |
| Deal stage changed in Astro | ✓ | — | — |
| New lead qualified | ✓ | ✓ | — |
| Client portal invite sent | ✓ | — | ✓ (to client) |
| Weekly digest (Monday 8am) | — | ✓ | ✓ |
| Team member added/removed | ✓ | ✓ | ✓ (to new member) |
| AI usage cost threshold hit | ✓ (admin only) | ✓ (admin only) | ✓ (admin only) |

### In-app notification center
- Bell icon in top nav with unread count badge
- Dropdown panel: sorted by recency, shows event type, module, timestamp, action link
- Mark as read / mark all as read
- Notifications are user-scoped — you see only what's relevant to your role and modules
- Stored in `notifications` table in Supabase

### Slack integration
- Claude connected to Slack (commit to next sprint)
- Dedicated `#pic-agents` channel for agent events
- `#pic-alerts` for errors and cost threshold warnings
- Use Slack webhooks for push notifications from Supabase Edge Functions

### Gmail integration
- Transactional emails sent via Google Workspace SMTP or Resend API
- Templates: client invite, agent approval request, weekly digest, error alert
- All emails sent from `notifications@proudimpact.com` or `noreply@proudimpact.com`

### Database table
```sql
notifications  -- id, user_id, type, title, body, module, link, read_at, created_at
```

---

## Activity feed & audit log

Full audit trail of everything that happens across all tools. What was done, by whom, on which record, from which module, at what time.

### Visibility rules (role-based)
- `Admin`: sees ALL activity across ALL users and ALL modules — full platform view
- `Manager`: sees activity in their assigned modules + their own team members' actions within those modules
- `TeamMember`: sees only their own activity
- `ClientPortal`: no activity log access

### What gets logged
Every meaningful action writes to `activity_log`:
- Record created / updated / deleted (clients, SKUs, deals, leads, campaigns, etc.)
- AI assistant queries (what was asked, which module, response summary — not full content)
- Agent runs triggered, completed, approved, failed
- User logins and logouts
- Role / access changes
- Client portal access events
- Sell sheet generated, downloaded, shared
- Any export or data download

### Activity feed UI
- Lives in Command Center dashboard as a right-side panel or dedicated `/dashboard/activity` page
- Admins see a full feed with filters: by user, by module, by date range, by action type
- Each entry shows: avatar, name, action description, module badge, timestamp, link to record
- Real-time updates via Supabase Realtime subscriptions

### Database table
```sql
activity_log  -- id, user_id, user_name, action, entity_type, entity_id, 
              --   entity_name, module, metadata (jsonb), created_at
```

---

## Global search

One search bar in the top nav searches across everything the logged-in user has access to.

### What gets searched (scoped to user's module access)
- Clients (name, contact name, email)
- SKUs and products (Moonshot)
- Deals and pipeline records (Astro)
- Leads and contacts (Astro)
- Campaigns and creators (Orbit)
- Sell sheets (Moonshot)
- Team members (Admin only)
- Eventually: Otter AI meeting transcripts via API

### Implementation
- Supabase full-text search (`to_tsvector` / `to_tsquery`) on key fields
- Postgres `pg_trgm` extension for fuzzy matching on names
- Results grouped by type with module badge: Client · SKU · Deal · Lead · etc.
- Keyboard shortcut: `Cmd+K` opens search modal
- Results respect RLS — users only see records they have access to

---

## Team member profiles & onboarding

### Team member profile fields (stored in `users` table)
- Name, email (from Google OAuth)
- Avatar (from Google profile, overridable)
- Role + module access (set by Admin)
- Department / title
- Start date
- Phone (optional)
- Gusto employee ID (for future Gusto sync — placeholder field now)
- Timezone

### First-login onboarding flow
When a new team member logs in for the first time (flag: `onboarding_complete: false`):
1. Welcome screen — "Welcome to PIC Command Center, [Name]" with brand treatment
2. "Here's what you have access to" — shows their assigned modules with brief description
3. "Complete your profile" — confirm name, add phone, set timezone (email pre-filled from Google)
4. "You're in" — redirect to dashboard

### Admin: adding a new team member
1. Admin goes to `/dashboard/settings/team`
2. Clicks "Invite team member"
3. Enters email address (must be `@proudimpact.com`)
4. Selects role + module access checkboxes
5. System sends Google OAuth invite + welcome email
6. New member appears in team list as "Pending" until first login

### Gusto integration (future placeholder)
- Field `gusto_employee_id` on `users` table from day one
- When Gusto API is connected, pull: department, title, start date, manager
- Do not pull: compensation, PTO, personal HR data — only directory-level fields

---

## SOP & knowledge base

**Decision: Use Notion. Don't build a wiki.**

Notion is already in use, the team knows it, and it's genuinely better at docs than anything built custom. What Command Center provides is a clean link surface and Houston AI will eventually query Notion via MCP.

### Implementation
- `/dashboard/sops` in Command Center — not a built page, a curated links page
- Organized by department/module: Retail SOPs, Social Commerce SOPs, BizDev Playbooks, OPEX Procedures, Company-wide
- Each link opens Notion in a new tab (or embedded iframe if Notion embed is clean enough)
- Houston AI MCP connection to Notion (future): team can ask Houston "what's the SOP for submitting a new item to Sprouts?" and it queries Notion directly

### Notion workspace structure (recommended)
```
PIC Notion
  ├── Company-wide SOPs
  ├── Retail (Moonshot) Playbooks
  ├── Social Commerce (Orbit) Playbooks
  ├── BizDev & Marketing (Astro) Playbooks
  ├── OPEX & Finance (Gravity) Procedures
  ├── Meeting Notes (Otter AI outputs land here)
  └── Brand Assets & Guidelines
```

---

## Empty states & error states

### Empty states (best practice — never show a blank screen)
| State | What to show |
|---|---|
| Dashboard, first login | "Welcome" card with quick-start actions per module |
| Moonshot, no clients yet | "No clients yet — clients are added in Gravity when a contract is signed" with link to Gravity |
| Astro, no leads yet | "Start building your pipeline — add your first lead or connect Apollo.io" with CTA |
| Orbit, no campaigns | "No active campaigns — create your first TikTok Shop campaign to get started" |
| Gravity, no clients | "No clients onboarded yet — add a new client when a contract is signed" with form shortcut |
| Activity log, no activity | "No activity yet — actions by your team will appear here" |
| Agent panel, no agents | "No agents configured yet — your first agent will be the Astro lead gen pipeline" |
| Search, no results | "No results for [query] — try searching for a client name, SKU, or deal" |

### Error states
- All API errors caught and shown as toast notifications (not page crashes)
- Form validation errors shown inline on the field, not in an alert
- Module unavailable: show a "Module temporarily unavailable" card with status indicator
- Full page error: branded error page with "Something went wrong" + retry button + link to report issue

---

## Error monitoring & incident response

**Tool: Sentry** — install in Sprint 1, ~30 minutes setup.

### Setup
```bash
npm install @sentry/nextjs
# Add SENTRY_DSN to Vercel env vars
# Sentry auto-captures: JS errors, API failures, failed renders, performance
```

### Alerting
- Sentry → Slack `#pic-alerts` for all errors in production
- Sentry → Gmail for critical errors (500s, auth failures, database errors)
- Error threshold: more than 5 of the same error in 10 minutes = immediate Slack alert

### Incident response (simple, for now)
1. Error fires in Sentry → alert hits `#pic-alerts`
2. Dallas or Alex acknowledges in Slack
3. Assess: is client data at risk? (yes → notify affected clients, document incident)
4. Fix in `dev` → PR → merge to `main` → Vercel auto-deploys
5. Document what broke and why in a Notion incident log

### Status / maintenance
- If platform is down for maintenance: redirect all routes to a simple branded maintenance page
- Vercel supports maintenance mode via middleware redirect — implement from day one

---

## Mobile

**Decision: Responsive web from day one.** No native app. The platform is built mobile-first in Tailwind — team members can check the dashboard, approve agent checkpoints, and look up client info from their phone.

### Mobile priorities (what must work perfectly on mobile)
- Login (Google OAuth works on mobile browser natively)
- Dashboard home — KPI cards and module tiles
- Notification center — approve/dismiss agent checkpoints
- Activity feed — read-only view
- Client record lookup in Moonshot or Orbit
- Global search

### Mobile deprioritized (desktop-first is fine)
- Complex data tables (SKU lists, campaign reports) — show simplified card view on mobile
- Sell sheet builder — desktop only
- Settings / admin panel — desktop only is fine
- Agent configuration — desktop only

### Tailwind breakpoints to use
- `sm`: 640px — small mobile
- `md`: 768px — tablet / large phone
- `lg`: 1024px — laptop (primary design target)
- `xl`: 1280px+ — large desktop

