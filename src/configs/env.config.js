import dotenv from "dotenv";

dotenv.config();

/**
 * Ambil nilai dari environment variable dengan fallback dan validasi
 * @param {string} key - Nama environment variable.
 * @param {string|number|boolean} [defaultValue] - Nilai default jika tidak ada di process.env.
 * @returns {string|boolean|number} - Nilai environment varible.
 */
const getKeyValue = (key, defaultValue) => {
  const value = process.env[key];

  if (value === undefined || value === null || value === "") {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

/**
 * Konfigurasi environment aplikasi
 * Semua variabel penting dikumpulkan disini agar terpusat
 */
const envConfig = {
  PORT: Number(getKeyValue("PORT", 5000)),
  NODE_ENV: getKeyValue("NODE_ENV", "development"),
  BASE_PATH: getKeyValue("BASE_PATH", "/api/v"),

  // Database configuration
  DB_NAME: getKeyValue("DB_NAME"),
  DB_USER: getKeyValue("DB_USER"),
  DB_PASSWORD: getKeyValue("DB_PASSWORD"),
  DB_HOST: getKeyValue("DB_HOST", "localhost"),
  DB_PORT: Number(getKeyValue("DB_PORT", 3306)),
  DB_DIALECT: getKeyValue("DB_DIALECT", "mysql"),

  // JWT or security configs
  JWT_ACCESS_SECRET: getKeyValue("JWT_ACCESS_SECRET", "defaultAccessSecret"),
  JWT_REFRESH_SECRET: getKeyValue("JWT_REFRESH_SECRET", "defaultRefreshSecret"),
  JWT_EXPIRES_IN: getKeyValue("JWT_EXPIRES_IN", "15m"),
  JWT_REFRESH_EXPIRES_IN: getKeyValue("JWT_REFRESH_EXPIRES_IN", "7d"),
};

export default Object.freeze(envConfig);
