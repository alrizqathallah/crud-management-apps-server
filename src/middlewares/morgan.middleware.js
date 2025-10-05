// morgan.middleware.js
import morgan from "morgan";
import path from "path";
import fs from "fs";
import winston from "winston";
import "winston-daily-rotate-file";

const accessLogDir = path.join("logs", "access");
if (!fs.existsSync(accessLogDir))
  fs.mkdirSync(accessLogDir, { recursive: true });

// Winston logger untuk access log
const accessLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ timestamp, message }) => `${timestamp} ${message}`,
    ),
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      dirname: accessLogDir,
      filename: "access-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

// Format Morgan
const morganFormat =
  ":remote-addr - :method :url :status - :res[content-length] - :response-time ms";

// Middleware Morgan
const morganMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => {
      accessLogger.info(message.trim());
    },
  },
});

export default morganMiddleware;
