

export default async function sendMessage(sock, payload) {
    const { phone, message, type } = payload;
    const jid = parsePhoneNumberToWhatsappFormat(phone);

    const haveWhatsapp = await sock.onWhatsApp(jid);

    if (!jid.includes('@g.us') && (!haveWhatsapp || !haveWhatsapp.length || !haveWhatsapp[0].exists)) {
        throw new Error('Phone number does not have whatsapp!');
    }

    if (type === 'text') {
        await sendText(sock, jid, message);
    }
    if (type === 'button') {
        const { buttons, footer } = payload;
        await sendButton(sock, jid, message, buttons, footer);
    }
    if (type === 'image') {
        const { image } = payload;
        await sendImage(sock, jid, message, image);
    }
}

async function sendText(sock, jid, message) {
    return sock.sendMessage(jid, { text: message });
}

async function sendImage(sock, jid, message, image) {
    const imageMessage = { 
        image: { url: image }, 
        caption: message,
    }

    await sock.sendMessage(jid, imageMessage);
}

async function sendButton(sock, jid, message, buttons, footer) {
    const buttonMessage = {
        text: message,
        footer,
        buttons,
        headerType: 1,
    }
    await sock.sendMessage(jid, buttonMessage);
}

function parsePhoneNumberToWhatsappFormat(phone) {
    if (phone.length === 18 || phone.includes('-')) {
        return `${phone}@g.us`;
    }

    if (phone.includes('@g.us')) {
        return phone;
    }

    return !phone.includes('@s.whatsapp.net') ? `${phone}@s.whatsapp.net` : phone;
}  