import { NewUser } from '../database/tables/users'
import { XAuthUser } from '../../types/XAuthEvent'
import { tables, useDrizzle } from '../utils/drizzle'
import { put } from '@vercel/blob';
import userService from './users';

interface MultiPartData {
    data: Buffer;
    name?: string;
    filename?: string;
    type?: string;
}

class FileService {
    private readonly MAX_FILE_SIZE = 5 * 1024 * 1024;  // 20MB in bytes
    private readonly IMAGE_UPLOAD_ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];

    async upload(xId: string, files: MultiPartData[]) {
        const user = await userService.getOrThrowUserByXId(xId);
        const urls: string[] = []

        const uploadTimestamp = Date.now()

        for (const file of files) {
            const fileSize = file.data.byteLength

            if (fileSize > this.MAX_FILE_SIZE) {
                throw new Error('File size exceeds the 20MB limit');
            }

            if (!this.isFileFormatAllowed(file)) {
                throw new Error('Invalid file format. Only JPG, JPEG, and PNG are allowed.');
            }

            const blob = await put(`${user.handle}/${uploadTimestamp}_${file.filename}`, file.data, {
                access: 'public',
            });

            urls.push(blob.url)
        }

        return urls
    }

    private isFileFormatAllowed(file: MultiPartData) {
        return file.type != null && this.IMAGE_UPLOAD_ALLOWED_FORMATS.includes(file.type.toLowerCase())
    }
}

const fileService = new FileService()
export default fileService
