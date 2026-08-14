import { NextResponse } from "next/server";

import { mintContactToken } from "@/lib/contact-token";

// The token must carry the request time — never prerender this route.
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { token: mintContactToken() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
