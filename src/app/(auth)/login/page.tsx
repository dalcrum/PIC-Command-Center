"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"team" | "client">("team");
  const router = useRouter();

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
        queryParams: {
          hd: "proudimpact.com", // Restrict to PIC Google Workspace
        },
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setError("");
      setLoading(false);
      alert("Check your email for a login link!");
    }
  }

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-xl bg-pic-blue flex items-center justify-center mx-auto mb-4 border border-white/10">
          <span className="text-pic-gold font-bold text-xl">P</span>
        </div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          PIC Command Center
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Sign in to your account
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex bg-bg-surface border border-border rounded-lg p-1 mb-6">
        <button
          onClick={() => setMode("team")}
          className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${
            mode === "team"
              ? "bg-pic-blue text-white"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          Team
        </button>
        <button
          onClick={() => setMode("client")}
          className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${
            mode === "client"
              ? "bg-pic-blue text-white"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          Client
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm mb-4">
          {error}
        </div>
      )}

      {mode === "team" ? (
        <div className="space-y-4">
          {/* Google OAuth — Primary for team */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 bg-bg-surface border border-border rounded-lg text-sm font-medium text-text-primary hover:border-border-strong transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-bg-primary text-text-muted">or use email & password</span>
            </div>
          </div>

          {/* Fallback email/password */}
          <form onSubmit={handlePasswordLogin} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2.5 bg-bg-surface border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="you@proudimpact.com"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2.5 bg-bg-surface border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Password"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-cta-bg text-cta-text text-sm font-bold uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      ) : (
        /* Client magic link */
        <form onSubmit={handleMagicLink} className="space-y-4">
          <p className="text-xs text-text-secondary text-center">
            Enter your email and we&apos;ll send you a login link.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-bg-surface border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="your@email.com"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-cta-bg text-cta-text text-sm font-bold uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Sending link..." : "Send Magic Link"}
          </button>
        </form>
      )}

      <p className="text-center text-xs text-text-muted mt-8">
        Proud Impact Collective &mdash; AI-Native Operating System
      </p>
    </div>
  );
}
