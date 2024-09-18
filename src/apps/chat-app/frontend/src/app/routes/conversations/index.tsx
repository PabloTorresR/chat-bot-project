import { MessageInputBox } from '../../features/conversation/components/message-input-box';
import Conversation from '../../features/conversation/components/conversation';

import styles from './styles.module.scss';
import ConversationList from '../../features/conversation/components/conversation-list';
import ConversationCardsModal from '@chat-app/features/cards/components/cards-modal';

const ConversationsRoute = () => {
  return (
    <>
      <ConversationCardsModal />
      <ConversationList />
      <div id={styles.contentContainer__conversation}>
        <Conversation />
        <MessageInputBox />
      </div>
    </>
  );
};

export default ConversationsRoute;
