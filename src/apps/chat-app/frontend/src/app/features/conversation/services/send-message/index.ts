import axios from 'axios';
import { Message } from '../../types/message';

class SendMessageService {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async sendMessage(message: Message): Promise<void> {
    try {
      await axios.post(this.url, message);
      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }
}

export default SendMessageService;
