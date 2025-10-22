// src/data/testsList.ts
export type TestMeta = {
  id: string;        // slug (используется в URL: /tests/:slug)
  title: string;
  subtitle?: string;
  implemented?: boolean; // true если есть data файл
};

const TESTS: TestMeta[] = [
  { id: 'personality', title: 'Кто ты по типу личности?', subtitle: '10 вопросов · быстрый результат', implemented: true },
  { id: 'fear', title: 'Какой страх живёт в тебе?', subtitle: '10 вопросов · быстрый результат', implemented: true },

  // остальные (пример 18 дополнительных, можно редактировать)
  { id: 'stress', title: 'Быстрый тест на стресс', subtitle: 'Определи уровень стресса' },
  { id: 'sleep', title: 'Качество сна', subtitle: 'Оцени свои привычки сна' },
  { id: 'energy', title: 'Уровень энергии', subtitle: 'Понять режим и заряд' },
  { id: 'motivation', title: 'Мотивационный профиль', subtitle: 'Что тебя заводит' },
  { id: 'habits', title: 'Проверка привычек', subtitle: 'Какие привычки доминируют' },
  { id: 'focus', title: 'Тест на концентрацию', subtitle: 'Проверка внимания' },
  { id: 'empathy', title: 'Эмпатия', subtitle: 'Как ты воспринимаешь других' },
  { id: 'creativity', title: 'Творческий профиль', subtitle: 'Как ты генерируешь идеи' },
  { id: 'resilience', title: 'Стойкость к неудачам', subtitle: 'Как ты восстанавливаешься' },
  { id: 'confidence', title: 'Уверенность в себе', subtitle: 'Оцени свою самооценку' },
  { id: 'leadership', title: 'Лидерские качества', subtitle: 'Профиль лидера' },
  { id: 'communication', title: 'Коммуникационный стиль', subtitle: 'Как ты общаешься' },
  { id: 'decision', title: 'Как ты принимаешь решения', subtitle: 'Стиль принятия решений' },
  { id: 'values', title: 'Ценности и приоритеты', subtitle: 'Что для тебя важнее' },
  { id: 'relationships', title: 'Отношения', subtitle: 'Профиль взаимоотношений' },
  { id: 'time', title: 'Управление временем', subtitle: 'Как ты занят/расписываешь день' },
  { id: 'learning', title: 'Стиль обучения', subtitle: 'Как ты лучше учишься' },
  { id: 'career', title: 'Карьера и призвание', subtitle: 'Куда двигаться профессионально' },
];

export default TESTS;
