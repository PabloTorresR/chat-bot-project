import { MessageInputBox } from '../../features/conversation/components/message-input-box';
import Conversation from '../../features/conversation/components/conversation';

import styles from './styles.module.scss';
import Header from '../../components/header';
import ConversationList from '../../features/conversation/components/conversation-list';

export const MainLayout = () => {
  return (
    <div id={styles.mainContainer}>
      <div id={styles.header}>
        <Header />
      </div>
      <div id={styles.leftPane}></div>
      <div id={styles.contentContainer}>
        <ConversationList />
        <div id={styles.contentContainer__conversation}>
          <Conversation />
          <MessageInputBox />
        </div>
      </div>
    </div>
  );
};
