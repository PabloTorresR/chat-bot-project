import React, { memo } from 'react';

import styles from './styles.module.scss';

const MobileFallback = memo(() => {
  return (
    <div className={styles.mobileFallback__overlay}>
      <div className={styles.mobileFallback__container}>
        <h1>Upsss! mobile version coming soon</h1>
        <h2>Please, try again with device with bigger screen</h2>
      </div>
    </div>
  );
});

export default MobileFallback;
