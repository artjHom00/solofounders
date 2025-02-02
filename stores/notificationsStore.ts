import { defineStore } from 'pinia'
import type { EventNotification } from '../types/Notification'
import { TimeConstants } from '../utils/TimeConstants'

const POLLING_INTERVAL = 1 * TimeConstants.MS_IN_SEC

export const useNotificationsStore = defineStore({
  id: 'notificationsStore',
  state: () => ({
    notifications: [] as EventNotification[],
    pollingInterval: null as NodeJS.Timeout | null
  }),
  getters: {
    currentNotifications: state => state.notifications
  },
  actions: {
    async fetchNotifications () {
      try {
        const newNotifications = await $fetch<EventNotification[]>('/api/notifications')
        this.notifications = newNotifications
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
      }
    },
    startPolling () {
      if (this.pollingInterval !== null) {
        return
      }
      this.pollingInterval = setInterval(async () => {
        await this.fetchNotifications()
      }, POLLING_INTERVAL)
    },
    stopPolling () {
      if (this.pollingInterval !== null) {
        clearInterval(this.pollingInterval)
        this.pollingInterval = null
      }
    }
  }
})
