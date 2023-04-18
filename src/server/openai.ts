import { Configuration, ConfigurationParameters, OpenAIApi } from "openai";
import { env } from "y/env.mjs";

const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
} as ConfigurationParameters);

const globalForOpenAI = globalThis as unknown as { openai: OpenAIApi };

export const openai = globalForOpenAI.openai || new OpenAIApi(config);

if (env.NODE_ENV !== "production") globalForOpenAI.openai = openai;
