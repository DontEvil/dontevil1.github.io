from telegram import Update
from telegram.ext import Application, CommandHandler, CallbackContext

TOKEN = '7266775254:AAEvHJqDPcE1IzSnvDigrjZ8IUY3vdWbjyA'

async def start(update: Update, context: CallbackContext) -> None:
    user = update.message.from_user
    # Отправка кнопки для открытия Web App
    await update.message.reply_text(
        f"Привет, {user.first_name}! Для взаимодействия с ботом нажми на кнопку ниже.",
        reply_markup={
            "inline_keyboard": [
                [{"text": "Открыть Web App", "url": "https://dontevil.github.io/dontevil1.github.io/"}]
            ]
        }
    )

async def main():
    # Создание приложения (заменили Updater на Application)
    application = Application.builder().token(TOKEN).build()

    # Добавление команды /start
    application.add_handler(CommandHandler("start", start))

    # Запуск бота
    await application.run_polling()

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())
