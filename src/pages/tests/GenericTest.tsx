import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tests from '../../data/testsList';
import * as sImport from './Personality.module.css'; // переиспользуем стили теста
// безопасный fallback если CSS не импортировался
const s: any = (sImport && Object.keys(sImport).length) ? sImport : makeFallbackStyles();

// fallback generator
function makeFallbackStyles() {
  const names = [
    'page','header','title','progress','questionCard','questionText','options',
    'option','optionLetter','optionText','footer','back','result'
  ];
  const out: Record<string,string> = {};
  names.forEach(n => out[n] = `fallback-${n}`);
  return out;
}

// Типы
type Option = { id: 'A'|'B'|'C'|'D'; text: string };
type Question = { id: string; text: string; options: Option[] };
type TestData = { questions: Question[]; meta?: { title?: string } };

// Явная мапа загрузчиков — добавляй новые тесты сюда (без динамического выражения)
const DATA_LOADERS: Record<string, () => Promise<TestData | null>> = {
  personality: () => import('./PersonalityData').then(m => (m.default ?? m) as any).catch(() => null),
  fear: () => import('./FearData').then(m => (m.default ?? m) as any).catch(() => null),
  // Для будущих тестов добавляй:
  // sleep: () => import('./SleepData').then(m => (m.default ?? m) as any).catch(() => null),
};

// Фолбэк — генерация простых вопросов (10 штук)
function makePlaceholderQuestions(slug: string): TestData {
  const sample = [
    'Как ты обычно проводишь выходные?',
    'Как ты принимаешь решения?',
    'Что тебе ближе?',
    'В какой компании ты чувствуешь себя комфортнее всего?',
    'Как ты реагируешь на стрессовые ситуации?',
    'Что тебе ближе в работе или учёбе?',
    'Как ты относишься к переменам?',
    'Какой комплимент тебе приятнее услышать?',
    'Что для тебя главное в жизни?',
    'Как ты обычно действуешь, если перед тобой новая задача?',
  ];
  const questions: Question[] = sample.map((t, i) => ({
    id: `${slug ?? 'test'}-${i+1}`,
    text: t,
    options: [
      { id: 'A', text: 'A) Вариант A' },
      { id: 'B', text: 'B) Вариант B' },
      { id: 'C', text: 'C) Вариант C' },
      { id: 'D', text: 'D) Вариант D' },
    ],
  }));
  return { questions, meta: { title: 'Шаблонный тест' } };
}

// безопасная загрузка
async function loadTestDataSafe(slug?: string): Promise<TestData | null> {
  if (!slug) return null;
  const loader = DATA_LOADERS[slug];
  if (!loader) return null;
  try {
    const d = await loader();
    // ожидаем структуру { questions, meta }
    if (!d) return null;
    if (!Array.isArray((d as any).questions)) return null;
    return d;
  } catch (e) {
    console.warn('loadTestDataSafe error for', slug, e);
    return null;
  }
}

export default function GenericTest(): JSX.Element {
  const { slug } = useParams<{ slug?: string }>();
  const nav = useNavigate();

  const metaFromList = tests.find(t => t.id === slug);

  const [data, setData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string,'A'|'B'|'C'|'D'>>({});

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setData(null);
    setIndex(0);
    setAnswers({});

    (async () => {
      const loaded = await loadTestDataSafe(slug);
      if (!mounted) return;
      if (loaded) {
        setData(loaded);
      } else {
        // если нет явного data loader — используем шаблон
        setData(makePlaceholderQuestions(slug ?? 'test'));
      }
      setLoading(false);
    })();

    return () => { mounted = false; };
  }, [slug]);

  const QUESTIONS = data?.questions ?? [];
  const total = QUESTIONS.length;

  const choose = (opt: 'A'|'B'|'C'|'D') => {
    const q = QUESTIONS[index];
    if (!q) return;
    setAnswers(prev => ({ ...prev, [q.id]: opt }));
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
    const counts: Record<'A'|'B'|'C'|'D', number> = { A:0,B:0,C:0,D:0 };
    Object.values(answers).forEach((v) => { counts[v] = (counts[v]||0)+1; });
    const maxKey = (['A','B','C','D'] as const).reduce((a,b) => counts[a] >= counts[b] ? a : b);
    // mapping для известных тестов:
    const mapping: Record<string, Record<string, {title:string; emoji:string; text:string}>> = {
      personality: {
        A: { title: 'Экстраверт-Энтузиаст', emoji:'🎉', text:'Ты энергичный, общительный...' },
        B: { title: 'Аналитик-Мыслящий', emoji:'🧩', text:'Ты рационален и логичен...' },
        C: { title: 'Практик-Реалист', emoji:'💪', text:'Ты человек дела...' },
        D: { title: 'Творец-Мечтатель', emoji:'🌈', text:'Ты креативный и чувствительный...' },
      },
      fear: {
        A: { title: 'Страх одиночества', emoji:'💔', text:'Ты боишься быть покинутым...' },
        B: { title: 'Страх потери контроля', emoji:'🔒', text:'Потеря контроля тревожит тебя...' },
        C: { title: 'Страх неудачи', emoji:'⚖️', text:'Ты переживаешь о результатах...' },
        D: { title: 'Страх быть собой', emoji:'🎭', text:'Тебя волнует мнение окружающих...' },
      },
    };
    const mapFor = mapping[slug ?? ''] ?? {
      A: { title: 'Тип A', emoji:'🅰️', text:'Описание типа A' },
      B: { title: 'Тип B', emoji:'🅱️', text:'Описание типа B' },
      C: { title: 'Тип C', emoji:'🅾️', text:'Описание типа C' },
      D: { title: 'Тип D', emoji:'🔷', text:'Описание типа D' },
    };
    return { counts, maxKey, info: mapFor[maxKey] };
  }, [index, answers, total, slug]);

  if (loading) {
    return (
      <div className={s.page}>
        <header className={s.header}><h2 className={s.title}>{metaFromList?.title ?? 'Тест'}</h2></header>
        <div style={{ padding: 12 }}>Загрузка...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={s.page}>
        <header className={s.header}><h2 className={s.title}>{metaFromList?.title ?? 'Тест'}</h2></header>
        <div style={{ padding: 12, color: '#6b7280' }}>
          Данные теста недоступны.
        </div>
        <div style={{ marginTop: 12 }}>
          <button className={s.back} onClick={() => nav('/tests')}>Назад</button>
        </div>
      </div>
    );
  }

  // финал
  if (index >= total) {
    return (
      <div className={s.page}>
        <header className={s.header}><h2 className={s.title}>{metaFromList?.title ?? data.meta?.title ?? 'Результат'}</h2></header>

        <section className={s.questionCard}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>{result?.info.emoji} {result?.info.title}</div>
          <p style={{ color: '#374151' }}>{result?.info.text}</p>

          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button className={s.back} onClick={() => nav('/tests')}>Пройти ещё тесты</button>
            <button style={{ background: '#4361EE', color:'#fff', border:'none', padding:'8px 12px', borderRadius:10 }} onClick={() => { setAnswers({}); setIndex(0); }}>
              Пройти снова
            </button>
          </div>
        </section>
      </div>
    );
  }

  // вопрос
  const q = QUESTIONS[index];

  return (
    <div className={s.page}>
      <header className={s.header}>
        <h2 className={s.title}>{metaFromList?.title ?? data.meta?.title ?? 'Тест'}</h2>
        <div className={s.progress}>{index + 1} / {total}</div>
      </header>

      <section className={s.questionCard}>
        <h3 className={s.questionText}>{q.text}</h3>

        <div className={s.options}>
          {q.options.map(opt => (
            <button key={opt.id} className={s.option} onClick={() => choose(opt.id)}>
              <span className={s.optionLetter}>{opt.id}</span>
              <span className={s.optionText}>{opt.text}</span>
            </button>
          ))}
        </div>
      </section>

      <footer className={s.footer}>
        <button className={s.back} onClick={goBack}>Назад</button>
      </footer>
    </div>
  );
}
