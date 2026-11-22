
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import DashboardContent from "@/components/dashboard/dashboard-content";

export default function Home() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <AuthenticatedDashboard />
    </Suspense>
  );
}

function DashboardFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
      Loading your dashboard...
    </main>
  );
}

async function AuthenticatedDashboard() {
  // Wait for a real request before accessing authentication.
  await connection();

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/login");
  }

  return <DashboardContent />;
}
