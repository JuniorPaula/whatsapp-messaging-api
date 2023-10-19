import { downloadMediaMessage, extractMessageContent, getContentType } from '@whiskeysockets/baileys'
import { promisify } from 'node:util';
import { Transform, pipeline } from 'node:stream';
import { createWriteStream } from 'fs';
import { randomUUID } from 'node:crypto';


const pipelineAsync = promisify(pipeline)

export default class ReceivedMediaMessageUsecase {
    async execute(message) {
        const mContent = extractMessageContent(message.message)
        if (!mContent) {
            throw new Error('no message content')
        }

        const contentType = getContentType(mContent)

        // imageMessage | videoMessage | audioMessage | stickerMessage | documentMessage
        const media = mContent[contentType]

        const stream = await downloadMediaMessage(message, 'stream', {})

        let contentLength = 0
    
        const transform = Transform({
            transform(chunk, _, cb) {
                contentLength += chunk.length
                // 100MB
                if (contentLength > 100 * 1024 * 1024) {
                    cb(new Error('file is too big'), null)
                    return
                }
    
                cb(null, chunk)
            }
        })
    
        const fileExtesion = media.mimetype.split('/')[1]
        const filename = `./tmp/${randomUUID()}.${fileExtesion}`
    
        const fileStream = createWriteStream(filename)
    
        try {
            await pipelineAsync(
                stream,
                transform,
                fileStream
            )    
        } catch (error) {
            console.log('error***', error)
        }
    }
}