import React from 'react'; // импортируем React (чтобы использовать JSX и типы)

import { createRoot } from 'react-dom/client'; // импортируем метод createRoot (React 18 API для рендеринга приложения)
import App from './App'; // импортируем главный компонент приложения
import './global.css'; // подключаем глобальные стили (CSS будет применён ко всему проекту)


const container = document.getElementById('root')!;
// получаем элемент <div id="root"></div> из index.html
// "!" — оператор TS, говорим компилятору «точно не null»
createRoot(container).render(<App />);
// создаём корень React и рендерим в него главный компонент <App />
