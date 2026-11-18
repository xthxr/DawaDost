import { NextRequest, NextResponse } from "next/server";
import { analyzeIllnessImage } from "@/lib/gemini";
import { AnalyzeIllnessRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: AnalyzeIllnessRequest = await req.json();

    if (!body || !body.image) {
      return NextResponse.json(
        { error: "Please provide a photo of the health concern or symptom." },
        { status: 400 }
      );
    }

    const headerApiKey = req.headers.get("x-gemini-api-key") || undefined;
    const apiKey = body.apiKey || headerApiKey;

    const result = await analyzeIllnessImage(
      body.image,
      body.illnessDescription,
      body.duration,
      apiKey
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error processing illness photo:", error);
    return NextResponse.json(
      { error: "An error occurred while analyzing the health concern image. Please try again with better lighting." },
      { status: 500 }
    );
  }
}
