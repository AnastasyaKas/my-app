// src/pages/tests/Fear.tsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as s from './Personality.module.css'; // реиспользуем те же стили, если они подходят
import QUESTIONS from './FearData';

const cls = (s as any) ?? {};

type AnswersMap = Record<string, 'A' | 'B' | 'C' | 'D'>;

export default function FearTest(): JSX.Element {
  const nav = useNavigate();
  const [index, setIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const total = QUESTIONS.length;
  const q = QUESTIONS[index];

  const choose = (optId: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({ ...prev, [q.id]: optId }));
    setTimeout(() => {
      if (index + 1 < total) setIndex((i) => i + 1);
      else setIndex(total);
    }, 120);
  };

  const goBack = () => {
    if (index === 0) return nav(-1);
    setIndex((i) => Math.max(0, i - 1));
  };

  const result = useMemo(() => {
    if (index < total) return null;
    const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(answers).forEach((v) => {
      if (v) counts[v]++;
    });
    const order: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    let best: 'A' | 'B' | 'C' | 'D' = 'A';
    for (const k of order) {
      if ((counts as any)[k] > (counts as any)[best]) best = k;
    }
    const descriptions: Record<string, { title: string; emoji: string; text: string }> = {
      A: {
        title: 'Страх одиночества',
        emoji: '💔',
        text: 'Ты боишься быть покинутым или забытым. Для тебя важно тепло, близость и ощущение, что ты нужен.',
      },
      B: {
        title: 'Страх потери контроля',
        emoji: '🔒',
        text: 'Ты стараешься держать всё под рукой и боишься хаоса. Потеря контроля вызывает тревогу — тебе нужно ощущение стабильности.',
      },
      C: {
        title: 'Страх неудачи',
        emoji: '⚖️',
        text: 'Ты перфекционист и часто требуешь от себя слишком многого. Больше всего пугает мысль, что ты можешь подвести других или себя.',
      },
      D: {
        title: 'Страх быть собой',
        emoji: '🎭',
        text: 'Ты боишься быть неправильно понятым или осуждённым. Часто прячешь настоящие эмоции, чтобы не показаться "слишком".',
      },
    };

    return { counts, best, info: descriptions[best] };
  }, [index, answers, total]);

  if (index >= total) {
    if (!result) return <div className={cls.page ?? ''}>Ошибка: нет результата</div>;
    return (
      <div className={cls.page ?? ''}>
        <header className={cls.header ?? ''}>
          <h2 className={cls.title ?? ''}>Результат — {result.info.title}</h2>
        </header>

        <section className={cls.questionCard ?? ''}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>{result.info.emoji} {result.info.title}</div>
          <p style={{ marginTop: 6, color: '#374151' }}>{result.info.text}</p>

          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button
              className={cls.back ?? ''}
              onClick={() => {
                nav('/tests');
              }}
            >
              Пройти ещё тесты
            </button>

            <button
              style={{
                background: '#4361EE',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: 10,
                cursor: 'pointer',
              }}
              onClick={() => {
                setAnswers({});
                setIndex(0);
              }}
            >
              Пройти снова
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={cls.page ?? ''}>
      <header className={cls.header ?? ''}>
        <h2 className={cls.title ?? ''}>Какой страх живёт в тебе?</h2>
        <div className={cls.progress ?? ''}>{index + 1} / {total}</div>
      </header>

      <section className={cls.questionCard ?? ''}>
        <h3 className={cls.questionText ?? ''}>{q.text}</h3>

        <div className={cls.options ?? ''}>
          {q.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={cls.option ?? ''}
              onClick={() => choose(opt.id)}
              aria-pressed={answers[q.id] === opt.id}
            >
              <span className={cls.optionLetter ?? ''}>{opt.id}</span>
              <span className={cls.optionText ?? ''}>{opt.text}</span>
            </button>
          ))}
        </div>
      </section>

      <footer className={cls.footer ?? ''}>
        <button className={cls.back ?? ''} onClick={goBack}>Назад</button>
      </footer>
    </div>
  );
}
