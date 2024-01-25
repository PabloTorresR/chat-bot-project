import React from 'react';
import MessageItem from './components/message-item';
import { Message } from '../../types/message';

interface Props {
  messages: Message[];
}

const Conversation = ({ messages }: Props) => {
  return (
    <div className="conversation">
      {messages.map(message => (
        <MessageItem key={message.id} messageSender={message.sender} content={message.content} />
      ))}
    </div>
  );
};

export default Conversation;
