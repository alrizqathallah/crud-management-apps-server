import { Sequelize } from "sequelize";
import envConfig from "./env.config.js";

/**
 * Membuat instance Sequelize berdasarkan konfigurasi dari envConfig
 */
const sequelize = new Sequelize(
  envConfig.DB_NAME,
  envConfig.DB_USER,
  envConfig.DB_PASSWORD,
  {
    host: envConfig.DB_HOST,
    port: envConfig.DB_PORT,
    dialect: envConfig.DB_DIALECT || "mysql", // fallback jika env kosong
    logging: envConfig.NODE_ENV === "development" ? console.log : false,
    define: {
      timestamps: true, // otomatis menambahkan created_at dan updated_at
      underscored: true, // gunakan snake_case id DB (SQL)
      freezeTableName: true, // opsi: hindari plural otomatis (users -> user)
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

/**
 * Fungsi untuk menguji koneksi database.
 */
export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1); // hentikan server jika koneksi DB gagal
  }
};

export default sequelize;
