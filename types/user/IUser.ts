import type { IBaseUser } from "./IBaseUser";

export interface IUser extends IBaseUser {
    twitterId: string;
    createdAt: string;
    name?: string;
    email?: string;
};