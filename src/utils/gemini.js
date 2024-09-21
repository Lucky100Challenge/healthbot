import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Missing Gemini API Key');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getHealthAdvice(symptoms, lifestyle, goals) {
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