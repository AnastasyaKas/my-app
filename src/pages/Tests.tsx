import React from 'react';
import { useNavigate } from 'react-router-dom';
import tests from '../data/testsList';
import * as s from './Tests.module.css';

export default function Tests() {
  const nav = useNavigate();

  return (
    <div className={s.page}>

      <div className={s.list}>
        {tests.map((t) => (
          <article key={t.id} className={s.card}>
            <div className={s.cardInfo}>
              <h3 className={s.cardTitle}>{t.title}</h3>
              <p className={s.cardSubtitle}>{t.subtitle}</p>
            </div>

            <div className={s.actions}>
              <button
                className={s.button}
                onClick={() => nav(`/tests/${t.id}`)}
              >
                Пройти
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
