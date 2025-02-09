import { EventNotification, NotificationTypes } from '../../types/Notification'
import { logger } from '../utils/winston'

class NotificationsService {
  private readonly _defaultNotificationTTL = 1_500
  private readonly _loggerTopic = 'notificationsService'
  constructor () {}

  public notifications: EventNotification[] = []

  async pushNotification(type: NotificationTypes, id: number) {
    this.notifications.push({
      type,
      id
    })

    this.clearNotificationAfterTimeout(id)
  }

  private clearNotificationAfterTimeout(id: number) {
    setTimeout(() => {
      const notificationToClear = this.notifications.find(notification => notification.id === id)

      if (notificationToClear == null) {
        logger.warn({
          topic: this._loggerTopic,
          msg: "clearNotificationAfterTimeout couldn't find a notification with id: " + id
        });
        return;
      }

      const notificationIndex = this.notifications.indexOf(notificationToClear)

      this.notifications.splice(notificationIndex, 1)
    }, this._defaultNotificationTTL)
  }

}

const notificationsService = new NotificationsService()
export default notificationsService
