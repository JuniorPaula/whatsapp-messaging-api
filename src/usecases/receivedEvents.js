import sock from '../index.js';

export default class ReceivedEvents {
    #sock;

    constructor(sock) {
        this.#sock = sock;
    }

    async on() {
        this.#sock.ev.on('messages.upsert', async  ({ messages }) => {
            const m = messages[0]
            /**
             * Implements logic to handle received messages events
             */
            console.log('received message', m)
        });
    }
}