import { GoogleGenAI, Type } from "@google/genai";
import { LetterContent } from "../types";
import { CONFIG } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateApologyLetter = async (): Promise<LetterContent> => {
  const name = CONFIG.RECEIVER_NAME;
  const prompt = `Hãy viết một bức thư tay xin lỗi cực kỳ chân thành, sâu sắc và đầy tình cảm dành cho bạn gái tên là ${name}. 
  Nội dung: Người gửi thừa nhận mình đã sai hoàn toàn, đã làm cô ấy buồn và cảm thấy rất hối hận. 
  Thông điệp cốt lõi phải có: "Anh thương ${name} nhiều lắm" hoặc "Tôi thương bạn ấy rất nhiều" được lồng ghép một cách tự nhiên.
  Giọng văn: Trưởng thành, điềm đạm nhưng vẫn ngọt ngào, ấm áp, có chút gì đó nghẹn ngào hối lỗi của một người đàn ông biết lỗi.
  Hãy trình bày dưới dạng JSON với cấu trúc:
  {
    "greeting": "Lời chào (vd: ${name} à, ...)",
    "body": ["Đoạn 1 tâm sự", "Đoạn 2 hối lỗi", "Đoạn 3 bày tỏ tình cảm và lời hứa"],
    "closing": "Lời kết (vd: Mong em cho anh một cơ hội...)",
    "signature": "Ký tên (vd: Người luôn thương em)"
  }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            greeting: { type: Type.STRING },
            body: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            closing: { type: Type.STRING },
            signature: { type: Type.STRING }
          },
          required: ["greeting", "body", "closing", "signature"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as LetterContent;
  } catch (error) {
    console.error("Error generating letter:", error);
    throw error;
  }
};

