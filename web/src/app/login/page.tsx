"use client";
import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) throw new Error(res.error);
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mt-1 text-slate-600">Sign in to continue.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input name="email" type="email" className="mt-1 w-full rounded-lg border-slate-300 focus:border-slate-500 focus:ring-slate-500" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input name="password" type="password" className="mt-1 w-full rounded-lg border-slate-300 focus:border-slate-500 focus:ring-slate-500" placeholder="••••••••" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="w-full inline-flex justify-center items-center rounded-lg bg-slate-900 text-white px-4 py-2.5 hover:bg-slate-800 disabled:opacity-50">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="mt-6">
          <div className="relative text-center">
            <span className="bg-white px-2 text-sm text-slate-500">Or continue with</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="rounded-lg border border-slate-300 px-4 py-2.5 hover:bg-slate-50">Google</button>
            <button onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })} className="rounded-lg border border-slate-300 px-4 py-2.5 hover:bg-slate-50">Facebook</button>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          New here? <Link className="text-slate-900 font-medium" href="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
