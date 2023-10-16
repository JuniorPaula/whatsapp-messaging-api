import { Router } from 'express';
import SendMessageController from './controllers/sendMessageController.js';

const routes = Router();

const sendMessageController = new SendMessageController();

routes.post('/send-message', sendMessageController.handle);

export default routes;