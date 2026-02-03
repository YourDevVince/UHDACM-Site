import dotenv from 'dotenv';

dotenv.config();

const pe = process.env;

const env_vars = {
  PORT: Number(pe.PORT!),
  CHROMA_DB_HOST: pe.CHROMA_DB_HOST!,
  CHROMA_DB_PORT: Number(pe.CHROMA_DB_PORT!),
  CHROMA_DB_COLLECTION_NAME: pe.CHROMA_DB_COLLECTION_NAME!,
  AI_MODEL: pe.GEMINI_CHAT_MODEL!,
  AI_APIKEYS: (() => {
    const RAW_KEYS: string = pe.GOOGLE_API_KEYS!;

    const API_KEYS: string[] = RAW_KEYS.split(',')
      .map((key) => key.trim())
      .filter((key): key is string => Boolean(key));

    if (API_KEYS.length === 0) {
      throw new Error(
        'No API keys found. Set GOOGLE_API_KEYS=key1,key2,... (or GOOGLE_API_KEY).',
      );
    }
    return API_KEYS;
  })(),
} as const;

for (const [key, val] of Object.entries(env_vars)) {
  if (val == undefined) {
    throw new Error(`Expected environment variable \"${key}\" to be defined`);
  }
}

if (isNaN(env_vars.PORT)) {
  throw new Error(`env_vars PORT is NaN`);
} else if (isNaN(env_vars.CHROMA_DB_PORT)) {
  throw new Error(`env_vars PORT is NaN`);
}

export { env_vars };
