import { NextRequest, NextResponse } from "next/server";
import { visionZUpload, getVisionZUpload } from "@visionz/upload-helper-react/server";

export async function POST(req: NextRequest) {
  const { status, body } = await visionZUpload(await req.json());
  return NextResponse.json(body, { status });
}

export async function GET(req: NextRequest) {
  const { status, body } = await getVisionZUpload(req.nextUrl.searchParams.get("uploadId")!);
  return NextResponse.json(body, { status });
}
