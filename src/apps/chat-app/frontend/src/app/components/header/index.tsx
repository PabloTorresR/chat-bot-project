import React, { memo } from 'react';
import styles from './styles.module.scss';

const Header = memo(() => (
  <header className={styles.header}>
    <h1>Chatero</h1>
  </header>
));
export default Header;
