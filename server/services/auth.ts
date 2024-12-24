import { NewUser } from "../database/tables/users"
import { XAuthUser } from "../types/XAuthEvent"
import { tables, useDrizzle } from "../utils/drizzle"

class AuthService {
    async createUserIfNotExists(twitterUser: XAuthUser) {
        const users = await useDrizzle().select().from(tables.users).where(eq(tables.users.twitterId, twitterUser.id))
        console.log("🚀 ~ AuthService ~ getOrCreateUser ~ user:", users)
        if (users.length > 0) return

        const newUser: NewUser = {
            name: twitterUser.name,
            handle: twitterUser.username,
            twitterId: twitterUser.id,
            avatar: twitterUser.profile_image_url
        }

        await useDrizzle().insert(tables.users).values(newUser)

        return
    }
}

const authService = new AuthService()
export default authService