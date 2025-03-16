import { ReactNode } from "react"
import OpenAI from "../icons/providers/OpenAI"
import DeepSeek from "../icons/providers/Deepseek"
import Ngc from "../icons/providers/Ngc"
import { SvgProps } from "react-native-svg"

export interface Provider {
    base_url: string
    provider_icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ComponentType<SvgProps>
    provider_name: string
    provider_key: string
} 

export const PROVIDERS: Record<string, Provider> = {
    openai: {
        base_url: "https://api.openai.com/v1",
        provider_icon: OpenAI,
        provider_name: "OpenAI",
        provider_key: "openai",
    },
    deepseek: {
        base_url: "https://api.deepseek.com/v1",
        provider_icon: DeepSeek, // TODO: Replace with DeepSeek icon when available
        provider_name: "DeepSeek",
        provider_key: "deepseek",
    },
    ngc: {
        base_url: "https://api.ngc.nvidia.com/v1",
        provider_icon: Ngc,
        provider_name: "NVIDIA NGC",
        provider_key: "ngc",
    },
};

export enum SETTINGS_KEYS {
    PROVIDER = "provider",
    API_KEY = "api_key",
    MODEL = "model",
    TEMPERATURE = "temperature",
    MAX_TOKENS = "max_tokens",
}