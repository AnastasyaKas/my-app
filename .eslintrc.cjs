/* eslint-env node */  //говорит ESlint, что файл выполняется в Node.js окружении
module.exports = {
    root: true, // корневой конфиг (ESLint не будет искать конфиги выше по папкам)
    parser: '@typescript-eslint/parser', //парсер для TS (чтобы ESlint понимал TS-код)
    parserOptions: { //
        ecmaVersion: 'latest', //поддержка современного синтаксиса CMAScript
        sourceType: 'module', //используем ES-модули (import/export)
        ecmaFeatures: { jsx: true } //включаем поддержку JSX (react)
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks'], //плагин для правил TS / плагин для правил React / плагин для правил React Hooks
    extends: [ //
        'eslint:recommended', //базовый набор правил ESLint
        'plugin:@typescript-eslint/recommended', // рекомендуемые правила для TypeScript
        'plugin:react/recommended', // рекомендуемые правила для React
        'plugin:react-hooks/recommended', //правила для корректного использования хуков
        'prettier' //отключает правила ESLint, которые конфликтуют с Prettier
    ],
    settings: { //
        react: { version: 'detect' } //автоматически определяет версию React, чтобы включить правильные правила
    },
    rules: { //
        'react/react-in-jsx-scope': 'off' // отключаем правило, требующее `import React` в каждом файле (не нужно с React 17+)
    },
    ignorePatterns: ['dist', 'node_modules'] //// игнорируем папки, где линтить не нужно
};