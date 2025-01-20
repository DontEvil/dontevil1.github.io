// Получаем доступ к Telegram Web App API
const tg = window.Telegram.WebApp;

// Функция для загрузки информации о пользователе
function getUserInfo() {
    const username = tg.initDataUnsafe?.user?.username || "Неизвестный";
    document.getElementById('username').innerText = username;
}

// Обработчики для кнопок
document.getElementById('reduxButton').addEventListener('click', function() {
    // Логика для редукса
    alert('Редукс выбран!');
});

document.getElementById('montageButton').addEventListener('click', function() {
    // Логика для монтажа
    alert('Монтаж выбран!');
});

document.getElementById('previewButton').addEventListener('click', function() {
    // Логика для превью
    alert('Превью выбран!');
});

// Инициализируем пользователя
getUserInfo();

// Стиль для работы с Web App
tg.expand();
