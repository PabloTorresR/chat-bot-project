import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './overrides.css';
import styles from './styles.module.scss';
import LLMSvg from '/SVG/icn_brain_digital.svg';
import BubbleSvg from '/SVG/icn_speech_bubbles.svg';
import AgentsSvg from '/SVG/icn_person_group.svg';
import CollectionSvg from '/SVG/icn_rectangles_data.svg';
import GlobeSvg from '/SVG/icn_globe_digital_physical.svg';

import classNames from 'classnames';

export const FeaturesCarousell = () => (
  <div className={styles.featuresCarousel}>
    <Swiper
      centeredSlides
      slidesPerView={2}
      scrollbar={{ draggable: true }}
      navigation={true}
      mousewheel={true}
      modules={[Mousewheel, Navigation]}
      className={'mySwiper'}
    >
      <SwiperSlide>
        <div className={classNames(styles.featuresCarousel__item, styles['-red'])} key={'llm'}>
          <img src={AgentsSvg} alt={'llm'} />
          <p>
            Language model Multi-agent based <strong>vocabulary generator</strong>
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={classNames(styles.featuresCarousel__item, styles['-blue'])} key={'language'}>
          <img src={LLMSvg} alt={'llm'} />
          <p>
            Powered by the most powerful <strong>LLMs</strong>, GPT-4o & GPT-4o-mini
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={classNames(styles.featuresCarousel__item, styles['-yellow'])} key={'examples'}>
          <img src={GlobeSvg} alt={'llm'} />
          <p>Any language support</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={classNames(styles.featuresCarousel__item, styles['-purple'])} key={'examples'}>
          <img src={BubbleSvg} alt={'llm'} />
          <p>
            Get <strong>examples</strong> of words being used in popular culture
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={classNames(styles.featuresCarousel__item, styles['-darkPurple'])} key={'examples'}>
          <img src={CollectionSvg} alt={'llm'} />
          <p>
            Build your <strong>collection of flashcards</strong> and explore it in "Collection" tab
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
);
