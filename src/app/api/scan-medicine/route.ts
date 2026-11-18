import { NextRequest, NextResponse } from "next/server";
import { analyzeMedicineImage } from "@/lib/gemini";
import { ScanMedicineRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: ScanMedicineRequest = await req.json();

    if (!body || !body.image) {
      return NextResponse.json(
        { error: "Please provide a valid image of a medicine strip, bottle, packaging, or prescription." },
        { status: 400 }
      );
    }

    const headerApiKey = req.headers.get("x-gemini-api-key") || undefined;
    const apiKey = body.apiKey || headerApiKey;

    const result = await analyzeMedicineImage(body.image, body.illness, apiKey);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error processing medicine scan:", error);
    return NextResponse.json(
      { error: "An error occurred while analyzing the medicine image. Please try again with a clearer photo." },
      { status: 500 }
    );
  }
}
