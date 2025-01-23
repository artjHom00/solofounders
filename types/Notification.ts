export enum NotificationTypes {
    NEW_THREAD = 'new thread',
    UPVOTE = 'upvote'
}

export interface EventNotification {
    type: NotificationTypes,
    id: number
}
