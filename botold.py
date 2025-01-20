from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler

TOKEN = '7266775254:AAEvHJqDPcE1IzSnvDigrjZ8IUY3vdWbjyA'

async def start(update, context):
    keyboard = [
        [InlineKeyboardButton("Запустить игру", url="https://dontevil.github.io/dontevil1.github.io/")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Добро пожаловать в GTA 5 Bot!", reply_markup=reply_markup)

async def main():
    # Создаем объект приложения (bot)
    application = Application.builder().token(TOKEN).build()

    # Регистрация обработчиков
    application.add_handler(CommandHandler("start", start))

    # Запуск бота
    await application.run_polling()

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())
