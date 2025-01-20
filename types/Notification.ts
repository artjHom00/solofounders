export interface EventNotification {
    type: NotificationTypes,
    id: number
}

export enum NotificationTypes {
    UPVOTE = 'upvote'
}