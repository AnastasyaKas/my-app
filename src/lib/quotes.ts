// src/lib/quotes.ts
const QUOTES: { text: string; author?: string }[] = [
  { text: 'Секрет продвижения вперёд — начать.', author: 'Марк Твен' },
  { text: 'Мы — то, что мы делаем постоянно. Отличие — не действие, а привычка.', author: 'Аристотель' },
  { text: 'Неважно, как медленно ты идёшь, пока ты не останавливаешься.', author: 'Конфуций' },
  { text: 'Делай, что можешь, с тем, что имеешь, там, где ты есть.', author: 'Теодор Рузвельт' },
  { text: 'Твоё будущее зависит от того, что ты делаешь сегодня.' },
  { text: 'Успех — это сумма небольших усилий, повторяемых изо дня в день.' },
];

function daySeed(date: Date = new Date()): number {
  // YYYY-MM-DD → число (простое «семя»)
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return y * 10000 + m * 100 + d;
}

export function getDailyQuote(date = new Date()) {
  const seed = daySeed(date);
  const idx = seed % QUOTES.length;
  return QUOTES[idx];
}
