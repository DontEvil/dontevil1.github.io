from telegram import Update
from telegram.ext import Application, CommandHandler, CallbackContext
import asyncio

# Токен бота (вставь свой токен)
TOKEN = "7266775254:AAEvHJqDPcE1IzSnvDigrjZ8IUY3vdWbjyA"
CHANNEL = "@dontev1l"  # Канал для подписки

# Команда /start
async def start(update: Update, context: CallbackContext) -> None:
    user = update.effective_user
    user_id = user.id

    # Проверяем, подписан ли пользователь на канал
    try:
        chat_member = await context.bot.get_chat_member(CHANNEL, user_id)
        if chat_member.status in ['member', 'administrator', 'creator']:
            # Пользователь подписан
            await update.message.reply(
                "Вы успешно подписаны на канал! Теперь открываем мини-апп.",
                reply_markup=None
            )
            # Ссылка на мини-апп
            await update.message.reply(
                "Перейти к мини-аппу: https://dontevil.github.io/dontevil1.github.io/"
            )
        else:
            # Если не подписан
            await update.message.reply(
                "Пожалуйста, подпишитесь на канал, чтобы продолжить.",
                reply_markup=None
            )
    except Exception as e:
        await update.message.reply("Произошла ошибка при проверке подписки.")
        print(f"Error: {e}")

async def main():
    # Создаем приложение с токеном
    application = Application.builder().token(TOKEN).build()

    # Добавляем обработчик команды /start
    application.add_handler(CommandHandler("start", start))

    # Запуск бота
    await application.run_polling()

# Запуск
if __name__ == '__main__':
    asyncio.run(main())
