import express from 'express';
import connect from './connect.js';

const app = express();
app.use (express.json());

const sock = await connect();

const receivedEvents = (sock) => {
    sock.ev.on('messages.upsert', async  ({ messages }) => {
        const m = messages[0]
        console.log('received message', m)
    });
}

const sendTextMessage = async (body) => {
    const { number, message } = body;
    const socketConn = await connect();
    await socketConn.sendMessage(number, { text: message });
}

app.post('/send-message', async (req, res) => {
    await sendTextMessage(req.body);
});

app.get('/', (req, res) => {
    res.send('API from Whatsapp!');    
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);