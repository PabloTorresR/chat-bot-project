import React from 'react';
import ReactCardFlip from 'react-card-flip';

import styles from './styles.module.scss';
import { useToggle } from 'react-use';
import classNames from 'classnames';
import { rarityLevel } from '../../enums';

interface Props {
  foreignWord: string;
  nativeWord: string;
  example?: string;
  exampleNative?: string;
  popularExample?: string;
  popularExampleNative?: string;
  difficulty?: number;
  className?: string;
}

const Card: React.FC<Props> = ({
  foreignWord,
  nativeWord,
  example,
  exampleNative,
  popularExample,
  popularExampleNative,
  difficulty,
  className,
}) => {
  const [isFlipped, flip] = useToggle(false);

  const handleCardClick = () => {
    flip();
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div
        className={classNames(styles.flashcard, !!difficulty && styles[`-${rarityLevel[difficulty]}`], className)}
        onClick={handleCardClick}
      >
        <div className={styles.flashcard__word}>{foreignWord}</div>
        <div className={styles.flashcard__content} key={'front'}>
          <div className={styles.flashcard__example}>{example}</div>
          <div className={styles.flashcard__popularExample}>{popularExample}</div>
        </div>
        <div className={styles.flashcard__rarity}>{rarityLevel[difficulty ?? 1]}</div>
      </div>
      <div
        className={classNames(
          styles.flashcard,
          styles['-isBack'],
          !!difficulty && styles[`-${rarityLevel[difficulty]}`],
          className,
        )}
        onClick={handleCardClick}
      >
        <div className={styles.flashcard__word}>{nativeWord}</div>
        <div className={styles.flashcard__content} key={'back'}>
          <div className={styles.flashcard__example}>{exampleNative}</div>
          <div className={styles.flashcard__popularExample}>{popularExampleNative}</div>
          <div className={styles.flashcard__rarity}>{rarityLevel[difficulty ?? 1]}</div>
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default Card;
