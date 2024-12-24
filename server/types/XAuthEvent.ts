export interface XAuthUser {
    id: string,
    description: string,
    username: string,
    verified: boolean,
    verified_type: string
    name?: string,
    profile_image_url?: string,
}

export interface XAuthToken {
    token_type: string,
    expires_in: number,
    access_token: string,
    scope: string,
    refresh_token: string
}