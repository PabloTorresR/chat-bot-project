import React, { memo } from 'react';
import { MessageInputBox } from '../../features/conversation/components/message-input-box';
import Conversation from '../../features/conversation/components/conversation';
import { Message } from '../../features/conversation/types/message';
import { MessageSender } from '../../features/conversation/enums/message-sender';

const messages: Message[] = [
  {
    id: '2',
    sender: MessageSender.USER,
    content: 'Hola',
  },
  {
    id: '3',
    sender: MessageSender.BOT,
    content: 'Hola',
  },
  {
    id: '3',
    sender: MessageSender.BOT,
    content: 'Hola',
  },
  {
    id: '3',
    sender: MessageSender.USER,
    content: 'Adios',
  },
];

export const MainLayout = memo(() => {
  return (
    <div id="main-container">
      <MessageInputBox />
      <Conversation messages={messages} />
    </div>
  );
});
