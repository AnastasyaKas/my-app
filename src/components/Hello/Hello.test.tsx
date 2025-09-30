import { render, screen } from '@testing-library/react'; // утилиты для рендеринга компонентов в тестах
import { Hello } from './Hello';  // компонент, который тестируем


test('renders greeting', () => {
  render(<Hello name="Мир" />); //рендерим компонент Hello с пропсом name="Мир"
  expect(screen.getByText('Привет, Мир!')).toBeInTheDocument(); // проверяем, что на экране есть текст "Привет, Мир!"
});
