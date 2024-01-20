import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../types/message';

class SendMessageService {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async sendMessage(message: string): Promise<void> {
    const messageDto = this._buildMessage(message);
    try {
      await axios.post(this.url, messageDto);
      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  private _buildMessage(message: string): Message {
    const messageId = uuidv4();
    return {
      id: messageId,
      content: message,
    };
  }
}

export default SendMessageService;
