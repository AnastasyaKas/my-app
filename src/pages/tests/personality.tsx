import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions, resultTexts, type AnswerKey } from './personalityData';
import styles from './Personality.module.css';
import { tg } from '../../lib/telegram';

export default function PersonalityTest() {
  const nav = useNavigate();
  const webApp = tg();

  const total = questions.length;
  const [step, setStep] = useState(0);              // 0..total, где total = результат
  const [answers, setAnswers] = useState<AnswerKey[]>([]);

  const progress = Math.round((Math.min(step, total) / total) * 100);

  const onChoose = (key: AnswerKey) => {
    const next = [...answers, key];
    setAnswers(next);

    if (step + 1 < total) {
      setStep(step + 1);
      webApp?.HapticFeedback?.impactOccurred?.('light');
    } else {
      // закончили — переходим к результату
      setStep(total);
      webApp?.HapticFeedback?.notificationOccurred?.('success');
    }
  };

  const result = useMemo(() => {
    if (step < total) return null;
    const counts: Record<AnswerKey, number> = { A: 0, B: 0, C: 0, D: 0 };
    answers.forEach(k => (counts[k] += 1));
    const winner = (Object.keys(counts) as AnswerKey[]).reduce((a, b) =>
      counts[a] >= counts[b] ? a : b
    );
    return { key: winner, meta: resultTexts[winner], counts };
  }, [answers, step, total]);

  // экран вопроса
  if (step < total) {
    const { q, options } = questions[step];
    return (
      <div className={styles.page}>
        <div className={styles.progressWrap}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          <div className={styles.progressText}>
            Вопрос {step + 1} / {total}
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.q}>{q}</h2>
          <div className={styles.opts}>
            {options.map(opt => (
              <button key={opt.key} className={styles.opt} onClick={() => onChoose(opt.key)}>
                <span className={styles.badge}>{opt.key}</span>
                <span>{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // экран результата
  return (
    <div className={styles.page}>
      <div className={styles.resultCard}>
        <div className={styles.emoji}>{result!.meta.emoji}</div>
        <h2 className={styles.title}>{result!.meta.title}</h2>
        <p className={styles.desc}>{result!.meta.desc}</p>

        <button className={styles.primary} onClick={() => nav('/tests')}>
          Перейти к остальным тестам
        </button>
      </div>
    </div>
  );
}
