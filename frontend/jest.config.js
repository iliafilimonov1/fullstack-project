module.exports = {
  // Preset для Jest, указывающий, что используется TypeScript
  preset: 'ts-jest',
  // Тестовая среда - jsdom, которая эмулирует браузерную среду
  testEnvironment: 'jsdom',
  // Расширения модулей, которые Jest будет искать при импорте
  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Файлы, которые будут выполняться перед каждым тестом
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
   // Какие файлы нужно трансформировать перед выполнением тестов
  transform: { 
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  // замена импортов файлов стилей на заглушку 'identity-obj-proxy'
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};

