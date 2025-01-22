import { TimeConstants } from '~/utils/TimeConstants'
import { EventNotification, NotificationTypes } from '../../types/Notification'

class NotificationsService {

  constructor() {
    this.startClearingNotifications()
  }

  public notifications: EventNotification[] = []

  async pushNotification (type: NotificationTypes, id: number) {
    this.notifications.push({
        type: type,
        id: id,
    })
  }

  startClearingNotifications() {
    setInterval(() => {
      this.notifications = []
    }, 3 * TimeConstants.MS_IN_SEC)
  }
}

const notificationsService = new NotificationsService()
export default notificationsService
