"use server";
import { signOut } from "next-auth/react";

export async function serverSignOut() {
  // In NextAuth v4, server actions usually use unstable_getServerSession, but signOut is client-side.
  // We'll redirect to /api/auth/signout instead via a simple response.
}
