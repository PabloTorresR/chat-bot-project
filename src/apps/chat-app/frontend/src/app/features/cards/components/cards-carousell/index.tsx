import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

import Card from '../card';
import './overrides.css';
import styles from './styles.module.scss';
import { LlmVocabulary, LlmWord } from '@chat-app/features/cards/types/vocabulary';
import Button from '@chat-app/components/button';
import XIcon from '/SVG/icn_x.svg';
import TickIcon from '/SVG/icn_tick.svg';
import { useCallback } from 'react';
import { capitalizeFirstLetter } from 'app/utils/format';
interface Props {
  vocabulary: LlmVocabulary;
  onAddClick: (word: LlmWord) => void;
  onDeleteClick: (word: LlmWord) => void;
}

export const CardsCarousell = ({ vocabulary, onAddClick, onDeleteClick }: Props) => {
  const handleDeleteClick = useCallback(
    (word: LlmWord) => () => {
      onDeleteClick(word);
    },
    [onDeleteClick],
  );
  const handleAddClick = useCallback(
    (word: LlmWord) => () => {
      onAddClick(word);
    },
    [onAddClick],
  );

  return (
    <Swiper
      centeredSlides
      slidesPerView={5}
      spaceBetween={10}
      grabCursor={true}
      scrollbar={{ draggable: true }}
      pagination={{
        clickable: true,
      }}
      mousewheel={true}
      modules={[Pagination, Mousewheel]}
      className={'mySwiper'}
    >
      {vocabulary.words.map(word => (
        <SwiperSlide key={word.word}>
          <div className={styles.carousel__slide}>
            <Card
              foreignWord={capitalizeFirstLetter(word.word)}
              nativeWord={capitalizeFirstLetter(word.nativeWord)}
              example={word.examples.example}
              exampleNative={word.examples.nativeExample}
              popularExample={word.examples.movieExample}
              popularExampleNative={word.examples.nativeMovieExample}
              difficulty={word.difficulty}
            />
            <div className={styles.carousel__slide__buttons}>
              <Button
                onClick={handleAddClick(word)}
                className={styles.carousel__slide__buttons__tick}
                label={<img src={TickIcon} />}
              />
              <Button
                onClick={handleDeleteClick(word)}
                className={styles.carousel__slide__buttons__x}
                label={<img src={XIcon} />}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
