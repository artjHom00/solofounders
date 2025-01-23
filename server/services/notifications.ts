import { EventNotification, NotificationTypes } from '../../types/Notification'
import { TimeConstants } from '~/utils/TimeConstants'

class NotificationsService {
  // todo calculate fetching interval & ttl for them to be seen only once
  private readonly _defaultNotificationTTL = 1_500

  constructor () {}

  public notifications: EventNotification[] = []

  async pushNotification (type: NotificationTypes, id: number) {
    const newNotificationsLength = this.notifications.push({
      type,
      id
    })

    this.clearNotificationAfterTimeout(newNotificationsLength - 1)
  }

  private clearNotificationAfterTimeout(index: number) {
    setTimeout(() => {
      this.notifications.splice(index, 1)
    }, this._defaultNotificationTTL)
  }

}

const notificationsService = new NotificationsService()
export default notificationsService
