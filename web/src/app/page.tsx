import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto p-6">
        <header className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Auth Starter</h1>
            <p className="text-slate-600">Clean, professional fonts and colors</p>
          </div>
          {session?.user ? (
            <Link href="/dashboard" className="rounded-lg bg-slate-900 text-white px-4 py-2.5">Dashboard</Link>
          ) : (
            <div className="space-x-3">
              <Link href="/login" className="rounded-lg bg-slate-900 text-white px-4 py-2.5">Sign in</Link>
              <Link href="/register" className="rounded-lg border border-slate-300 px-4 py-2.5 bg-white hover:bg-slate-50">Register</Link>
            </div>
          )}
        </header>
        <div className="mt-8 rounded-2xl bg-white border border-slate-200 p-10 shadow-sm">
          <h2 className="text-xl font-medium text-slate-900">Get started</h2>
          <p className="mt-2 text-slate-600">Register or sign in with credentials, Google, or Facebook.</p>
        </div>
      </div>
    </div>
  );
}
