import path from "path";
import { createWorker } from "tesseract.js";

export interface ExtractedImageInfo {
  rawText: string;
  detectedBrandOrSaltCandidates: string[];
  detectedStrength?: string;
  detectedBatchOrExpiry?: string;
  detectedInstructions?: string;
}

export async function extractTextFromImage(imageData: string): Promise<ExtractedImageInfo> {
  let rawText = "";

  // 1. Check if SVG data URI (e.g. synthetic or vector sample)
  if (imageData.startsWith("data:image/svg+xml")) {
    try {
      const base64Part = imageData.replace(/^data:image\/svg\+xml;base64,/, "");
      const svgText = Buffer.from(base64Part, "base64").toString("utf-8");
      const matches = svgText.match(/<text[^>]*>([\s\S]*?)<\/text>/gi);
      if (matches) {
        rawText = matches.map(m => m.replace(/<[^>]+>/g, " ").trim()).join("\n");
      }
    } catch {
      // ignore
    }
  }

  // 2. Perform OCR on raster images (JPEG, PNG, WEBP, etc.)
  if (!rawText.trim()) {
    let worker;
    try {
      const base64Clean = imageData.replace(/^data:image\/[a-z0-9\-+]+;base64,/, "");
      const buffer = Buffer.from(base64Clean, "base64");

      const workerPath = path.join(
        process.cwd(),
        "node_modules",
        "tesseract.js",
        "src",
        "worker-script",
        "node",
        "index.js"
      );

      worker = await createWorker("eng", 1, {
        workerPath,
        logger: () => {}
      });

      const ocrPromise = worker.recognize(buffer);
      const timeoutPromise = new Promise<{ data: { text: string } }>((_, reject) =>
        setTimeout(() => reject(new Error("OCR timeout")), 15000)
      );

      const result = await Promise.race([ocrPromise, timeoutPromise]);
      rawText = result.data?.text || "";
    } catch (err) {
      console.warn("OCR recognition notice:", err);
    } finally {
      if (worker) {
        try {
          await worker.terminate();
        } catch {
          // ignore
        }
      }
    }
  }

  // 3. Extract strength patterns (e.g. 500 mg, 650mg, 10mg, 400 mg, 40 mg)
  const strengthMatch = rawText.match(/\b\d+(\.\d+)?\s*(mg|mcg|g|ml|iu)\b/i);
  const detectedStrength = strengthMatch ? strengthMatch[0] : undefined;

  // 4. Extract expiry or batch patterns
  const batchExpMatch = rawText.match(/\b(exp|expiry|mfg|batch|b\.no|lot)[\s.:]+[a-z0-9\/-]+/i);
  const detectedBatchOrExpiry = batchExpMatch ? batchExpMatch[0] : undefined;

  // 5. Extract visible instruction phrases
  const instructionMatch = rawText.match(
    /\b(store below|keep out of reach|dosage|as directed by|take with|schedule [a-z]|swallow whole)\b[^\n.]*/i
  );
  const detectedInstructions = instructionMatch ? instructionMatch[0] : undefined;

  // 6. Tokenize candidate words
  const words = rawText
    .split(/[\s,;:|()\[\]\n\r]+/)
    .map(w => w.trim().replace(/[^a-zA-Z0-9-]/g, ""))
    .filter(w => w.length >= 3);

  return {
    rawText: rawText.trim(),
    detectedBrandOrSaltCandidates: Array.from(new Set(words)),
    detectedStrength,
    detectedBatchOrExpiry,
    detectedInstructions
  };
}
