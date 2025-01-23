import type { IBaseUser } from './IBaseUser'

export interface IUser extends IBaseUser {
    twitterId: string;
    createdAt: string | Date;
    name?: string;
    email?: string;
};
