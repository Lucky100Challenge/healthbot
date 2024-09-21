import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

if (!API_KEY) {
  throw new Error('Missing Gemini API Key');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getHealthAdvice(symptoms: string, lifestyle: string, goals: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `As an AI health advisor, provide personalized health advice based on the following information:
  Symptoms: ${symptoms}
  Lifestyle: ${lifestyle}
  Health Goals: ${goals}

  Please provide a concise, informative response with practical recommendations.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}