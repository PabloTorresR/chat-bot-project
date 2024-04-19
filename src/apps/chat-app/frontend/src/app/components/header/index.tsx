import React, { memo } from 'react';
import styles from './styles.module.scss';
import { UserBadge } from '@chat-app/features/user/components/user-badge';

const Header = memo(() => (
  <header className={styles.header}>
    <h1>Chatero</h1>
    <UserBadge />
  </header>
));
export default Header;
