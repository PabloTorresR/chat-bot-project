import Modal from 'react-modal';
import styles from './styles.module.scss';
import { CardsCarousell } from '../cards-carousell';
import useConversationVocabulary from '@chat-app/features/conversation/hooks/useConversationVocabulary';
import { capitalizeFirstLetter } from 'app/utils/format';
import XIcon from '/SVG/icn_x.svg';
import { useCallback } from 'react';
import { useBannerSelector } from '@chat-app/context/ui/selectors';
import { NotificationBannerType } from '@chat-app/components/notification-banner/components/primitive-banner';
import { LlmWord } from '../../types/vocabulary';

const ConversationCardsModal = () => {
  const { vocabulary, actions, modal } = useConversationVocabulary();
  const banner = useBannerSelector();

  const handleAddCardToCollection = useCallback(
    (word: LlmWord) => {
      actions.addCardToCollection(word);
      banner?.setValue({ content: `Card ${word.word} added to collection`, type: NotificationBannerType.CONFIRMATION });
    },
    [actions, banner],
  );

  if (!modal.isOpen || !vocabulary?.words.length) {
    return null;
  }

  return (
    <Modal overlayClassName={styles.modal__overlay} isOpen={modal.isOpen} className={styles.modal__innerContainer}>
      <img src={XIcon} className={styles.modal__closeIcon} onClick={modal.close} />
      <div className={styles.modal__title}>
        Add to collection words about <span>{vocabulary.topics.join(', ')}</span>
      </div>
      <div className={styles.modal__subTitle}>
        Keep growing your collection of <span>{capitalizeFirstLetter(vocabulary.language)}</span> flashcards!
      </div>
      <CardsCarousell
        vocabulary={vocabulary}
        onAddClick={handleAddCardToCollection}
        onDeleteClick={actions.discardCard}
      />
    </Modal>
  );
};

export default ConversationCardsModal;
