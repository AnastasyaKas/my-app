// src/App.tsx
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { tg, tgUser } from './lib/telegram';

import Home from './pages/Home';
import Tests from './pages/Tests';
import Practices from './pages/Practices';
import Courses from './pages/Courses';

import BottomNav from './components/BottomNav/BottomNav';

import * as styles from './styles/App.module.css';
import './global.css';

export default function App() {
  const webApp = tg();
  const user = useMemo(() => tgUser(), []);
  const [scheme, setScheme] = useState<'light' | 'dark'>(webApp?.colorScheme ?? 'light');

  useEffect(() => {
    if (!webApp) return;

    // Сообщаем Telegram, что готово и разворачиваем
    webApp.ready();
    webApp.expand();

    // Тема
    const applyScheme = (s: 'light' | 'dark') => {
      setScheme(s);
      document.body.classList.toggle('tg-dark', s === 'dark');
      document.body.classList.toggle('tg-light', s !== 'dark');
      webApp.setHeaderColor?.(s === 'dark' ? '#0f172a' : '#ffffff');
      webApp.setBackgroundColor?.(s === 'dark' ? '#0f172a' : '#ffffff');
    };
    applyScheme(webApp.colorScheme ?? 'light');

    const onThemeChange = () => applyScheme(webApp.colorScheme ?? 'light');
    webApp.onEvent('themeChanged', onThemeChange);

    // MainButton
    webApp.MainButton.setText('Готово');
    webApp.MainButton.show();
    webApp.MainButton.enable();
    webApp.MainButton.onClick(() => {
      const payload = {
        ok: true,
        ts: Date.now(),
        user: user ? { id: user.id, username: user.username } : null,
      };
      webApp.HapticFeedback?.impactOccurred?.('medium');
      webApp.sendData(JSON.stringify(payload));
      // webApp.close(); // если нужно закрывать
    });

    // BackButton
    webApp.BackButton.show();
    webApp.BackButton.onClick(() => {
      webApp.HapticFeedback?.selectionChanged?.();
      // здесь твоя логика «назад» (по умолчанию просто закрыть)
      webApp.close();
    });

    return () => {
      webApp.offEvent('themeChanged', onThemeChange);
    };
  }, [webApp, user]);

  return (
    <BrowserRouter>
      <div className={styles?.wrap ?? undefined}>
        {/* Хедер/инфо (можно убрать когда не нужно) */}
        <header style={{ padding: '12px 16px 0' }}>
          <h1 style={{ margin: 0, fontSize: 18 }}>Telegram Mini App + React</h1>
          <p style={{ margin: '6px 0 0', opacity: 0.8 }}>
            Тема: <b>{scheme}</b>{' '}
            {user ? (
              <>
                • Пользователь: <b>{user.first_name} {user.last_name ?? ''}</b>{' '}
                @{user.username ?? '—'}
              </>
            ) : (
              <>• Вне Telegram</>
            )}
          </p>
        </header>

        {/* Основной контент; отступ снизу, чтобы меню не перекрывало */}
        <main style={{ padding: '12px 16px', paddingBottom: 'calc(96px + var(--tg-safe-bottom))' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/practices" element={<Practices />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </main>

        {/* Фиксированное нижнее меню */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
