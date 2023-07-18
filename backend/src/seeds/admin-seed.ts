import mongoose, { ConnectOptions, Document, Model } from 'mongoose';
import { AdminSchema } from '../schemas/admin.model';
import { config } from 'dotenv';

config();

/**
 * Функция для создания и сохранения администратора в базе данных.
 */
async function seedAdmin() {
  const { MONGODB_URI, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (!MONGODB_URI || !ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.error('One or more required environment variables are missing.');
    return;
  }

  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  /**
   * Модель администратора.
   * @type {Model<Document>}
   */
  const AdminModel: Model<Document> = mongoose.model('Admin', AdminSchema);

  /**
   * Проверка существования администратора в базе данных.
   * @param {Model<Document>} adminModel - Модель администратора.
   * @returns {Promise<boolean>}
   */
  const adminExists = await checkAdminExists(AdminModel);

  if (adminExists) {
    console.log('Admin already exists. Skipping creation.');
    return;
  }

  const admin = new AdminModel({
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
  });

  await admin.save();

  console.log('Admin seed completed!');
}

/**
 * Проверяет наличие администратора в базе данных.
 * @param AdminModel Модель администратора.
 * @returns {Promise<boolean>}
 */
async function checkAdminExists(AdminModel: Model<Document>): Promise<boolean> {
  const admin = await AdminModel.findOne().exec();
  return !!admin;
}

seedAdmin().catch((error) => console.error(error));
