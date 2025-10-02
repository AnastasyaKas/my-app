// bot.cjs — CommonJS
require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const token = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://example.com';
const CHANNEL = process.env.CHANNEL || null;

if (!token) {
  console.error('❌ BOT_TOKEN не найден в .env');
  process.exit(1);
}

const bot = new Telegraf(token);

// ---------- утилита: гарантируем наличие @username бота ----------
let BOT_USERNAME = process.env.BOT_USERNAME || null;
async function ensureBotUsername() {
  if (!BOT_USERNAME) {
    const me = await bot.telegram.getMe();
    BOT_USERNAME = me.username; // без "@"
    console.log('ℹ️ BOT_USERNAME =', BOT_USERNAME);
  }
  return BOT_USERNAME;
}

// ---------- лог всех апдейтов ----------
bot.use(async (ctx, next) => {
  console.log('➡️ update:', {
    chat: ctx.chat?.type,
    from: ctx.from?.username || ctx.from?.id,
    text: ctx.message?.text,
    webapp: ctx.message?.web_app_data?.data,
  });
  await next();
});

// ---------- /start в ЛС: кнопка Mini App ----------
bot.start((ctx) => {
  return ctx.reply(
    'Открой мини-приложение:',
    Markup.inlineKeyboard([
      [Markup.button.webApp('Пройти тест 🎯', WEBAPP_URL)]
    ])
  );
});

// ---------- /post: постим в канал URL-кнопкой (deeplink startapp) ----------
bot.command('post', async (ctx) => {
  if (!CHANNEL) return ctx.reply('❌ Не задан CHANNEL в .env');
  await ensureBotUsername();

  const startAppUrl = `https://t.me/${BOT_USERNAME}?startapp=1`; // откроет Mini App через бота

  await ctx.reply(`Пробую отправить в ${CHANNEL}…`);
  try {
    await ctx.telegram.sendMessage(CHANNEL, 'Откройте мини-приложение:', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Пройти тест 🎯', url: startAppUrl }]]
      }
    });
    await ctx.reply('✅ Сообщение отправлено в канал.');
  } catch (e) {
    console.error('sendMessage error:', e?.response?.description || e);
    await ctx.reply('❌ Ошибка при отправке: ' + (e?.response?.description || e?.message || String(e)));
  }
});

// ---------- /chatid @username: узнать числовой id канала ----------
bot.command('chatid', async (ctx) => {
  const arg = ctx.message.text.split(' ')[1]; // /chatid @username
  if (!arg) return ctx.reply('Использование: /chatid @username_канала');
  try {
    const chat = await bot.telegram.getChat(arg);
    await ctx.reply(`chat_id: \`${chat.id}\``, { parse_mode: 'Markdown' });
  } catch (e) {
    console.error('getChat error:', e?.response?.description || e);
    await ctx.reply('❌ Ошибка: ' + (e?.response?.description || e?.message || String(e)));
  }
});

// ---------- в самом конце: обработчик web_app_data ----------
bot.on('message', async (ctx, next) => {
  const wa = ctx.message?.web_app_data;
  if (wa?.data) {
    try {
      const parsed = JSON.parse(wa.data);
      await ctx.reply(
        'Получил из WebApp:\n```json\n' + JSON.stringify(parsed, null, 2) + '\n```',
        { parse_mode: 'Markdown' }
      );
    } catch {
      await ctx.reply('Получил (raw): ' + wa.data);
    }
    return; // обработали — дальше не идём
  }
  return next(); // пропускаем дальше, чтобы команды работали
});

// ---------- запуск: снимем webhook, узнаем username, включим polling ----------
(async () => {
  try {
    const info = await bot.telegram.getWebhookInfo();
    if (info.url) {
      console.log('ℹ️ Обнаружен webhook:', info.url, '— отключаю…');
      await bot.telegram.deleteWebhook({ drop_pending_updates: true });
    }

    await ensureBotUsername();
    await bot.launch();
    console.log('✅ Bot started (polling). Username =', BOT_USERNAME, ' — напиши /start');
  } catch (err) {
    console.error('❌ Bot launch error:', err);
    process.exit(1);
  }

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
})();
