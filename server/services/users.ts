import { tables, useDrizzle } from '../utils/drizzle'
import { ErrorsTemplates } from '~/utils/ErrorsTemplates'

class UserService {
  async getOrThrowUserByXId (XId: string) {
    const user = await useDrizzle().query.users.findFirst({ where: eq(tables.users.twitterId, XId) })
    if (user == null) { throw new Error(ErrorsTemplates.USER_NOT_FOUND) }

    return user
  }
}

const userService = new UserService()
export default userService
