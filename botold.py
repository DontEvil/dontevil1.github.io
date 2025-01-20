from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler

# Обработчик команды /start
async def start(update, context):
    keyboard = [
        [
            InlineKeyboardButton("Open Web App", web_app=WebAppInfo(url="https://your-web-app-url.com"))
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Hello! Click the button below to open the Web App:", reply_markup=reply_markup)

# Главная функция
async def main():
    application = Application.builder().token("7266775254:AAEvHJqDPcE1IzSnvDigrjZ8IUY3vdWbjyA").build()

    # Добавляем обработчик команды /start
    application.add_handler(CommandHandler("start", start))

    # Запускаем бота
    await application.run_polling()

if __name__ == "__main__":
    import asyncio
    # Вместо asyncio.run используем event loop из telegram.ext
    asyncio.create_task(main())
    asyncio.get_event_loop().run_forever()
