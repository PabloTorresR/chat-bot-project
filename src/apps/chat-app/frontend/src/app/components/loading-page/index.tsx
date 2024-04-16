import React, { memo } from 'react';

import styles from './styles.module.scss';

export const LoadingPage = memo(() => (
  <div className={styles.loadingPage__container}>
    <div className={styles.loadingPage__backgroundImage} />
    <div className={styles.loadingPage__spinner}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
));
