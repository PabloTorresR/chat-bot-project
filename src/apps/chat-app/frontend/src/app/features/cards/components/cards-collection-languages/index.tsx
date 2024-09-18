import styles from './styles.module.scss';
import classNames from 'classnames';
import useCollection from '../../hooks/useCollection';
import { capitalizeFirstLetter } from 'app/utils/format';
import { useEffect } from 'react';

const CardsCollectionLanguages = () => {
  const {
    availableFilterTags: { languageTags },
    filters: { language: languageFilter },
  } = useCollection();

  const handleLanguageFilter = (language: string) => {
    languageFilter.actions.setLanguage(language);
  };

  //NOTE: Set the first language as default
  useEffect(() => {
    if (!languageTags.length) {
      return;
    }
    handleLanguageFilter(languageTags[0]);
  }, [languageTags]);

  return (
    <div className={styles.cardsCollectionLanguages}>
      {languageTags.map(language => (
        <button
          key={language}
          onClick={() => handleLanguageFilter(language)}
          className={classNames(
            styles.cardsCollectionLanguages__button,
            languageFilter.value === language && styles['-isActive'],
          )}
        >
          {capitalizeFirstLetter(language)}
        </button>
      ))}
    </div>
  );
};

export default CardsCollectionLanguages;
