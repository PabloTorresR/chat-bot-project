import { MessageInputBox } from '../../features/conversation/components/message-input-box';
import Conversation from '../../features/conversation/components/conversation';

import styles from './styles.module.scss';
import Header from '../../components/header';
import ConversationList from '../../features/conversation/components/conversation-list';
import useConversations from '../../features/conversation/hooks/useConversations';
import ConversationLanding from '@chat-app/features/conversation/components/conversation-landing';
import { PageList } from '@chat-app/features/pages/components';

export const MainLayout = () => {
  const { currentConversation } = useConversations();
  return (
    <div id={styles.mainContainer}>
      <div id={styles.header}>
        <Header />
      </div>
      <div id={styles.leftPane}>
        <PageList />
      </div>
      <div id={styles.contentContainer}>
        <ConversationList />
        <div id={styles.contentContainer__conversation}>
          {currentConversation ? (
            <>
              <Conversation />
              <MessageInputBox />
            </>
          ) : (
            <ConversationLanding />
          )}
        </div>
      </div>
    </div>
  );
};
