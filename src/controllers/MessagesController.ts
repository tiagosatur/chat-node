import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController {
  async create(request: Request, response: Response) {
    const { admin_id, user_id, text } = request.body;
    const messagesService = new MessagesService();
    try {
      const message = await messagesService.create({
        admin_id,
        text,
        user_id,
      });

      return response.json(message);
    } catch (error) {
      return response.status(404).json({
        message: error.message,
      });
    }
  }

  async listByUser(request: Request, response: Response) {
    const { user_id } = request.params;

    const messagesService = new MessagesService();

    const list = await messagesService.listByUser(user_id);

    return response.json(list);
  }
}

export { MessagesController };
