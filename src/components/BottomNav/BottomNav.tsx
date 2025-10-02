import { NavLink } from 'react-router-dom';
import * as styles from './BottomNav.module.css'; // 👈 используем имя "styles"

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z"/>
    </svg>
  );
}
function IconTests() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M7 3h10a2 2 0 0 1 2 2v14l-7-3-7 3V5a2 2 0 0 1 2-2Z"/>
    </svg>
  );
}
function IconPractices() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h10v2H4v-2Z"/>
    </svg>
  );
}
function IconCourses() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M4 4h16v14H4V4Zm2 2v10h12V6H6Zm-2 14h16v2H4v-2Z"/>
    </svg>
  );
}

export default function BottomNav() {
  return (
    <nav className={styles.wrap} role="navigation" aria-label="Основное меню">
      <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.item} ${styles.active}` : styles.item}>
        <IconHome />
        <span className={styles.label}>Главная</span>
      </NavLink>

      <NavLink to="/tests" className={({ isActive }) => isActive ? `${styles.item} ${styles.active}` : styles.item}>
        <IconTests />
        <span className={styles.label}>Тесты</span>
      </NavLink>

      <NavLink to="/practices" className={({ isActive }) => isActive ? `${styles.item} ${styles.active}` : styles.item}>
        <IconPractices />
        <span className={styles.label}>Практики</span>
      </NavLink>

      <NavLink to="/courses" className={({ isActive }) => isActive ? `${styles.item} ${styles.active}` : styles.item}>
        <IconCourses />
        <span className={styles.label}>Курсы</span>
      </NavLink>
    </nav>
  );
}
