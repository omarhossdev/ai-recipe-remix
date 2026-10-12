// The shape of the result returned by BLIP
interface BlipResponse {
  generated_text: string
}

// Sending an image to Hugging Face BLIP model and gets a caption back
export async function analyzeFoodImage(
  base64Data: string,
  mimeType: string,
  apiKey: string
): Promise<BlipResponse[]> {
  const imageBuffer = Buffer.from(base64Data, "base64");

  const response = await fetch(
    "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": mimeType,
      },
      body: imageBuffer
    }
  );

  if (!response.ok) {
    throw new Error(`Hugging Face API error! Status: ${response.status}`)
  }

  const result: BlipResponse[] = await response.json();
  return result;
}