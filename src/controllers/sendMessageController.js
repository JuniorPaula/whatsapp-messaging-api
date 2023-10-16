import sock from '../index.js';
import SendMessageUsecase from '../usecases/sendMessageUsecase.js';

export default class SendMessageController {
    async handle(request, response) {
        try {
            const payload = request.body;
            
            const sendMessageUsecase = new SendMessageUsecase(sock);
            await sendMessageUsecase.execute(payload);

            return response.status(200).json({message: 'Message sent!'});
        } catch (error) {
            console.log("ERROR***", error);
            return response.status(500).json({message: 'Error sending message!'});
        }
    }
}