export enum NotificationTypes {
    UPVOTE = 'upvote'
}

export interface EventNotification {
    type: NotificationTypes,
    id: number
}
