import TelegramBot from "node-telegram-bot-api";
import articleService from "./articles";


class TelegramBotService {
    private readonly bot: TelegramBot;
    private readonly adminChatId: number;
    private readonly frontendHost: string;
    constructor() {
        if (process.env.BOT_TOKEN == null) {
            throw new Error('Missing `BOT_TOKEN` from .env')
        }
        if (process.env.NOTIFICATIONS_RECEIVER_TELEGRAM_ID == null || Number.isNaN(Number(process.env.NOTIFICATIONS_RECEIVER_TELEGRAM_ID))) {
            throw new Error('Missing NOTIFICATIONS_RECEIVER_TELEGRAM_ID from .env. Should be integer')
        }
        if (process.env.FRONTEND_HOST == null) {
            throw new Error('Missing FRONTEND_HOST from .env')
        }

        this.bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true })
        this.adminChatId = Number(process.env.NOTIFICATIONS_RECEIVER_TELEGRAM_ID)
        this.frontendHost = process.env.FRONTEND_HOST

        this.initBotEvents()
    }

    async sendModerationRequest(url: string) {
        await this.bot.sendMessage(this.adminChatId, `new article for moderation:
${this.frontendHost}/articles/${url}`, {
            reply_markup: {
                inline_keyboard: [[{ text: '❌ Reject', callback_data: JSON.stringify(['reject', url]) }, { text: '✅ Approve', callback_data: JSON.stringify(['approve', url]) }]]
            }
        })
    }

    private async initBotEvents() {
        this.bot.on('callback_query', async (query) => {
            if(query.data == null) {
                return;
            }
            
            const messageId = query.message?.message_id;
            const [acceptanceStatus, articleSlug] = JSON.parse(query.data)

            switch (acceptanceStatus) {
                case 'approve':
                    articleService.approveArticle(articleSlug)

                    if(messageId != null) {
                        await this.bot.editMessageReplyMarkup({
                            inline_keyboard: [[{ text: '✅ Approved', callback_data: JSON.stringify(['void']) }]]
                        }, {
                            message_id: messageId,
                            chat_id: this.adminChatId
                        })
                    }
                    // todo add notification that approved succesffully
                    break;
                case 'reject':
                    articleService.rejectArticle(articleSlug)
                    if(messageId != null) {
                        await this.bot.editMessageReplyMarkup({
                            inline_keyboard: [[{ text: '❌ Rejected', callback_data: JSON.stringify(['void']) }]]
                        }, {
                            message_id: messageId,
                            chat_id: this.adminChatId
                        })
                    }
                    // todo add notification that rejected successfully
                break;
                case 'void':
                    return;
            }
        })
    }
}

const telegramBotService = new TelegramBotService()
export default telegramBotService