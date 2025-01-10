import authService from '../../services/auth'
import { XAuthToken, XAuthUser } from '../../types/XAuthEvent'
export default defineOAuthXEventHandler({
  async onSuccess (event, { user, tokens }) {
    user = user as XAuthUser
    tokens = user as XAuthToken

    await setUserSession(event, {
      user: {
        xId: user.id
      }
    })
    await authService.createUserIfNotExists(user)
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError (event, error) {
    console.error('X OAuth error:', error)
    return sendRedirect(event, '/')
  }
})
