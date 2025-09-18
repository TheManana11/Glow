import { Injectable, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import path from 'path';
import * as fs from 'fs';
import OpenAI from "openai";

@Injectable()
export class HelpersService {
    
    // base64 to image
    async base64ToImage(base64String: string, directoryName: string) {
        const matches = base64String.match(/^data:(image\/\w+);base64,(.+)$/);
        if (!matches) {
            return null;
        }
        
        const mimeType = matches[1];
        const extension = mimeType.split('/')[1];
        
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(mimeType)) {
            return null;
        }
        
        const buffer = Buffer.from(matches[2], 'base64');
        
        const uploadDir = path.join(__dirname, '..', '..', `uploads/${directoryName}`);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        const filename = `profile_${Date.now()}.${extension}`;
        const savePath = path.join(uploadDir, filename);
        await fs.promises.writeFile(savePath, buffer);

        return filename;
    }


    // call local model for whatsapp AI agent model
    async call_model(prompt: any) {
    const final_prompt = `
        You are a friendly, knowledgeable, and highly professional **Skincare Assistant AI**.  
        Your mission is to provide expert guidance, advice, and support on **anything related to skin** — from the simplest question to the most complex discussions.

        ---

        ### **Your Role & Boundaries**
        - **Primary Role:**  
          - Help users with **all topics related to skin** — including skincare routines, treatments, dermatological conditions, beauty tips, product recommendations, ingredient explanations, preventive care, clinical treatments, and general skin health.
          - This includes:
            - Personalized skincare advice.
            - Scientific explanations of skin conditions.
            - Recommending routines, products, and lifestyle adjustments.
            - Providing deep, research-based answers for complex or technical skincare questions.
            - Discussing trends, negotiating options, and offering emotional support related to skin concerns.

        - **Strict Limitation:**  
          - If the user asks about **anything unrelated to skin**, you **must NOT** answer it.  
          - Instead, respond politely:
            > "I’m here to assist you with skin-related topics only. Please ask about your skincare, skin health, or concerns related to your skin."

        ---

        ### **Tone & Style**
        - Always be **gentle, warm, and supportive**, especially when discussing sensitive topics like skin conditions or appearance.
        - Be **empathetic and encouraging**, making the user feel safe and cared for.
        - Use **clear, natural, and easy-to-understand language**, avoiding overly technical jargon unless the user specifically requests it.
        - Be precise and factual — base advice on **scientific evidence and dermatology best practices**.
        - Always **acknowledge the user’s emotions** and context before providing recommendations.

        ---

        ### **Conversation Guidelines**
        1. **Greetings & Small Talk:**
          - Respond warmly to greetings or casual conversation.
          - After a friendly exchange, guide the conversation back toward skin-related topics.
          
          Example:
          > User: "Hi, how are you?"  
          > Assistant: "Hi! I'm doing great, thank you for asking 🌸 How are you feeling today? Are there any skincare concerns you'd like to discuss?"

        2. **Skin-Related Questions:**
          - Provide **detailed and actionable advice**, tailored to the user's unique context.
          - Consider the user's previous information, concerns, or history.
          - When recommending products or routines, explain **why** you are recommending them.

        3. **Unrelated Questions:**
          - If the prompt is not about skin, **politely decline** and gently redirect.
          - Example:
            > "I’m here to assist you with skin-related care only. Could you tell me more about your skincare concerns instead?"

        ---

        ### **AI Task:**
        - Deeply **analyze the user's intent** to fully understand their context before responding.
        - Provide **thorough, professional, and clear answers** for all skin-related topics.
        - Be flexible and handle any level of complexity — from everyday tips to advanced dermatological discussions.
        - If the user's request is vague, **ask clarifying questions** to better understand their needs.

        ---

        ### **Context (Relevant Chunks):**
        ${prompt.relevantChunks.map(c => `[${c.type}] ${c.content}`).join('\n\n')}

        ---

        ### **User Prompt:**
        ${prompt.prompt}

        ---

        ### **Final Reminder:**
        - If it is about **skin**, answer with full expertise and compassion.
        - If it is **not about skin**, politely decline and redirect back to skin care topics.
        `;


    
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      try {
        const response = await client.responses.create({
          model: "gpt-4o-mini",
          input: [
            {
              role: "user",
              content: [
                { type: "input_text", text: final_prompt },
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


    // call open AI model for analysis
    async call_openAI(image: string) {
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
      - Add a "goals" array with **3–4** short, actionable goals derived from the detected problems (each goal is a single concise sentence).
      - "skin_care_routine.morning" MUST contain **3–6** step objects.
      - "skin_care_routine.evening" MUST contain **3–6** step objects.
      - Each step object MUST include:
        - "step": 1-based integer
        - "product_name": string (generic product/category name, e.g., "Gentle Hydrating Cleanser")
        - "product_real_name": string (the actual commercial product/brand name, e.g., "CeraVe Hydrating Facial Cleanser")
        - "how_to_use": 1–2 concise lines
        - "time": integer (minutes)
      - Scores must be numeric and in these ranges:
        - general_skin_health_score: 0–100
        - acne_score: 0–10
        - texture_score: 0–10
        - hydration_score: 0–100
      - Include problems even with low confidence — do not omit them.

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
        "goals": [
          "Reduce excess sebum across the T-zone.",
          "Minimize appearance of enlarged pores around the nose.",
          "Improve overall skin hydration without adding shine."
        ],
        "skin_care_routine": {
          "morning": [
            {
              "step": 1,
              "product_name": "Gentle Hydrating Cleanser",
              "product_real_name": "CeraVe Hydrating Facial Cleanser",
              "how_to_use": "Apply to damp face, massage for 30 seconds, rinse with lukewarm water.",
              "time": 2
            }
          ],
          "evening": [
            {
              "step": 1,
              "product_name": "Oil-Based Makeup Remover",
              "product_real_name": "DHC Deep Cleansing Oil",
              "how_to_use": "Dispense onto dry hands and massage over dry face; emulsify with water and rinse.",
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
    


    // send messages from whatsapp to user
    async webhookMessage(senderId: string, text: string) {
      if (text === '') {
        text = 'No response from AI';
      }
      const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
      const TOKEN = process.env.TOKEN;
      await axios.post(
        `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: 'whatsapp',
          to: senderId,
          text: { body: text },
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
    }


    // *******************************   VECTOR EMBEDDING HELPERS ***********************************************


    
}
