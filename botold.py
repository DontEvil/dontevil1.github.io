from telegram import Update
from telegram.ext import Updater, CommandHandler, CallbackContext
from telegram.ext import Application

# Этот токен необходимо заменить на токен вашего бота
TOKEN = '7266775254:AAEvHJqDPcE1IzSnvDigrjZ8IUY3vdWbjyA'

# Команда start для получения данных о пользователе
async def start(update: Update, context: CallbackContext) -> None:
    user = update.effective_user
    name = user.first_name  # Имя пользователя Telegram
    username = user.username  # Никнейм пользователя

    # Формируем URL с параметрами
    url = f"https://dontevil.github.io/dontevil1.github.io?username={username}&name={name}"

    # Отправляем ссылку в чат
    await update.message.reply_text(f"Привет, {name}! Перейди по ссылке: {url}")

# Основная функция для запуска бота
def main():
    # Создаем объект приложения
    application = Application.builder().token(TOKEN).build()

    # Регистрируем обработчик для команды start
    application.add_handler(CommandHandler("start", start))

    # Запуск бота
    application.run_polling()

if __name__ == '__main__':
    main()
