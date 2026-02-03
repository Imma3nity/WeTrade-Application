
import { GoogleGenAI, Type } from "@google/genai";

export interface ValuationWithSources {
  estimatedMarketValue: number;
  maxLoanOffer: number;
  confidenceScore: number;
  analysis: string;
  sources: { title: string; uri: string }[];
}

/**
 * Service to analyze gadget descriptions and images for a trade-in/loan valuation.
 * Uses Google Search grounding to get real-time Nigerian market prices.
 */
export async function getGadgetValuation(gadgetDesc: string, base64Image?: string): Promise<ValuationWithSources | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const parts: any[] = [
    { text: `Analyze the current live market resale value in Nigeria for this gadget: "${gadgetDesc}". 
    Search for current prices on major Nigerian retailers like Slot, Jumia, Pointek, and Nairaland. 
    Calculate a loan offer at exactly 70% of the average market resale value, but STRICTLY CAP the loan offer at ₦500,000.` }
  ];

  if (base64Image) {
    const data = base64Image.split(',')[1] || base64Image;
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: data
      }
    });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview', // Required for high-quality reasoning and search tools
    contents: { parts },
    config: {
      systemInstruction: `You are the WeTrade AI Market Analyst. 
      Access live internet data to find the EXACT current street price in Nigeria for the described gadget.
      Return a JSON object with:
      1. estimatedMarketValue: (Number) Current average resale price in Naira.
      2. maxLoanOffer: (Number) 70% of the market value, but NEVER exceeding 500,000 Naira. If 70% of the market value is greater than 500,000, return exactly 500,000.
      3. confidenceScore: (Number 0-1) How sure you are based on available listings.
      4. analysis: (String) A punchy summary of current market availability and pricing trends. Mention that we offer 70% of market value as a loan (capped at 500k).
      IMPORTANT: Only return JSON.`,
      responseMimeType: "application/json",
      tools: [{ googleSearch: {} }],
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          estimatedMarketValue: { type: Type.NUMBER },
          maxLoanOffer: { type: Type.NUMBER },
          confidenceScore: { type: Type.NUMBER },
          analysis: { type: Type.STRING }
        },
        required: ["estimatedMarketValue", "maxLoanOffer", "confidenceScore", "analysis"]
      }
    }
  });

  try {
    const jsonStr = response.text?.trim();
    if (!jsonStr) return null;
    const valuation = JSON.parse(jsonStr);

    // Final safety cap on the client side
    valuation.maxLoanOffer = Math.min(valuation.maxLoanOffer, 500000);

    // Extract grounding chunks for source transparency
    const sources: { title: string; uri: string }[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || 'Market Source',
            uri: chunk.web.uri
          });
        }
      });
    }

    return { ...valuation, sources };
  } catch (e) {
    console.error("Failed to parse valuation", e);
    return null;
  }
}

export async function getChatResponse(message: string, context: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: message,
    config: {
      systemInstruction: `You are the WeTrade Assistant. Help users with gadget sales, swaps, and quick collateralized loans. Current context: ${context}`
    }
  });
  return response.text || "I'm sorry, I couldn't process that.";
}
