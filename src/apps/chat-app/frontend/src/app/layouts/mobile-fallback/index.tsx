import React, { memo } from 'react';

import styles from './styles.module.scss';

const MobileFallback = memo(() => {
  return (
    <div className={styles.mobileFallback__overlay}>
      <div className={styles.mobileFallback__container}>
        <h1>Upss! mobile version coming soon</h1>
      </div>
    </div>
  );
});

export default MobileFallback;
