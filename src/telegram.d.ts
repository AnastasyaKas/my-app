// Минимальные типы под Telegram Web Apps (достаточно для старта)
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string; // строка с параметрами авторизации (подписана Telegram, для проверки на сервере)
        initDataUnsafe: any;
        // те же данные, но уже разобранные в объект (user, chat и т.д.)
        // ⚠️ не используем на сервере, только для фронта
        colorScheme: 'light' | 'dark'; // текущая тема клиента Telegram ("светлая" или "тёмная")
        themeParams: Record<string, string>; // параметры оформления (цвета из темы пользователя)
        isExpanded: boolean; // true, если WebApp уже развёрнут на всю высоту
        expand: () => void;// принудительно разворачивает WebApp на весь экран
        close: () => void; // закрывает WebApp (возвращает пользователя обратно в Telegram)
        ready: () => void; // сообщает Telegram, что WebApp готов к работе (рекомендуется вызывать в useEffect)
        sendData: (data: string) => void;  // отправляет строку данных обратно боту (бот получит update с web_app_data)
        onEvent: (event: string, cb: (...args: any[]) => void) => void;
        offEvent: (event: string, cb: (...args: any[]) => void) => void;  // подписка/отписка на события (например, themeChanged)
        MainButton: {
          text: string; // текст кнопки
          isVisible: boolean; // видна ли кнопка
          isActive: boolean; // активна ли кнопка
          show: () => void; // показать
          hide: () => void; // скрыть
          enable: () => void; // включить (активна)
          disable: () => void; // выключить (неактивна)
          setText: (text: string) => void; // изменить текст
          onClick: (cb: () => void) => void; // обработчик нажатия
        };
        BackButton: {
          show: () => void; // показать кнопку «Назад»
          hide: () => void; // скрыть кнопку «Назад»
          onClick: (cb: () => void) => void; // обработчик нажатия
        };
        HapticFeedback?: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void; // короткая вибрация при действии (разные «стили»)
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void; // вибро-уведомление при событии (ошибка/успех/предупреждение)
          selectionChanged: () => void;// лёгкая вибрация при изменении выбора
        };
        setHeaderColor?: (color: string) => void; // меняет цвет заголовка Telegram (если поддерживается клиентом)
        setBackgroundColor?: (color: string) => void; // меняет цвет фона Telegram (если поддерживается клиентом)
      };
    };
  }
}
export {};
