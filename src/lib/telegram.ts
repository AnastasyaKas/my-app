export function tg() {
  return window.Telegram?.WebApp;
}
// Возвращает объект Telegram WebApp, если он доступен
// (иначе undefined, если запуск не в Telegram)

export function tgUser() {
  return tg()?.initDataUnsafe?.user ?? null;
}
// Достаёт информацию о пользователе из initDataUnsafe
// (например: id, username, first_name, last_name)
// Если приложение открыто не в Telegram → вернёт null


export function isTelegram() {
  return !!tg();
}
// Проверка: запущено ли приложение внутри Telegram
// true → WebApp доступен, false → запущено локально в браузере
