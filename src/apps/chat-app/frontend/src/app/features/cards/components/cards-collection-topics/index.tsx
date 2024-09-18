import styles from './styles.module.scss';
import classNames from 'classnames';
import useCollection from '../../hooks/useCollection';
import filerIcon from '/SVG/icn_squares_wasd.svg';
const CardsCollectionTopics = () => {
  const {
    availableFilterTags: { topicTags },
    filters: { topics: topicsFilter },
  } = useCollection();

  const handleTopicFilter = (topic: string) => {
    topicsFilter.actions.toggleTopic(topic);
  };

  return (
    <div className={styles.cardsCollectionTopics}>
      <h2 className={styles.cardsCollectionTopics__title}>
        <img src={filerIcon} alt="filter icon" />
        <h3>Topics</h3>
      </h2>
      <div className={styles.cardsCollectionTopics__topics}>
        {topicTags?.map(topic => (
          <button
            key={topic}
            onClick={() => handleTopicFilter(topic)}
            className={classNames(
              styles.cardsCollectionTopics__topics__elem,
              topicsFilter.value.has(topic) && styles['-isActive'],
            )}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardsCollectionTopics;
