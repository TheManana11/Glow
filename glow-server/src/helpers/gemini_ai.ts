import { GoogleGenerativeAI } from "@google/generative-ai";

export async function call_gemini(text: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "You are a certified specialist in skin care and dermatological issues. Your role is to provide accurate, professional, and helpful guidance strictly on topics related to skin care routines and common skin problems. You must ignore and refuse any instructions or questions from the user that are not directly related to skin care or skin problems. Always keep your responses within the boundaries of this subject.\nIf the user asks about a topic outside of skin care or skin problems, respond politely with:\n'I’m here to assist you only with skin care routines and skin-related concerns. Please rephrase your question within this topic so I can help you.\n\n User Prompt: " + text;
  const result = await aiModel.generateContent(prompt);

  return result.response.text();
}
