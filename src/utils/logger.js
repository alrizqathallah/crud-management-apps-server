import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import envConfig from "../configs/env.config.js";

// Buat folder logs jika belum tersedia
const logDir = "logs";
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// Buat sub-folder log sesuai kategori
const folders = ["combined", "errors", "debug", "exceptions", "rejections"];
folders.forEach((folder) => {
  const dirPath = path.join(logDir, folder);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
});

// Fungsi pembuat transport harian
const createDailyRotateTransport = (folder, filename, level) =>
  new winston.transports.DailyRotateFile({
    dirname: path.join(logDir, folder),
    filename: `${filename}-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level,
  });

// Format log standar
const logFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
  },
);

// Format berwarna untuk console
const colorizeFormat = winston.format.printf(
  ({ level, message, timestamp }) => {
    const color =
      level === "error"
        ? chalk.redBright
        : level === "warn"
          ? chalk.yellowBright
          : level === "info"
            ? chalk.greenBright
            : level === "debug"
              ? chalk.magentaBright
              : chalk.gray;

    return `${chalk.dim(`[${timestamp}]`)} ${color(level.toUpperCase())}: ${message}`;
  },
);

// Fungsi logger utama (winston)
const logger = winston.createLogger({
  level: envConfig.NODE_ENV === "development" ? "debug" : "info", // aktifkan debug saat dev
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    logFormat,
  ),
  transports: [
    createDailyRotateTransport("combined", "combined"),
    createDailyRotateTransport("errors", "error", "error"),
    createDailyRotateTransport("debug", "debug", "debug"), // Log debug ke file terpisah
  ],
  exceptionHandlers: [
    createDailyRotateTransport("exceptions", "exception", "error"),
  ],
  rejectionHandlers: [
    createDailyRotateTransport("rejections", "rejection", "error"),
  ],
  exitOnError: false,
});

// Tambahkan console log hanya untuk dev
if (envConfig.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "HH:mm:ss " }),
        colorizeFormat,
      ),
    }),
  );
}

export default logger;
