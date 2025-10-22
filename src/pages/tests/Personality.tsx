import React, { useMemo, useState } from 'react';
import RAW from './PersonalityData'; // убедись: точный регистр файла
import * as sImport from './Personality.module.css';
const s: any = (sImport && Object.keys(sImport).length) ? sImport : generateFallbackClasses();
import { useNavigate } from 'react-router-dom';

/** Простая генерация запасных (fallback) классов — не мешают рендеру, если модуль CSS не загрузился */
function generateFallbackClasses() {
  const names = [
    'page','header','title','progress','questionCard','questionText','options',
    'option','optionLetter','optionText','footer','back'
  ];
  const out: Record<string,string> = {};
  names.forEach(n => out[n] = `fallback-${n}`);
  return out;
}

/** Универсальная функция распаковки модуля теста */
function resolveTestModule(mod: any) {
  if (!mod) return { questions: null, meta: undefined };
  const m = mod.default ?? mod;
  if (Array.isArray(m)) return { questions: m, meta: undefined };
  if (Array.isArray(m?.questions)) return { questions: m.questions, meta: m.meta };
  if (Array.isArray(mod?.QUESTIONS)) return { questions: mod.QUESTIONS, meta: mod?.meta };
  return { questions: null, meta: undefined };
}

export default function PersonalityTest(): JSX.Element {
  const nav = useNavigate();

  const { questions, meta } = resolveTestModule(RAW);

  // если модуль не корректен — показать понятное сообщение (не падать)
  if (!questions) {
    console.warn('PersonalityData module did not expose questions. RAW =', RAW);
    return (
      <div className={s.page}>
        <header className={s.header}>
          <h2 className={s.title}>Тест: Кто ты по типу личности?</h2>
        </header>

        <div style={{ padding: 12, color: '#6b7280' }}>
          Данные теста не загружены — проверь `PersonalityData` и регистр имени файла.
        </div>

        <div style={{ marginTop: 12 }}>
          <button className={s.back} onClick={() => nav('/tests')}>Назад</button>
        </div>
      </div>
    );
  }

  // локальное состояние теста (последовательная навигация по вопросам)
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
      A: { title: 'Экстраверт-Энтузиаст', emoji: '🎉', text: 'Ты энергичный, общительный и вдохновляешь других.' },
      B: { title: 'Аналитик-Мыслящий', emoji: '🧩', text: 'Ты рационален и логичен, всё тщательно продумываешь.' },
      C: { title: 'Практик-Реалист', emoji: '💪', text: 'Ты человек дела. Предпочитаешь действовать.' },
      D: { title: 'Творец-Мечтатель', emoji: '🌈', text: 'Ты креативный и чувствительный человек.' },
    } as Record<string, {title:string, emoji:string, text:string}>;
    return { counts, maxKey, info: mapping[maxKey] };
  }, [index, answers, total]);

  // финальный экран
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

  // текущий вопрос
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
