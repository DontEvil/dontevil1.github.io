from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackContext
import logging

# Включаем логирование для отладки
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)
logger = logging.getLogger(__name__)

TOKEN = '7266775254:AAEvHJqDPcE1IzSnvDigrjZ8IUY3vdWbjyA'  # Ваш токен бота

# Функция для старта бота
def start(update: Update, context: CallbackContext):
    user_id = update.message.from_user.id
    chat_member = context.bot.get_chat_member('@your_channel', user_id)

    if chat_member.status in ['member', 'administrator', 'creator']:
        # Если подписан на канал, отправляем ссылку на мини-апп
        keyboard = [
            [InlineKeyboardButton("Перейти в мини-апп", url="https://your-miniappp-url.com")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        update.message.reply_text('Привет! Ты подписан на канал, теперь откроется мини-апп:', reply_markup=reply_markup)
    else:
        # Если не подписан, просим подписаться
        update.message.reply_text("Привет! Пожалуйста, подпишись на наш канал: @your_channel")

# Основная функция для обработки команд
def main():
    updater = Updater(TOKEN, use_context=True)
    dispatcher = updater.dispatcher

    # Обработчик команды /start
    dispatcher.add_handler(CommandHandler("start", start))

    # Запуск бота
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
