import app from "./app.js";
import envConfig from "./configs/env.config.js";
import { connectDatabase } from "./configs/db.config.js";
import logger from "./utils/logger.js";

const { PORT, NODE_ENV } = envConfig;

/**
 * Jalankan server dan koneksi database.
 */
const startServer = async () => {
  try {
    // Coba koneksi ke database dulu
    await connectDatabase();

    // Jalankan server Express
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error(`Server failed to start: ${error.message}`);
    process.exit(1); // hentikan proses agar tidak jalan dalam kondisi rusak
  }
};

// Jalankan
startServer();
