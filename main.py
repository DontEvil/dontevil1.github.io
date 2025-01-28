from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler
from telegram.ext import CallbackContext

# Обработчик команды /start
async def start(update, context: CallbackContext):
    # Проверяем, подписан ли пользователь на канал
    user_id = update.message.from_user.id
    username = update.message.from_user.username  # Получаем имя пользователя
    try:
        chat_member = await context.bot.get_chat_member('@dontev1l', user_id)  # Используем context.bot
        if chat_member.status in ['member', 'administrator', 'creator']:
            # Если пользователь подписан, показываем кнопку
            keyboard = [
                [
                    InlineKeyboardButton("Открыть бота", web_app=WebAppInfo(url="https://dontevil.github.io/dontevil1.github.io/"))
                ]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            # Отправляем приветственное сообщение с именем пользователя
            await update.message.reply_text(f"Привет, @{username}, спасибо за поддержку. Открыть бота можно по кнопке снизу.", reply_markup=reply_markup)
        else:
            # Если не подписан, выводим сообщение
            await update.message.reply_text("Вы должны быть подписаны на канал @dontev1l, чтобы открыть бота.")
    except Exception as e:
        print(f"Error checking subscription: {e}")
        await update.message.reply_text("Ошибка при проверке подписки.")

# Главная функция
def main():
    # Создаем объект приложения и передаем токен
    application = Application.builder().token("7739274975:AAGpZPQU8nNR5r_bUPt-cFaVN9eVAYkZP-0").build()

    # Добавляем обработчик команды /start
    application.add_handler(CommandHandler("start", start))

    # Запускаем бота с использованием встроенной асинхронности
    application.run_polling()  # Это будет работать, как асинхронный запрос

if __name__ == "__main__":
    main()
