import axios from 'axios';
import { Message } from '../../types/message';

class SendMessagesService {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async sendMessage(message: Message): Promise<void> {
    try {
      await axios.post(this.url, message);
    } catch (error) {
      console.error('Failed to send message');
    }
  }
}

export default SendMessagesService;
