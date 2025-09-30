module.exports = {
  plugins: [require('autoprefixer')]
};
// указываем, какие PostCSS-плагины использовать
// здесь только autoprefixer — он автоматически добавляет
// в CSS вендорные префиксы (-webkit-, -moz- и т.д.)
// исходя из списка поддерживаемых браузеров (см. .browserslistrc)
