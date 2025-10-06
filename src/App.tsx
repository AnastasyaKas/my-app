// src/App.tsx
import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { DevErrorBoundary } from './components/DevErrorBoundary';

import { tg } from './lib/telegram';

import Home from './pages/Home';
import Tests from './pages/Tests';
import Practices from './pages/Practices';
import Courses from './pages/Courses';
import BottomNav from './components/BottomNav/BottomNav';

import styles from './styles/App.module.css';
import './global.css';

export default function App() {
  const webApp = tg();

  useEffect(() => {
    if (!webApp) return;

    // Сообщаем Telegram, что готовы и разворачиваемся
    webApp.ready();
    webApp.expand();

    // Тема
    const applyTheme = () => {
      const isDark = webApp.colorScheme === 'dark';
      document.body.classList.toggle('tg-dark', isDark);
      document.body.classList.toggle('tg-light', !isDark);
      webApp.setHeaderColor?.(isDark ? '#0f172a' : '#ffffff');
      webApp.setBackgroundColor?.(isDark ? '#0f172a' : '#ffffff');
    };
    applyTheme();
    webApp.onEvent('themeChanged', applyTheme);

    // Прячем системные кнопки Телеграма
    webApp.MainButton.hide();
    webApp.BackButton.hide();

    return () => {
      webApp.offEvent('themeChanged', applyTheme);
    };
  }, [webApp]);

  return (
    <DevErrorBoundary>
      <HashRouter>
        <div className={styles.wrap}>
          {/* Контент страниц. Отступ снизу — под нижнее меню */}
          <main style={{ padding: '16px', paddingBottom: '96px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tests" element={<Tests />} />
              <Route path="/practices" element={<Practices />} />
              <Route path="/courses" element={<Courses />} />
            </Routes>
          </main>

          <BottomNav />
        </div>
      </HashRouter>
    </DevErrorBoundary>
  );
}
