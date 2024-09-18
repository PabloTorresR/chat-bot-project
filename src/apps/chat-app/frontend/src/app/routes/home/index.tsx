import styles from './styles.module.scss';
import ConversationList from '../../features/conversation/components/conversation-list';
import ConversationLanding from '@chat-app/features/conversation/components/conversation-landing';

export const Home = () => {
  return (
    <>
      <div id={styles.contentContainer__conversationList}>
        <ConversationList />
      </div>

      <div id={styles.contentContainer__conversation}>
        <ConversationLanding />
      </div>
    </>
  );
};
