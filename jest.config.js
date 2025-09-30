/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom', // окружение тестов — jsdom (эмулирует браузер: document, window и т.д.)
  transform: { // говорим Jest, как обрабатывать файлы TS/JS/TSX/JSX
    '^.+\\.(t|j)sx?$': [
      'babel-jest', // пропускаем через babel
      { presets: [
        '@babel/preset-env', // современный JS под целевые браузеры
          ['@babel/preset-react', { runtime: 'automatic' }],  // поддержка JSX без `import React`
          '@babel/preset-typescript'] }]  // поддержка TypeScript
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // алиас @/src → абсолютные импорты
    '\\.(css|scss)$': 'identity-obj-proxy',  // мокаем импорты CSS/SCSS, чтобы Jest не падал (возвращает "пустой объект")
    '\\.(jpg|jpeg|png|gif|svg|webp|avif)$': '<rootDir>/test/__mocks__/fileMock.js' // мокаем картинки и медиа-файлы (возвращаем заглушку "test-file-stub")
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'] // подключаем файл с доп. настройками тестов (например, jest-dom матчеры)
};
