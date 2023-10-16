export default class SendMessageUsecase {
    #sock;
    #messageTypes;

    constructor(sock) {
        this.#sock = sock;
        this.#messageTypes = {
            text: this.#sendText,
            button: this.#sendButton,
            image: this.#sendImage,
            video: this.#sendVideo,
            list: this.#sendList,
        };
    }

    async execute(payload) {
        const { phone, message, type } = payload;

        const jid = this.#parsePhoneNumberToWhatsappFormat(phone);

        const haveWhatsapp = await this.#sock.onWhatsApp(jid);

        if (!jid.includes('@g.us') && (!haveWhatsapp || !haveWhatsapp.length || !haveWhatsapp[0].exists)) {
            throw new Error('Phone number does not have WhatsApp!');
        }

        const messageTypeFunction = this.#messageTypes[type];

        if (!messageTypeFunction) {
            throw new Error('Invalid message type');
        }

        await messageTypeFunction.call(this, jid, message, payload);
    }

    async #sendText(jid, message) {
        return this.#sock.sendMessage(jid, { text: message });
    }
    
    async #sendVideo(jid, message, payload) {
        const videoMessage = {
            video: { url: payload.video },
            caption: message,
        }
    
        await this.#sock.sendMessage(jid, videoMessage);
    }
    
    async #sendImage(jid, message, payload) {
        const imageMessage = {
            image: { url: payload.image },
            caption: message,
        }
    
        await this.#sock.sendMessage(jid, imageMessage);
    }
    
    async #sendButton(jid, message, payload) {
        const { buttons, footer } = payload;
        const buttonMessage = {
            text: message,
            footer,
            buttons,
            headerType: 1,
        }
        await this.#sock.sendMessage(jid, buttonMessage);
    }
    
    async #sendList(jid, message, payload) {
        const { sections, footer, buttonText, title } = payload;
        const listMessage = {
            text: message,
            footer,
            title,
            buttonText,
            sections
        }
    
        await this.#sock.sendMessage(jid, listMessage);
    }

    #parsePhoneNumberToWhatsappFormat(phone) {
        if (phone.length === 18 || phone.includes('-')) {
            return `${phone}@g.us`;
        }

        if (phone.includes('@g.us')) {
            return phone;
        }

        return !phone.includes('@s.whatsapp.net') ? `${phone}@s.whatsapp.net` : phone;
    }
}
