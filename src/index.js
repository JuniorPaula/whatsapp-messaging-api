import 'dotenv/config';
import express from 'express';
import connect from './connect.js';
import routes from './routes.js';
import ReceivedEvents from './usecases/receivedEvents.js';

const app = express();
app.use (express.json());

const sock = await connect();

new ReceivedEvents(sock).on();

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);

export default sock;