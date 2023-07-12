# Используем образ Node.js в качестве базового образа
FROM node:14-alpine

# Устанавливаем рабочую директорию
WORKDIR /backend

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
