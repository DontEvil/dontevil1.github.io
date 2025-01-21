from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler
from telegram.error import BadRequest

# Проверка подписки на канал
async def check_subscription(update, context):
    try:
        chat_member = await update.bot.get_chat_member('@dontev1l', update.message.from_user.id)
        
        # Если пользователь подписан на канал
        if chat_member.status in ['member', 'administrator', 'creator']:
            keyboard = [
                [
                    InlineKeyboardButton("Open Web App", web_app=WebAppInfo(url="https://dontevil.github.io/dontevil1.github.io/"))
                ]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            await update.message.reply_text("Hello! You are subscribed. Click the button below to open the Web App:", reply_markup=reply_markup)
        else:
            await update.message.reply_text("You must subscribe to the channel to access the Web App. Please subscribe to @dontev1l.")
    except BadRequest:
        await update.message.reply_text("Error checking your subscription status. Please try again later.")

# Главная функция
def main():
    application = Application.builder().token("YOUR_BOT_TOKEN").build()

    # Добавляем обработчик команды /start
    application.add_handler(CommandHandler("start", check_subscription))

    # Запускаем бота с использованием встроенной асинхронности
    application.run_polling()

if __name__ == "__main__":
    main()
