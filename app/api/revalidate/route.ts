import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { tag } = await req.json();
  revalidateTag(tag, "everything");
  return NextResponse.json({ revalidated: true });
}
