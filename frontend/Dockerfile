# Используем образ Node.js в качестве базового образа
FROM node:14-alpine

# Устанавливаем рабочую директорию
WORKDIR /frontend

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Удаляем папку node_modules (если существует)
RUN rm -rf node_modules

# Устанавливаем зависимости
RUN npm install --silent

# Копируем исходный код
COPY . .

# Устанавливаем рабочую директорию
WORKDIR /frontend

# Собираем приложение
RUN npm run build

# Открываем порт, на котором будет работать приложение
EXPOSE 3333

# Запускаем приложение
CMD ["npm", "start"]
