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

  { id: 'emotional_intelligence', title: 'Эмоциональный интеллект', subtitle: 'Понимаешь ли ты свои эмоции?' },
  { id: 'financial_literacy', title: 'Финансовая грамотность', subtitle: 'Как хорошо ты управляешь деньгами?' },
  { id: 'personality_type', title: 'Личностный стиль', subtitle: 'Кто ты по характеру?' },
  { id: 'memory_skills', title: 'Секреты памяти', subtitle: 'Насколько у тебя хорошая память?' },
  { id: 'thinking_style', title: 'Тип мышления', subtitle: 'Логик или творец?' },
  { id: 'hidden_talents', title: 'Скрытые таланты', subtitle: 'Что у тебя получается лучше всего?' },
  { id: 'energy_level', title: 'Энергетический уровень', subtitle: 'Сколько энергии у тебя на самом деле?' },
  { id: 'happiness_factor', title: 'Секреты счастья', subtitle: 'Что делает тебя по-настоящему счастливым?' },
  { id: 'color_personality', title: 'Профиль личности по цветам', subtitle: 'Какой твой цветовой характер?' },
  { id: 'health_habits', title: 'Привычки здоровья', subtitle: 'Насколько здоровый у тебя образ жизни?' },
  { id: 'social_skills', title: 'Социальные навыки', subtitle: 'Как тебя воспринимают люди?' },
  { id: 'love_profile', title: 'Психотип в любви', subtitle: 'Какой ты партнёр?' },
  { id: 'work_stress', title: 'Стрессоустойчивость на работе', subtitle: 'Справляешься ли ты с нагрузкой?' },
  { id: 'willpower', title: 'Сила воли', subtitle: 'Насколько ты дисциплинирован?' },
  { id: 'creativity_skills', title: 'Навыки креативности', subtitle: 'Как быстро ты генерируешь идеи?' },
  { id: 'digital_dependency', title: 'Цифровая зависимость', subtitle: 'Управляешь ли ты гаджетами или они тобой?' },
  { id: 'risk_adventures', title: 'Риск и приключения', subtitle: 'Смелый ли ты по жизни?' },
  { id: 'future_profession', title: 'Профессии будущего', subtitle: 'Какая работа подходит тебе через 5 лет?' },
  { id: 'relationship_energy', title: 'Энергия отношений', subtitle: 'Как ты влияешь на близких?' },
  { id: 'success_psychology', title: 'Психология успеха', subtitle: 'Что мешает тебе достигать целей?' },

];

export default TESTS;
