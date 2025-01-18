import type { IThread } from "./IThread";

export interface IThreadExtended extends IThread {
    hasUpvoted?: boolean,
    isAuthor: boolean,
}
