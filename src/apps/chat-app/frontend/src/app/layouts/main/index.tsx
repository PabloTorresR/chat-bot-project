import { MessageInputBox } from '../../features/conversation/components/message-input-box';
import Conversation from '../../features/conversation/components/conversation';

import styles from './styles.module.scss';
import Header from '../../components/header';
import ConversationList from '../../features/conversation/components/conversation-list';
import useConversations from '../../features/conversation/hooks/useConversations';
import { PageList } from '@chat-app/features/pages/components/page-list';
import ConversationLanding from '@chat-app/features/conversation/components/conversation-landing';
import { useIsSidebarExpandedSelector } from '@chat-app/context/ui/selectors';
import { useCallback } from 'react';
import ExpandButton from '@chat-app/components/expand-button';

export const MainLayout = () => {
  const { currentConversation } = useConversations();
  const isSidebarExpanded = useIsSidebarExpandedSelector();

  const handleExpandSidebar = useCallback(
    () => isSidebarExpanded?.actions.toggleIsSidebarExpanded(),
    [isSidebarExpanded?.actions],
  );

  return (
    <div id={styles.mainContainer}>
      <div id={styles.header}>
        <Header />
      </div>
      <div id={styles.leftPane}>
        <PageList />
        <ExpandButton
          className={styles.leftPane__expandButton}
          onClick={handleExpandSidebar}
          isExpanded={isSidebarExpanded?.value ?? true}
        />
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
