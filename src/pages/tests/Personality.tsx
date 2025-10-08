// src/pages/tests/Personality.tsx
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Personality.module.css';

type Option = 'A' | 'B' | 'C' | 'D';

const QUESTIONS: { q: string; options: Record<Option, string> }[] = [
  { q: 'Как ты обычно проводишь выходные?', options: {
      A: 'С друзьями на вечеринке или прогулке',
      B: 'Дома за книгой, фильмом или играми',
      C: 'Занимаясь чем-то полезным — спорт, хобби, саморазвитие',
      D: 'Спонтанно! Как пойдет — я не планирую заранее',
    }},
  { q: 'Как ты принимаешь решения?', options: {
      A: 'Быстро и интуитивно',
      B: 'Взвешивая все за и против',
      C: 'Советуюсь с другими',
      D: 'Наугад — главное не застревать на месте',
    }},
  { q: 'Что тебе ближе?', options: {
      A: 'Эмоции и общение',
      B: 'Логика и факты',
      C: 'Практика и действие',
      D: 'Воображение и мечты',
    }},
  { q: 'В какой компании ты чувствуешь себя комфортнее всего?', options: {
      A: 'В шумной, весёлой — люблю внимание',
      B: 'В узком кругу близких людей',
      C: 'С людьми, с которыми можно что-то вместе делать',
      D: 'И в одиночестве, и в компании — зависит от настроения',
    }},
  { q: 'Как ты реагируешь на стрессовые ситуации?', options: {
      A: 'Эмоционально, могу вспылить',
      B: 'Стараюсь сохранять спокойствие',
      C: 'Ищу практическое решение проблемы',
      D: 'Ухожу в себя, чтобы подумать',
    }},
  { q: 'Что тебе ближе в работе или учёбе?', options: {
      A: 'Общение и командная работа',
      B: 'Анализ, планирование, детали',
      C: 'Активные действия и результат',
      D: 'Творчество и нестандартные подходы',
    }},
  { q: 'Как ты относишься к переменам?', options: {
      A: 'Люблю! Новое вдохновляет',
      B: 'С опаской, предпочитаю стабильность',
      C: 'Приспосабливаюсь быстро',
      D: 'Если это улучшения — почему бы и нет',
    }},
  { q: 'Какой комплимент тебе приятнее услышать?', options: {
      A: '«Ты такой харизматичный!»',
      B: '«Ты очень умный!»',
      C: '«Ты надёжный и целеустремлённый!»',
      D: '«Ты креативный и оригинальный!»',
    }},
  { q: 'Что для тебя главное в жизни?', options: {
      A: 'Люди и эмоции',
      B: 'Знания и уверенность',
      C: 'Достижения и стабильность',
      D: 'Самовыражение и свобода',
    }},
  { q: 'Новая задача — как действуешь?', options: {
      A: 'Берусь сразу, а потом разберусь',
      B: 'Сначала анализирую и планирую',
      C: 'Делю на шаги и начинаю делать',
      D: 'Ищу вдохновение или нестандартный путь',
    }},
];

const RESULT_TEXT: Record<Option, { title: string; desc: string }> = {
  A: { title: '🎉 Экстраверт-Энтузиаст', desc: 'Энергичный, общительный, вдохновляешь других. Любишь внимание и заряжаешь позитивом.' },
  B: { title: '🧩 Аналитик-Мыслящий', desc: 'Рационален и логичен, всё продумываешь. Любишь порядок и предсказуемость, ценишь интеллект.' },
  C: { title: '💪 Практик-Реалист', desc: 'Человек дела. Предпочитаешь действовать, на тебя можно положиться.' },
  D: { title: '🌈 Творец-Мечтатель', desc: 'Креативный и чувствительный, любишь необычные идеи и свободу самовыражения.' },
};

export default function PersonalityTest() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);                 // от 0 до 10 (10 = результат)
  const [answers, setAnswers] = useState<Option[]>([]);

  const progress = `${step}/${QUESTIONS.length}`;

  const onPick = (opt: Option) => {
    setAnswers((prev) => [...prev, opt]);
    setStep((prev) => prev + 1);
  };

  const result = useMemo(() => {
    if (step < QUESTIONS.length) return null;
    // посчитать что больше: A/B/C/D
    const counts: Record<Option, number> = { A: 0, B: 0, C: 0, D: 0 };
    for (const a of answers) counts[a]++;
    const best = (Object.keys(counts) as Option[]).reduce((m, k) =>
      counts[k] > counts[m] ? k : m, 'A');
    return RESULT_TEXT[best];
  }, [step, answers]);

  // Экран результата
  if (result) {
    return (
      <div className={s.page}>
        <div className={`${s.card} ${s.result}`}>
          <div className={s.title}>{result.title}</div>
          <div className={s.lead}>{result.desc}</div>

          <div className={s.actions}>
            <button className={`${s.btn} ${s.primary}`} onClick={() => nav('/tests')}>
              Пройти ещё тесты
            </button>
            <button className={`${s.btn} ${s.ghost}`} onClick={() => nav('/')}>
              На главную
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Текущий вопрос
  const { q, options } = QUESTIONS[step];

  return (
    <div className={s.page}>
      <div className={s.card}>
        <p className={s.question}>{q}</p>
        <div className={s.answers}>
          {(Object.keys(options) as Option[]).map((key) => (
            <button key={key} className={s.btn} onClick={() => onPick(key)}>
              <b>{key})</b> {options[key]}
            </button>
          ))}
        </div>

        <div className={s.progress}>Вопрос {progress}</div>
      </div>
    </div>
  );
}
