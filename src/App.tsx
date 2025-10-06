// src/App.tsx
import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { tg } from './lib/telegram';

import Home from './pages/Home';
import Tests from './pages/Tests';
import Practices from './pages/Practices';
import Courses from './pages/Courses';
import BottomNav from './components/BottomNav/BottomNav';

import * as styles from './styles/App.module.css';
import './global.css';

export default function App() {
  const webApp = tg();

  useEffect(() => {
    if (!webApp) return;
    webApp.ready();
    webApp.expand();

    const applyTheme = () => {
      const isDark = webApp.colorScheme === 'dark';
      document.body.classList.toggle('tg-dark', isDark);
      document.body.classList.toggle('tg-light', !isDark);
      webApp.setHeaderColor?.(isDark ? '#0f172a' : '#ffffff');
      webApp.setBackgroundColor?.(isDark ? '#0f172a' : '#ffffff');
    };
    applyTheme();
    webApp.onEvent('themeChanged', applyTheme);

    webApp.MainButton.hide();
    webApp.BackButton.hide();

    return () => {
      webApp.offEvent('themeChanged', applyTheme);
    };
  }, [webApp]);

  return (
    <HashRouter>
      <div className={styles.wrap}>
        <main >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/practices" element={<Practices />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </HashRouter>
  );
}
