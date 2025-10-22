import React, { useMemo, useState } from 'react';
import RAW from './FearData';
import * as sImport from './Personality.module.css';
const s: any = (sImport && Object.keys(sImport).length) ? sImport : generateFallbackClasses();
import { useNavigate } from 'react-router-dom';

function generateFallbackClasses() {
  const names = [
    'page','header','title','progress','questionCard','questionText','options',
    'option','optionLetter','optionText','footer','back'
  ];
  const out: Record<string,string> = {};
  names.forEach(n => out[n] = `fallback-${n}`);
  return out;
}

function resolveTestModule(mod: any) {
  if (!mod) return { questions: null, meta: undefined };
  const m = mod.default ?? mod;
  if (Array.isArray(m)) return { questions: m, meta: undefined };
  if (Array.isArray(m?.questions)) return { questions: m.questions, meta: m.meta };
  if (Array.isArray(mod?.QUESTIONS)) return { questions: mod.QUESTIONS, meta: mod?.meta };
  return { questions: null, meta: undefined };
}

export default function FearTest(): JSX.Element {
  const nav = useNavigate();
  const { questions, meta } = resolveTestModule(RAW);

  if (!questions) {
    console.warn('FearData did not expose questions. RAW =', RAW);
    return (
      <div className={s.page}>
        <header className={s.header}><h2 className={s.title}>Тест: Какой страх живёт в тебе?</h2></header>
        <div style={{ padding: 12, color: '#6b7280' }}>
          Данные теста не загружены — проверь `FearData` и регистр имени файла.
        </div>
        <div style={{ marginTop: 12 }}>
          <button className={s.back} onClick={() => nav('/tests')}>Назад</button>
        </div>
      </div>
    );
  }

  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A'|'B'|'C'|'D'>>({});

  const choose = (opt: 'A'|'B'|'C'|'D') => {
    const q = questions[index];
    if (!q) return;
    setAnswers(prev => ({ ...prev, [q.id ?? index]: opt }));
    setTimeout(() => {
      if (index + 1 < total) setIndex(i => i + 1);
      else setIndex(total);
    }, 120);
  };

  const goBack = () => {
    if (index === 0) return nav(-1);
    setIndex(i => Math.max(0, i - 1));
  };

  const result = useMemo(() => {
    if (index < total) return null;
    const counts: Record<'A'|'B'|'C'|'D', number> = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(answers).forEach((v) => counts[v] = (counts[v] || 0) + 1);
    const maxKey = (['A','B','C','D'] as const).reduce((a,b) => counts[a] >= counts[b] ? a : b);
    const mapping = {
      A: { title: 'Страх одиночества', emoji: '💔', text: 'Ты боишься быть покинутым или забытым.' },
      B: { title: 'Страх потери контроля', emoji: '🔒', text: 'Ты стремишься управлять всем.' },
      C: { title: 'Страх неудачи', emoji: '⚖️', text: 'Ты переживаешь о результатах.' },
      D: { title: 'Страх быть собой', emoji: '🎭', text: 'Тебя волнует мнение окружающих.' },
    } as Record<string, {title:string, emoji:string, text:string}>;
    return { counts, maxKey, info: mapping[maxKey] };
  }, [index, answers, total]);

  if (index >= total) {
    return (
      <div className={s.page}>
        <header className={s.header}><h2 className={s.title}>{meta?.title ?? 'Результат'}</h2></header>
        <section className={s.questionCard}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>{result?.info.emoji} {result?.info.title}</div>
          <p style={{ color: '#374151' }}>{result?.info.text}</p>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button className={s.back} onClick={() => nav('/tests')}>Пройти ещё тесты</button>
            <button
              style={{ background: '#4361EE', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 10 }}
              onClick={() => { setAnswers({}); setIndex(0); }}
            >
              Пройти снова
            </button>
          </div>
        </section>
      </div>
    );
  }

  const q = questions[index];

  return (
    <div className={s.page}>
      <header className={s.header}>
        <h2 className={s.title}>{meta?.title ?? 'Тест'}</h2>
        <div className={s.progress}>{index + 1} / {total}</div>
      </header>

      <section className={s.questionCard}>
        <h3 className={s.questionText}>{q.text}</h3>

        <div className={s.options}>
          {Array.isArray(q.options) ? q.options.map((opt: any) => (
            <button key={opt.id} className={s.option} onClick={() => choose(opt.id)}>
              <span className={s.optionLetter}>{opt.id}</span>
              <span className={s.optionText}>{opt.text}</span>
            </button>
          )) : <p>Вопрос повреждён — нет options.</p>}
        </div>
      </section>

      <footer className={s.footer}>
        <button className={s.back} onClick={goBack}>Назад</button>
      </footer>
    </div>
  );
}
