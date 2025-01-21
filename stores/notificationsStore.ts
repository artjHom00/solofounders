import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EventNotification } from '../types/Notification'
import { TimeConstants } from '../utils/TimeConstants';

const POLLING_INTERVAL = 0.5 * TimeConstants.MS_IN_SEC; // Set the polling interval (e.g., 5000ms for 5 seconds)

export const useNotificationsStore = defineStore({
  id: 'notificationsStore',
  state: () => ({
    notifications: [] as EventNotification[],
    pollingInterval: null as NodeJS.Timeout | null, // To store the interval ID
  }),
  getters: {
    currentNotifications: (state) => state.notifications, // Renamed to avoid conflict with the state property
  },
  actions: {
    async fetchNotifications() {
      try {
        const newNotifications = await $fetch<EventNotification[]>(`/api/notifications`);
        this.notifications = newNotifications;
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    },
    startPolling() {
      if (this.pollingInterval !== null) {
        return;
      }
      console.log("aosjdpaosjdps")
      this.pollingInterval = setInterval(async () => {
        await this.fetchNotifications();
      }, POLLING_INTERVAL);
    },
    stopPolling() {
      if (this.pollingInterval !== null) {
        clearInterval(this.pollingInterval);
        this.pollingInterval = null;
      }
    },
  },
});