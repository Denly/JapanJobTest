import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, API_KEY, KRAKEN_API_KEY, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;