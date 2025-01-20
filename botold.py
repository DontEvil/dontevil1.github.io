from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo, Update
from telegram.ext import Application, CommandHandler, CallbackContext

TOKEN = '7266775254:AAEvHJqDPcE1IzSnvDigrjZ8IUY3vdWbjyA'

async def start(update: Update, context: CallbackContext) -> None:
    user = update.message.from_user
    # Создаем кнопку для открытия Web App
    keyboard = [
        [InlineKeyboardButton("Открыть Web App", web_app=WebAppInfo(url="https://dontevil.github.io/dontevil1.github.io/"))]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(
        f"Привет, {user.first_name}! Для взаимодействия с ботом нажми на кнопку ниже.",
        reply_markup=reply_markup
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
    asyncio.get_event_loop().run_until_complete(main())
