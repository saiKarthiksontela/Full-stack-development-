"use client";
import { useState, FormEvent } from "react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import Link from "next/link";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Min 6 characters"),
});

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const values = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    };
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Registration failed");
      }
      await signIn("credentials", {
        email: parsed.data.email,
        password: parsed.data.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>
        <p className="mt-1 text-slate-600">Join to access your dashboard.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Name</label>
            <input name="name" className="mt-1 w-full rounded-lg border-slate-300 focus:border-slate-500 focus:ring-slate-500" placeholder="Your name" />
          </div>
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
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account? <Link className="text-slate-900 font-medium" href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
