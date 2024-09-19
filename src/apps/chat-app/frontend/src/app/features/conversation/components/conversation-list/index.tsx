import { useCallback } from 'react';
import styles from './styles.module.scss';
import newChatIcon from '/SVG/icn_squares_layers.svg';
import useConversations from '../../hooks/useConversations';
import XIcon from '/SVG/icn_x.svg';
import classNames from 'classnames';
import { useUserSelector } from '@chat-app/features/user/context/selectors/user';
import { useNavigate } from 'react-router-dom';
import Spinner from '@chat-app/components/spinner';
import { RouteName } from '@chat-app/routes/namespaces';
import { formatTimestampShort } from '@chat-app/utils/time';

const ConversationList = () => {
  const {
    conversations,
    currentConversation,
    isGetConversationsLoading,
    actions: { setConversation, createConversation, deleteConversation },
  } = useConversations();
  const user = useUserSelector();
  const navigate = useNavigate();

  const navigateToConversations = useCallback(() => {
    if (window.location.pathname !== RouteName.Routes.CONVERSATIONS) {
      navigate(RouteName.Routes.CONVERSATIONS);
    }
  }, [navigate]);

  const handleConversationClick = useCallback(
    (conversationId: string) => {
      setConversation(conversationId);
      navigateToConversations();
    },
    [setConversation, navigateToConversations],
  );
  const handleNewChatClick = useCallback(() => {
    createConversation(user?.data.sub ?? '');
    navigateToConversations();
  }, [createConversation, user?.data.sub, navigateToConversations]);

  const handleDeleteConversationClick = useCallback(
    (id: string) => {
      deleteConversation(id);
    },
    [deleteConversation],
  );

  const sortedConversations = conversations?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className={styles.conversationList}>
      <button className={styles.conversationList__newChat} type="button" onClick={() => handleNewChatClick()}>
        <img src={newChatIcon} alt="icn" />
        <span>New chat</span>
      </button>
      <div className={styles.conversationList__list}>
        {sortedConversations?.map(item => (
          <button
            className={classNames(styles.conversationList__item, currentConversation === item.id && styles['-active'])}
            key={item.id}
            onClick={() => handleConversationClick(item.id)}
          >
            <span className={styles.conversationList__item__title}>{item.title}</span>
            <span className={styles.conversationList__item__date}>{formatTimestampShort(item.createdAt)}</span>
            <button
              className={classNames(styles.conversationList__item__x)}
              key={item.id}
              onClick={() => handleDeleteConversationClick(item.id)}
            >
              <img src={XIcon} alt="x" />
            </button>
          </button>
        ))}
        {isGetConversationsLoading && (
          <div className={styles.conversationList__spinner}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
