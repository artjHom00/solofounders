import { SessionUser } from "~/types/SessionUser";
import { ErrorsTemplates } from "~/utils/ErrorsTemplates";
import fileService from "../../services/files";

export default defineEventHandler(async (event) => {
    try {

        const session = await getUserSession(event)

        if (session.user == null) {
          throw new Error(ErrorsTemplates.NOT_AUTHORIZED)
        }
    
        const user = session.user as SessionUser
    
        let files = await readMultipartFormData(event)
        if (files == null || files.length === 0) {
            throw new Error('NO_FILES_UPLOADED')
        }
    
        const urls = await fileService.upload(user.xId, files)
        return urls

    } catch (e) {
        return e
    }
})
