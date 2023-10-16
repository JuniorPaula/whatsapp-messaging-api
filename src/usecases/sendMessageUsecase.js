export default class SendMessageUsecase {
    #sock;

    constructor(sock) {
        this.#sock = sock;
    }

    async execute(payload) {
        const { phone, message, type } = payload;

        const jid = this.#parsePhoneNumberToWhatsappFormat(phone);

        const haveWhatsapp = await this.#sock.onWhatsApp(jid);

        if (!jid.includes('@g.us') && (!haveWhatsapp || !haveWhatsapp.length || !haveWhatsapp[0].exists)) {
            throw new Error('Phone number does not have whatsapp!');
        }

        if (type === 'text') {
            await this.#sendText(jid, message);
        }
        if (type === 'button') {
            const { buttons, footer } = payload;
            await this.#sendButton(jid, message, buttons, footer);
        }
        if (type === 'image') {
            const { image } = payload;
            await this.#sendImage(jid, message, image);
        }
        if (type === 'video') {
            const { video } = payload;
            await this.#sendVideo(jid, message, video);
        }
        if (type === 'list') {
            const { sections, footer, buttonText, title } = payload;
            await this.#sendList(jid, message, sections, footer, buttonText, title);
        }
    }

    async #sendText(jid, message) {
        return this.#sock.sendMessage(jid, { text: message });
    }
    
    async #sendVideo(jid, message, video) {
        const videoMessage = {
            video: { url: video },
            caption: message,
        }
    
        await this.#sock.sendMessage(jid, videoMessage);
    }
    
    async #sendImage(jid, message, image) {
        const imageMessage = {
            image: { url: image },
            caption: message,
        }
    
        await this.#sock.sendMessage(jid, imageMessage);
    }
    
    async #sendButton(jid, message, buttons, footer) {
        const buttonMessage = {
            text: message,
            footer,
            buttons,
            headerType: 1,
        }
        await this.#sock.sendMessage(jid, buttonMessage);
    }
    
    async #sendList(jid, message, sections, footer, buttonText, title) {
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