import { z } from "zod";
import { Provider, PROVIDERS } from "./constants";

export const ApiKeysSchema = z.record(z.string().optional());

export const UserSettingsSchema = z.object({
  provider: z.custom<Provider>(),
  apiKeys: ApiKeysSchema,
  model: z.string(),
  temperature: z.number(),
  maxTokens: z.number(),
  topP: z.number(),
  frequencyPenalty: z.number(),
  presencePenalty: z.number(),
  stop: z.string(),
  fontSize: z.enum(["small", "medium", "large"]),
});

export type UserSettings = z.infer<typeof UserSettingsSchema>;

export const defaultSettings: UserSettings = {
  provider: PROVIDERS.deepseek,
  apiKeys: {},
  model: "deepseek-chat",
  temperature: 0.5,
  maxTokens: 100,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
  stop: "",
  fontSize: "medium",
};
