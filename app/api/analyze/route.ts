import { NextRequest, NextResponse } from "next/server";
import { InferenceClient  } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_TOKEN)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData(); // get formData
    const file = formData.get("image") as File | null; // parse the uploaded image

    if (!file) {
      return NextResponse.json({"error": "No image provided"}, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer(); // turn the image into 0s and 1s... [01000100 01110011] bcz APIs can't accept <File> but raw bytes
    const base64 = Buffer.from(arrayBuffer).toString("base64") // Json can't understand bytes! but text like ijB123jkui123..

    const result = await hf.chatCompletion({
      model: "meta-llama/Llama-3.2-11B-Vision-Instruct", // we are going to use this model because: (1) supports images (vision), (2) works with free tier, (3) good at describing ingredients 
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "List the food ingredients you see in this image. Reply with ONLY a comma-separated list, nothing else."
            },
            {
              type: "image_url",
              image_url: { url: `data:${file.type};base64,${base64}` }
            },
          ],
        },
      ],
      max_tokens: 200,
    });

    const text = result.choices[0]?.message?.content ?? "";
    const ingredients = text.split(',').map(s => s.trim()).filter(Boolean);

    return NextResponse.json({ ingredients })
  } catch (error) {
    console.error("Analyze error:", error)
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 } // server error
    )
  }
}