from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, CallbackContext

# Загружаем токен бота из .env (или напрямую в коде)
import os
from dotenv import load_dotenv

# Загрузка переменных из .env файла
load_dotenv()

TOKEN = os.getenv("7266775254:AAEvHJqDPcE1IzSnvDigrjZ8IUY3vdWbjyA")

# Функция для обработки команды /start
async def start(update: Update, context: CallbackContext):
    # Создаем кнопку для перехода в мини-приложение
    keyboard = [
        [InlineKeyboardButton("Перейти в мини-апп", web_app={"url": "https://your-username.github.io/your-repository-name/"})]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    # Отправляем сообщение с кнопкой
    await update.message.reply_text('Привет! Нажми кнопку, чтобы открыть мини-апп:', reply_markup=reply_markup)

# Главная функция, создающая и запускающая бота
async def main():
    # Создание бота с использованием токена
    application = Application.builder().token(TOKEN).build()

    # Добавляем обработчик для команды /start
    application.add_handler(CommandHandler("start", start))

    # Запускаем бота
    await application.run_polling()

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())
