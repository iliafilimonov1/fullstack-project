import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function template() {
  const app = await NestFactory.create(AppModule, { cors: true }); // Создание экземпляра приложения

  const PORT = process.env.PORT || 3000; // Порт сервера

  await app.listen(PORT); // Запуск приложения
}

template();

