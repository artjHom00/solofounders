import { TimeConstants } from "~/utils/TimeConstants"
import notificationsService from "../services/notifications"

export default defineNitroPlugin((nitroApp) => {
    setInterval(async () => {
        await notificationsService.clearNotifications()
    }, 3 * TimeConstants.MS_IN_SEC)
})
