// src/pages/Home.tsx
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as sRaw from './Home.module.css';

const s = (sRaw as any).default ?? (sRaw as any);

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
        <button className={`${s.tile} ${s.personality}`} onClick={() => nav('/tests/personality')}>
          <div className={s.tileTitle}>Кто ты по типу личности?</div>
        </button>
        <button className={`${s.tile} ${s.fear}`} onClick={() => nav('/tests/fear')}>
          <div className={s.tileTitle}>Какой страх живёт в тебе?</div>
        </button>
      </section>

      {/* Две плитки: ресурсы / мотивация */}
      <section className={s.gridTwo} aria-label="Тематики">
        <button className={`${s.tile} ${s.withImg}`} onClick={() => nav('/practices')}>
          <div className={s.tileTitle}>Полезные ресурсы</div>
          <img src="/images/resources.png" alt="" className={s.tileImage}/>
        </button>
        <button className={`${s.tile} ${s.withImg}`} onClick={() => nav('/practices')}>
          <div className={s.tileTitle}>Мотивация</div>
          <img src="/images/motivation.png" alt="" className={s.tileImage}/>
        </button>
      </section>

      {/* Две плитки: саморазвитие / психология */}
      <section className={s.gridTwo} aria-label="Тематики">
        <button className={`${s.tile} ${s.withImg}`} onClick={() => nav('/practices')}>
          <div className={s.tileTitle}>Саморазвитие</div>
          <img src="/images/selfgrowth.png" alt="" className={s.tileImage}/>
        </button>
        <button className={`${s.tile} ${s.withImg}`} onClick={() => nav('/practices')}>
          <div className={s.tileTitle}>Психология</div>
          <img src="/images/psychology.png" alt="" className={s.tileImage}/>
        </button>
      </section>
    </div>
  );
}
