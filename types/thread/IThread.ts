import type { IBaseUser } from "../user/IBaseUser";
import type { IBaseThread } from "./IBaseThread";

export interface IThread extends IBaseThread {
    user: IBaseUser
}
