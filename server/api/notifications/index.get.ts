import notificationsService from "../../services/notifications"

export default defineEventHandler(async (event) => {
    try {
        return notificationsService.notifications
    } catch (e) {
      return e
    }
  })
  