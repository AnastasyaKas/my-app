// src/pages/Home.tsx
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as sRaw from './Home.module.css';

// 👇 гарантирует, что стили подключатся и при default, и при именованном экспорте
const s = (sRaw as any).default ?? (sRaw as any);

// Простейший генератор «цитаты дня» (пока локально, потом подключим API)
function getDailyQuote(d: Date) {
  const quotes = [
    { text: 'Начни с малого — главное начать.'},
    { text: 'Последовательность побеждает мотивацию.' },
    { text: 'Лучшее время — сейчас.' },
    { text: 'Маленькие шаги → большие изменения.'},
    { text: 'Дисциплина — это свобода.' },
    { text: 'Не обязательно быть лучшим, главное — быть лучше, чем вчера.' },
    { text: 'Ты не обязан быть идеальным, чтобы быть достойным.' },
    { text: 'Делай то, что должен, и будь что будет.'},
    { text: 'Сила не в том, чтобы никогда не падать, а в том, чтобы подниматься каждый раз.' },
    { text: 'Не ищи лёгких путей — они ведут не туда.' },
    { text: 'Ты справишься. Не сразу, но справишься.' },
    { text: 'Настоящий прогресс тихий.' },
    { text: 'То, что ты делаешь ежедневно, формирует то, кем ты станешь.' },
    { text: 'Никто не придёт и не сделает это за тебя.'},
    { text: 'Действуй, даже когда не веришь в результат.' },
    { text: 'Главное — не скорость, а направление.'},
    { text: 'Устал — отдохни, но не сдавайся.'},
    { text: 'Если хочешь изменить жизнь — начни с привычек.'},
    { text: 'Порядок во внешнем мире начинается с порядка внутри.'},
    { text: 'Невозможно потерпеть неудачу, если ты не остановился.' },
    { text: 'Твоя будущая версия благодарит тебя за усилия сегодня.'},
    { text: 'Трудные времена создают сильных людей.' },
    { text: 'Не сравнивай — просто продолжай.'},
    { text: 'Каждый день — шанс начать заново.' },
    { text: 'Делай меньше, но лучше.'},
    { text: 'Фокус важнее мотивации.'},
    { text: 'Ты не опоздал. Всё вовремя.' },
    { text: 'Просто сделай первый шаг.' },
    { text: 'Самое важное — не останавливаться.' },
    { text: 'Путь длинный, но он твой.' },
    { text: 'Сомнения убивают больше мечтаний, чем неудачи.' },
    { text: 'Результаты приходят к тем, кто не ждёт вдохновения.'},
    { text: 'Иногда прогресс — это просто не сдаться.'},
    { text: 'Ты не обязан быть мотивированным, чтобы действовать.'},
  ];
  const idx =
    (d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()) %
    quotes.length;
  return quotes[idx];
}

export default function Home() {
  const nav = useNavigate();
  const quote = useMemo(() => getDailyQuote(new Date()), []);

  return (
    <div className={s.page}>
      {/* Цитата дня */}
      <section className={s.quoteCard} aria-label="Цитата дня">
        <p className={s.quote}>“{quote.text}”</p>
      </section>

      {/* Две плитки: тесты */}
      <section className={s.gridTwo} aria-label="Быстрые тесты">
        <button className={s.tile} onClick={() => nav('/tests/personality')}>
          <div className={s.tag}>Тесты</div>
          <div className={s.tileTitle}>Тест на тип личности</div>
          <div className={s.tileNote}>10 вопросов · быстрый результат</div>
        </button>
        <button className={s.tile} onClick={() => nav('/tests/fear')}>
          <div className={s.tag}>Тесты</div>
          <div className={s.tileTitle}>Тест на главный страх</div>
          <div className={s.tileNote}>10 вопросов · быстрый результат</div>
        </button>
      </section>

      {/* Две плитки: ресурсы / мотивация */}
      <section className={s.gridTwo} aria-label="Ресурсы и мотивация">
        <button className={s.tile} onClick={() => nav('/practices')}>
          <div className={s.tag}>Ресурсы</div>
          <div className={s.tileTitle}>Полезные ресурсы</div>
          <div className={s.tileNote}>#практика · ссылки на посты</div>
        </button>
        <button className={s.tile} onClick={() => nav('/practices')}>
          <div className={s.tag}>Мотивация</div>
          <div className={s.tileTitle}>Мотивация</div>
          <div className={s.tileNote}>#мотивация · ссылки на посты</div>
        </button>
      </section>

      {/* Две плитки: саморазвитие / психология */}
      <section className={s.gridTwo} aria-label="Тематики">
        <button className={s.tile} onClick={() => nav('/practices')}>
          <div className={s.tag}>Темы</div>
          <div className={s.tileTitle}>Саморазвитие</div>
          <div className={s.tileNote}>#саморазвитие · посты из канала</div>
        </button>
        <button className={s.tile} onClick={() => nav('/practices')}>
          <div className={s.tag}>Темы</div>
          <div className={s.tileTitle}>Психология</div>
          <div className={s.tileNote}>#психология · посты из канала</div>
        </button>
      </section>
    </div>
  );
}
