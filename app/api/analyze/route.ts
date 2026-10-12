import { NextRequest, NextResponse } from "next/server";
import { analyzeFoodImage } from "@/app/lib/huggingface";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.HF_TOKEN || ""

    const formData = await req.formData(); // get formData
    const file = formData.get("image") as File | null; // parse the uploaded image

    if (!file) {
      return NextResponse.json({"error": "No image provided"}, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer(); // turn the image into 0s and 1s... [01000100 01110011] bcz APIs can't accept <File> but raw bytes
    const base64 = Buffer.from(arrayBuffer).toString("base64") // Json can't understand bytes! but text like ijB123jkui123..

    const result = await analyzeFoodImage(base64, file.type, apiKey)
    const caption = result[0]?.generated_text || "No caption generated";

    return NextResponse.json({ caption })
  } catch (error) {
    console.error("Analyze error:", error)
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 } // server error
    )
  }
}