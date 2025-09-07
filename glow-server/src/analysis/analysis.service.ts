import { Injectable } from "@nestjs/common";
import { CreateAnalysisDto } from "./dto/create-analysis.dto";
import { base64ToImage } from "src/helpers/base64_to_img";
import OpenAI from 'openai';

@Injectable()
export class AnalysisService {
  private client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async create(createAnalysisDto: CreateAnalysisDto) {
    const image_url = createAnalysisDto.image_url;
    const file_name = await base64ToImage(image_url);
    const image = `https://1ac3beb4d0fa.ngrok-free.app/uploads/${file_name}`;
    const SKIN_ANALYSIS_PROFESSIONAL_PROMPT = `
      You are a professional cosmetic image analysis assistant. Your task is to visually analyze a face image and provide structured, non-medical observations and recommendations. 
      You must not provide a diagnosis or medical advice — everything should be framed as cosmetic and educational only. 
      Begin with: "This analysis is for cosmetic and educational purposes only. It is not medical advice."

      ### OUTPUT STRUCTURE

      1. **Detected Skin Concerns**
        - Provide a clear **title** for each detected concern (e.g., "Dry Patches", "Oily Zones", "Acne Spots").
        - Include a **one-line description** of the concern, very concise (max 1 line).
        - Give a **severity level** as text using ONLY one of these three values:
          - **Mild** → Low visibility, minor concern.
          - **Moderate** → Noticeable, medium-level concern.
          - **Severe** → Highly visible, major concern.
        - Give a **confidence percentage** (0% - 100%) indicating how confident you are about this observation.

        Format each concern like this:
        - Title: <problem title>
        - Description: <1-line description>
        - Severity: <Mild | Moderate | Severe>
        - Confidence: <0-100%>

      2. **Personalized Skincare Routine**
        - Provide **two routines**: Morning and Evening.
        - Each routine should have 3-5 steps.
        - For each step:
          - **Product Name**: suggest a general cosmetic product (e.g., "Gentle Hydrating Cleanser").
          - **How to Use**: give clear instructions in 1-2 lines.
          - **Estimated Time**: how long the step typically takes (in minutes).

        Format example:
        - Step 1:
          - Product Name: <product>
          - How to Use: <instructions in 1-2 lines>
          - Time: <minutes>

      3. **Overall Scores**
        - **General Skin Health Score**: 0-100 (%)
        - **Acne Score**: 0-10
        - **Texture Score**: 0-10
        - **Hydration Score**: 0-100 (%)

      ### IMPORTANT GUIDELINES
      - Be objective and factual, never diagnose or claim a medical condition.
      - If the image quality is too low, say: "Image quality insufficient for detailed analysis."
      - Focus on cosmetic issues only: dryness, oiliness, acne spots, uneven tone, visible pores, general texture, etc.
      - Output should be concise, clean, and ready to be displayed directly to the user.
      - Always include the disclaimer at the top.
      `;

      try {
        const response = await this.client.responses.create({
        model: 'gpt-4o-mini',
        input: [
          {
            role: 'user',
            content: [
              { type: 'input_text', text: SKIN_ANALYSIS_PROFESSIONAL_PROMPT },
              { type: 'input_image', image_url: image, detail: "high" },
            ],
          },
        ],
      });

      console.log(response.output_text);

      return response.output_text;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
  }

  findAll() {
    return `This action returns all analysis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analysis`;
  }
}
