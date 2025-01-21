from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler

# Обработчик команды /start
async def start(update, context):
    keyboard = [
        [
            InlineKeyboardButton("Open Web App", web_app=WebAppInfo(url="https://dontevil.github.io/dontevil1.github.io/"))
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Hello! Click the button below to open the Web App:", reply_markup=reply_markup)

# Главная функция
def main():
    # Создаем объект приложения и передаем токен
    application = Application.builder().token("7266775254:AAEvHJqDPcE1IzSnvDigrjZ8IUY3vdWbjyA").build()

    # Добавляем обработчик команды /start
    application.add_handler(CommandHandler("start", start))

    # Запускаем бота с использованием встроенной асинхронности
    application.run_polling()  # Это будет работать, как асинхронный запрос

if __name__ == "__main__":
    main()
