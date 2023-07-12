# Используем образ Node.js в качестве базового образа
FROM node:14-alpine as builder

# Устанавливаем рабочую директорию
WORKDIR /frontend

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем статические файлы для продакшн-сборки
RUN npm run build

# Создаем образ для продакшн-сборки
FROM node:14-alpine

# Устанавливаем рабочую директорию
WORKDIR /frontend

# Копируем собранные статические файлы из предыдущего этапа
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
