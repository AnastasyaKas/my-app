import { useEffect, useMemo, useState } from 'react'; // хуки React: useEffect для побочных эффектов, useMemo для мемоизации, useState для состояния
import { tg, tgUser } from './lib/telegram';
// tg() → возвращает объект Telegram.WebApp
// tgUser() → достаёт данные о пользователе из initDataUnsafe
import styles from './styles/App.module.css';
// стили для компонента App (CSS Modules)

export default function App() {
  const webApp = tg(); // объект Telegram WebApp (если есть)
  const user = useMemo(() => tgUser(), []); // данные пользователя (инициализируем 1 раз)
  const [scheme, setScheme] = useState<'light' | 'dark'>(webApp?.colorScheme ?? 'light');
  // состояние текущей темы: "light" или "dark"

  useEffect(() => {
    if (!webApp) return; // если приложение запущено не в Telegram, просто выходим

    // Сообщаем Telegram, что мы готовы
    webApp.ready();

    // Развернуть на всю высоту (если не развернуто)
    webApp.expand();

    // Тема из клиента Telegram
    setScheme(webApp.colorScheme ?? 'light');
    document.body.classList.toggle('tg-dark', webApp.colorScheme === 'dark');
    document.body.classList.toggle('tg-light', webApp.colorScheme !== 'dark');

    // (необязательно) Цвета шапки/фона клиента (если доступно)
    webApp.setHeaderColor?.(webApp.colorScheme === 'dark' ? '#0f172a' : '#ffffff');
    webApp.setBackgroundColor?.(webApp.colorScheme === 'dark' ? '#0f172a' : '#ffffff');

    // MainButton
    webApp.MainButton.setText('Готово');
    webApp.MainButton.show();
    webApp.MainButton.enable();
    webApp.MainButton.onClick(() => {
      // Отправляем данные обратно боту (он получит update с web_app_data)
      const payload = {
        ok: true,
        ts: Date.now(),
        user: user ? { id: user.id, username: user.username } : null,
      };
      webApp.HapticFeedback?.impactOccurred?.('medium');
      webApp.sendData(JSON.stringify(payload));
      // Можно закрыть приложение после отправки:
      // webApp.close();
    });

    // BackButton
    webApp.BackButton.show();
    webApp.BackButton.onClick(() => {
      webApp.HapticFeedback?.selectionChanged?.();
      // Тут твоя логика «назад»: например закрыть или перейти на предыдущий экран
      webApp.close();
    });

    // Слушаем смену темы в реальном времени
    const onThemeChange = () => {
      const s = webApp.colorScheme ?? 'light';
      setScheme(s);
      document.body.classList.toggle('tg-dark', s === 'dark');
      document.body.classList.toggle('tg-light', s !== 'dark');
      webApp.setHeaderColor?.(s === 'dark' ? '#0f172a' : '#ffffff');
      webApp.setBackgroundColor?.(s === 'dark' ? '#0f172a' : '#ffffff');
    };
    webApp.onEvent('themeChanged', onThemeChange);

    // очистка
    return () => {
      webApp.offEvent('themeChanged', onThemeChange);
    };
  }, [webApp, user]);

  return (
    <main className={styles.wrap} style={{ paddingBottom: 'calc(20px + var(--tg-safe-bottom))' }}>
      <h1>Telegram Mini App + React</h1>
      <p>Тема: <b>{scheme}</b></p>
      {user ? (
        <p>Пользователь: <b>{user.first_name} {user.last_name ?? ''}</b> @{user.username ?? '—'}</p>
      ) : (
        <p>Пользователь неизвестен (локальный запуск вне Telegram).</p>
      )}
      <p className={styles.mono}>
        Нажми «Готово» (MainButton) — мы отправим данные боту через <code>sendData</code>.
      </p>
    </main>
  );
}
