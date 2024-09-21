import { memo } from 'react';

import styles from './styles.module.scss';
import Button from '@chat-app/components/button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@chat-app/routes/namespaces';

const NoCardsWarning = memo(() => {
  const navigate = useNavigate();
  const handleChatNowClick = () => {
    navigate(RoutePath.Route.CONVERSATIONS);
  };

  return (
    <div className={styles.noCardsWarning}>
      <h2>You don't have any card yet!</h2>
      <p>Chat with Anja to generate new cards</p>
      <Button label="Start chatting" onClick={handleChatNowClick} />
    </div>
  );
});

export default NoCardsWarning;
