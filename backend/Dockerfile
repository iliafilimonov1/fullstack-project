# Используем образ Node.js в качестве базового образа
FROM node:14-alpine

# Устанавливаем рабочую директорию
WORKDIR /backend

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Удаляем папку node_modules (если существует)
RUN rm -rf node_modules

# Устанавливаем зависимости
RUN npm install --silent

# Копируем исходный код
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
