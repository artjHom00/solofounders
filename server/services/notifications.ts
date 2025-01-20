import { randomInt } from 'crypto'
import { desc } from 'drizzle-orm'
import { tables, useDrizzle } from '../utils/drizzle'
import { ErrorsTemplates } from '~/utils/ErrorsTemplates'
import { EventNotification, NotificationTypes } from '../../types/Notification'

class NotificationsService {

  public notifications: EventNotification[] = []

  async pushNotification (type: NotificationTypes, id: number) {
    this.notifications.push({
        type: type,
        id: id,
    })
  }

  async clearNotifications() {
    this.notifications = []
  }
}

const notificationsService = new NotificationsService()
export default notificationsService
