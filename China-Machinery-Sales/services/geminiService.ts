import { GoogleGenAI, Type } from "@google/genai";
import { LocalizedText } from "../types";

interface GeneratedProductContent {
  title: LocalizedText;
  description: LocalizedText;
  specs: {
    year: string;
    hours: string;
    condition: string;
  }
}

export const generateProductContent = async (
  titleZh: string,
  descZh: string,
  manualApiKey?: string
): Promise<GeneratedProductContent> => {
  
  // Priority: Manual Key -> Process Env Key
  const apiKey = manualApiKey || process.env.API_KEY;

  if (!apiKey) {
    console.error("API Key missing");
    throw new Error("API Key is missing. Please provide one in settings or environment.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const prompt = `
    You are a professional translator and data analyst for heavy construction machinery.
    I will provide a product title and description in Chinese.
    
    Tasks:
    1. Translate the Title and Description accurately into English, French, Spanish, and Arabic. Keep technical terms accurate.
    2. Extract the technical specifications: Year, Hours (e.g., 753h), and Condition (e.g., 90% New). If a spec is not found, use "N/A" or "Consult".
    
    Input Title: "${titleZh}"
    Input Description: "${descZh}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.OBJECT,
              properties: {
                zh: { type: Type.STRING },
                en: { type: Type.STRING },
                fr: { type: Type.STRING },
                es: { type: Type.STRING },
                ar: { type: Type.STRING },
              },
              required: ["zh", "en", "fr", "es", "ar"]
            },
            description: {
              type: Type.OBJECT,
              properties: {
                zh: { type: Type.STRING },
                en: { type: Type.STRING },
                fr: { type: Type.STRING },
                es: { type: Type.STRING },
                ar: { type: Type.STRING },
              },
              required: ["zh", "en", "fr", "es", "ar"]
            },
            specs: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.STRING },
                hours: { type: Type.STRING },
                condition: { type: Type.STRING }
              },
              required: ["year", "hours", "condition"]
            }
          },
          required: ["title", "description", "specs"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data as GeneratedProductContent;
    }
    throw new Error("No data returned");

  } catch (error) {
    console.error("Translation failed:", error);
    // Fallback logic handled by UI
    throw error;
  }
};