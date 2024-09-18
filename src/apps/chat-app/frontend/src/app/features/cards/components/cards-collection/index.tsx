import Spinner from '@chat-app/components/spinner';
import useCollection from '../../hooks/useCollection';
import Card from '../card';
import styles from './styles.module.scss';
import { capitalizeFirstLetter } from 'app/utils/format';

export const CardsCollection = () => {
  const { cards, isLoading } = useCollection();
  return (
    <div className={styles.collection}>
      {cards?.map(card => (
        <Card
          key={card.id}
          nativeWord={capitalizeFirstLetter(card.nativeWord)}
          foreignWord={capitalizeFirstLetter(card.word)}
          example={card.examples.example}
          exampleNative={card.examples.nativeExample}
          popularExample={card.examples.movieExample}
          popularExampleNative={card.examples.nativeMovieExample}
          difficulty={card.difficulty}
          className={styles.collection__card}
        />
      ))}
      {isLoading && <Spinner />}
    </div>
  );
};
