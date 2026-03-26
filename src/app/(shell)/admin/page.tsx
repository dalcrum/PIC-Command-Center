"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  department: string | null;
  created_at: string;
};

type ModuleAccess = {
  id: string;
  user_id: string;
  module: string;
  access_level: string;
};

const ROLES = ["super_admin", "admin", "team_member", "client"] as const;
const DEPARTMENTS = ["executive", "retail", "bd", "ecom", "ops"] as const;
const MODULES = ["moonshot", "opex", "bizdev", "orbit", "admin"] as const;

export default function AdminPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [moduleAccess, setModuleAccess] = useState<ModuleAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "modules">("users");

  // Invite form state
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<string>("team_member");
  const [inviteDept, setInviteDept] = useState<string>("");

  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [profilesRes, accessRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at"),
      supabase.from("module_access").select("*"),
    ]);
    if (profilesRes.data) setProfiles(profilesRes.data);
    if (accessRes.data) setModuleAccess(accessRes.data);
    setLoading(false);
  }

  async function updateRole(userId: string, newRole: string) {
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);
    if (!error) {
      setProfiles((prev) =>
        prev.map((p) => (p.id === userId ? { ...p, role: newRole } : p))
      );
    }
  }

  async function updateDepartment(userId: string, dept: string | null) {
    const { error } = await supabase
      .from("profiles")
      .update({ department: dept || null })
      .eq("id", userId);
    if (!error) {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === userId ? { ...p, department: dept || null } : p
        )
      );
    }
  }

  async function toggleModuleAccess(userId: string, module: string) {
    const existing = moduleAccess.find(
      (a) => a.user_id === userId && a.module === module
    );

    if (existing) {
      await supabase.from("module_access").delete().eq("id", existing.id);
      setModuleAccess((prev) => prev.filter((a) => a.id !== existing.id));
    } else {
      const { data } = await supabase
        .from("module_access")
        .insert({ user_id: userId, module, access_level: "write" })
        .select()
        .single();
      if (data) setModuleAccess((prev) => [...prev, data]);
    }
  }

  function hasModuleAccess(userId: string, module: string) {
    return moduleAccess.some(
      (a) => a.user_id === userId && a.module === module
    );
  }

  function getRoleBadgeColor(role: string) {
    switch (role) {
      case "super_admin":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "admin":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "team_member":
        return "bg-green-100 text-green-700 border-green-200";
      case "client":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Master Admin Panel
          </h1>
          <p className="text-text-secondary mt-1">
            Manage users, roles, and module access across the Command Center.
          </p>
        </div>
        <button
          onClick={() => setShowInvite(!showInvite)}
          className="px-4 py-2 bg-gold hover:bg-gold/90 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Invite User
        </button>
      </div>

      {/* Invite form */}
      {showInvite && (
        <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-text-primary">
            Invite New Team Member
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              placeholder="Full name"
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
            />
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Email address"
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
            <select
              value={inviteDept}
              onChange={(e) => setInviteDept(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
            >
              <option value="">No department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d.replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-navy hover:bg-navy/90 text-white text-sm font-medium rounded-lg transition-colors">
              Send Invite
            </button>
            <button
              onClick={() => setShowInvite(false)}
              className="px-4 py-2 bg-background hover:bg-border text-text-secondary text-sm font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-background p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "users"
              ? "bg-surface text-text-primary shadow-sm"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Users & Roles
        </button>
        <button
          onClick={() => setActiveTab("modules")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "modules"
              ? "bg-surface text-text-primary shadow-sm"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Module Access
        </button>
      </div>

      {loading ? (
        <div className="bg-surface border border-border rounded-xl p-12 flex items-center justify-center">
          <p className="text-text-secondary text-sm">Loading users...</p>
        </div>
      ) : profiles.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <svg
            className="w-12 h-12 text-text-secondary mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-text-primary">
            No users yet
          </h3>
          <p className="text-sm text-text-secondary mt-1 max-w-md">
            Run the SQL migration in Supabase, then sign up your first user.
            They&apos;ll appear here automatically.
          </p>
        </div>
      ) : activeTab === "users" ? (
        /* Users & Roles Table */
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">
                    Role
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">
                    Department
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border last:border-0 hover:bg-gold-light/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0">
                          <span className="text-white text-xs font-semibold">
                            {user.full_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                        <span className="font-medium text-text-primary">
                          {user.full_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={user.role}
                        onChange={(e) => updateRole(user.id, e.target.value)}
                        className={`px-2 py-1 rounded-md border text-xs font-medium ${getRoleBadgeColor(user.role)}`}
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r
                              .replace("_", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={user.department || ""}
                        onChange={(e) =>
                          updateDepartment(user.id, e.target.value)
                        }
                        className="px-2 py-1 rounded-md border border-border bg-background text-xs"
                      >
                        <option value="">None</option>
                        {DEPARTMENTS.map((d) => (
                          <option key={d} value={d}>
                            {d.replace(/\b\w/g, (l) => l.toUpperCase())}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Module Access Matrix */
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">
                    User
                  </th>
                  {MODULES.map((m) => (
                    <th
                      key={m}
                      className="text-center px-4 py-3 font-medium text-text-secondary"
                    >
                      {m.replace(/\b\w/g, (l) => l.toUpperCase())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {profiles.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border last:border-0 hover:bg-gold-light/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-text-primary">
                          {user.full_name}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${getRoleBadgeColor(user.role)}`}
                        >
                          {user.role.replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    {MODULES.map((module) => (
                      <td key={module} className="text-center px-4 py-3">
                        <button
                          onClick={() => toggleModuleAccess(user.id, module)}
                          className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-colors ${
                            hasModuleAccess(user.id, module)
                              ? "bg-gold border-gold text-white"
                              : "bg-background border-border text-transparent hover:border-gold/50"
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
