import { InternalServerErrorException } from "@nestjs/common";
import OpenAI from "openai";

export async function call_openAI(image: string) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const SKIN_ANALYSIS_PROFESSIONAL_PROMPT = `
      You are a professional cosmetic image analysis assistant.
      Your task is to visually analyze (deeply and professionally) a face image and provide structured, non-medical observations and recommendations.
      You must NOT provide a diagnosis or medical advice — everything should be framed as cosmetic and educational only.

      ### OUTPUT REQUIREMENT
      - Return ONLY valid **raw JSON**. 
      - **Do not include any markdown**, code fences, extra words, or explanations.
      - The response must **start directly with { and end with }** — nothing before or after.

      ### HARD CONSTRAINTS
      - The "problems" array MUST contain between **1 and 6 objects**. It MUST NOT be empty unless image quality is insufficient (see fallback below).
      - Each "problems" item MUST include:
        - "title": string
        - "description": string (1–2 sentences)
        - "severity": "Mild" | "Moderate" | "Severe"
        - "confidence": integer (0–100)
      - "skin_care_routine.morning" MUST contain **3–6** step objects.
      - "skin_care_routine.evening" MUST contain **3–6** step objects.
      - Each step object MUST include:
        - "step": 1-based integer
        - "product_name": string
        - "how_to_use": 1–2 concise lines
        - "time": integer (minutes)
      - Scores must be numeric and in these ranges:
        - general_skin_health_score: 0–100
        - acne_score: 0–10
        - texture_score: 0–10
        - hydration_score: 0–100
      - Include problems even with low confidence — do not omit them.
      - Use only **generic product types**, never brand names.

      ### JSON OUTPUT STRUCTURE
      Example structure (values are illustrative):

      {
        "disclaimer": "This analysis is for cosmetic and educational purposes only. It is not medical advice.",
        "problems": [
          {
            "title": "Oily T-Zone",
            "description": "Shine and excess oil on the forehead and nose area with some visible congestion.",
            "severity": "Moderate",
            "confidence": 82
          }
        ],
        "skin_care_routine": {
          "morning": [
            {
              "step": 1,
              "product_name": "Gentle Hydrating Cleanser",
              "how_to_use": "Apply to damp face, massage for 30 seconds, rinse with lukewarm water.",
              "time": 2
            }
          ],
          "evening": [
            {
              "step": 1,
              "product_name": "Oil-Based Makeup Remover",
              "how_to_use": "Dispense onto cotton pad and gently wipe until makeup is removed.",
              "time": 3
            }
          ]
        },
        "scores": {
          "general_skin_health_score": 80,
          "acne_score": 4,
          "texture_score": 6,
          "hydration_score": 70
        },
        "estimated_days_progress": 30
      }

      ### FALLBACK FOR LOW IMAGE QUALITY
      If the image is too blurry or unclear to analyze, return **only this JSON**:

      {
        "disclaimer": "This analysis is for cosmetic and educational purposes only. It is not medical advice.",
        "error": "Image quality insufficient for detailed analysis."
      }

      ### FINAL INSTRUCTION
      The response must be **ONLY valid JSON** — no extra text, no markdown, no explanation, no triple backticks.
      The first character must be {, and the last character must be }.
      `;

  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: SKIN_ANALYSIS_PROFESSIONAL_PROMPT },
            { type: "input_image", image_url: image, detail: "high" },
          ],
        },
      ],
    });

    return response.output_text;
  } catch (error) {
    console.log(error.message);
    throw new InternalServerErrorException(
      "Server Error! Please try again later",
    );
  }
}
