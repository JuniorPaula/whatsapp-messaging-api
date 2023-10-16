import express from 'express';
import connect from './connect.js';
import routes from './routes.js';

const app = express();
app.use (express.json());

const sock = await connect();

const receivedEvents = (sock) => {
    sock.ev.on('messages.upsert', async  ({ messages }) => {
        const m = messages[0]
        console.log('received message', m)
    });
}

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);

export default sock