import { CardsCollection } from '@chat-app/features/cards/components/cards-collection';
import styles from './styles.module.scss';
import CardsCollectionLanguages from '@chat-app/features/cards/components/cards-collection-languages';
import CardsCollectionTopics from '@chat-app/features/cards/components/cards-collection-topics';
import { CardsCollectionSearchBar } from '@chat-app/features/cards/components/cards-collection-search-bar';
import CardsCollectionRarities from '@chat-app/features/cards/components/cards-collection-rarities';

const CollectionRoute = () => {
  return (
    <div className={styles.collection}>
      <div className={styles.collection__top}>
        <CardsCollectionLanguages />
      </div>
      <div className={styles.collection__content}>
        <CardsCollection />
      </div>
      <div className={styles.collection__bottom}>
        <CardsCollectionSearchBar />
        <CardsCollectionRarities />
      </div>
      <div className={styles.collection__rightBar}>
        <CardsCollectionTopics />
      </div>
    </div>
  );
};

export default CollectionRoute;
