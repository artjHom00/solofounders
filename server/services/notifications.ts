import { EventNotification, NotificationTypes } from '../../types/Notification'

class NotificationsService {
  // todo calculate fetching interval & ttl for them to be seen only once
  private readonly _defaultNotificationTTL = 1_500

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
        // todo log
        return;
      }

      const notificationIndex = this.notifications.indexOf(notificationToClear)

      this.notifications.splice(notificationIndex, 1)
    }, this._defaultNotificationTTL)
  }

}

const notificationsService = new NotificationsService()
export default notificationsService
