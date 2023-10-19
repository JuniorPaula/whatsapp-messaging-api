import ReceivedMediaMessageUsecase from './receivedMediaMessageUsecase.js';


export default class ReceivedEvents {
    #sock;

    constructor(sock) {
        this.#sock = sock;
    }

    async on() {
        this.#sock.ev.on('messages.upsert', async  ({ messages }) => {
            const m = messages[0]
            if (!m.message) {
                return
            }
            const messageType = Object.keys(m.message)[0]
            if (messageType !== 'conversation') {
                const receivedMediaMessage = new ReceivedMediaMessageUsecase();
                await receivedMediaMessage.execute(m)
                return
            }

            /**
             * @todo
             * implementar o caso de mensagem de texto
             */
        });
    }
}