import React, { memo } from 'react';
import { MessageInputBox } from '../../features/conversation/components/message-input-box';

export const MainLayout = memo(() => {
  return (
    <div id="main-container">
      <MessageInputBox />
    </div>
  );
});
