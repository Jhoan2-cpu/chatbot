import { Router } from 'express';
import { ChatController } from '../controllers/chatController';

export function createChatRouter(chatController: ChatController): Router {
  const router = Router();

  router.post('/chat', (req, res) => chatController.handleChat(req, res));

  return router;
}
