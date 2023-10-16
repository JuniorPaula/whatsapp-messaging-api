import { useMultiFileAuthState, makeWASocket, DisconnectReason } from '@whiskeysockets/baileys';

const PATH_AUTH_CREDS = './auth_info';

export default async  function connect () {
    const { state, saveCreds} = await useMultiFileAuthState(PATH_AUTH_CREDS);

    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: {
            creds: state.creds,
            keys: state.keys,
        }
    });

    sock.ev.on('connection.update', (update) => {
        console.log('connection update', update)

        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            if(shouldReconnect) {
                connect()
            }
        } else if(connection === 'open') {
            console.log('opened connection')
        }
    
    })

    sock.ev.on('creds.update', (update) => {
        saveCreds()
        console.log('auth state updated', update)
    });

    return sock;
}