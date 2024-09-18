import styles from './styles.module.scss';
import classNames from 'classnames';
import { rarityLevel } from '../../enums';
import useCollection from '../../hooks/useCollection';

const CardsCollectionRarities = () => {
  const {
    filters: { difficulties },
  } = useCollection();

  const handleRarityFilter = (rarity: number) => {
    difficulties.actions.toggleDifficulty(rarity);
  };

  return (
    <div className={styles.cardsCollectionRarities}>
      {Object.entries(rarityLevel).map(([key, value]) => (
        <button
          key={key}
          onClick={() => handleRarityFilter(Number(key))}
          className={classNames(
            styles.cardsCollectionRarities__button,
            styles[`-${value}`],
            difficulties.value.has(Number(key)) && styles['-isActive'],
          )}
        >
          {value[0]}
        </button>
      ))}
    </div>
  );
};

export default CardsCollectionRarities;
