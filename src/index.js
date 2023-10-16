import express from 'express';
import connect from './connect.js';
import sendMessage from './send-message.js';

const app = express();
app.use (express.json());

const sock = await connect();

const receivedEvents = (sock) => {
    sock.ev.on('messages.upsert', async  ({ messages }) => {
        const m = messages[0]
        console.log('received message', m)
    });
}


app.post('/send-message', async (req, res) => {
    const payload = req.body;

    try {
        await sendMessage(sock, payload);
        return res.status(200).json({message: 'Message sent!'});
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({message: 'Error sending message!'});
    }
});

app.get('/', (req, res) => {
    res.send('API from Whatsapp!');    
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);