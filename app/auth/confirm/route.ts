
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type");

  const successUrl = new URL("/", request.url);
  const errorUrl = new URL("/login", request.url);
  errorUrl.searchParams.set("error", "confirmation_failed");

  if (!tokenHash || type !== "email") {
    return NextResponse.redirect(errorUrl);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "email",
  });

  if (error) {
    return NextResponse.redirect(errorUrl);
  }

  return NextResponse.redirect(successUrl);
}
