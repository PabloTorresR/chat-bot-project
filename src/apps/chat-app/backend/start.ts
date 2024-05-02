import { ChatBackendApp } from './chat-backend-app';
import dotenv from 'dotenv';
dotenv.config();

try {
  new ChatBackendApp().start();
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
  process.exit(1);
});
