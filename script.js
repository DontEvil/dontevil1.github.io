document.addEventListener('DOMContentLoaded', function() {
    // Функции для кнопок
    document.getElementById('redux').addEventListener('click', function() {
        alert("Редукс нажата!");
    });

    document.getElementById('montage').addEventListener('click', function() {
        alert("Монтаж нажата!");
    });

    document.getElementById('preview').addEventListener('click', function() {
        alert("Превью нажата!");
    });
});
