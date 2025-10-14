import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { SignOutButton } from "@/components/SignOutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">Please sign in</h1>
          <Link href="/login" className="inline-block rounded-lg bg-slate-900 text-white px-4 py-2.5">Go to Login</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Signed in as {session.user.email}</p>
          </div>
          <SignOutButton />
        </div>
        <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <p className="text-slate-700">Welcome, {session.user.name ?? "User"}!</p>
        </div>
      </div>
    </div>
  );
}
