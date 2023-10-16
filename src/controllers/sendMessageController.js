import sock from '../index.js';
import sendMessage from '../send-message.js';

export default class SendMessageController {
    async handle(request, response) {
        try {
            const payload = request.body;
            await sendMessage(sock, payload);

            return response.status(200).json({message: 'Message sent!'});
        } catch (error) {
            console.log("ERROR***", error);
            return response.status(500).json({message: 'Error sending message!'});
        }
    }
}