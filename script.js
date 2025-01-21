document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем имя пользователя и функции кнопок
    const userName = "Имя пользователя";  // Замените на данные из API бота
    document.getElementById('username').textContent = userName;

    // Функции для кнопок
    document.getElementById('redux-btn').addEventListener('click', function() {
        // Действие для Редукс
        console.log("Редукс нажата");
    });

    document.getElementById('montage-btn').addEventListener('click', function() {
        // Действие для Монтаж
        console.log("Монтаж нажата");
    });

    document.getElementById('preview-btn').addEventListener('click', function() {
        // Действие для Превью
        console.log("Превью нажата");
    });
});
