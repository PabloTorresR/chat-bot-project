import React, { memo } from 'react';
import styles from './styles.module.scss';
import { UserBadge } from '@chat-app/features/user/components/user-badge';
import LOGO from '@chat-app/assets/logo/banner_asimetric.png';

const Header = memo(() => (
  <header className={styles.header}>
    <div className={styles.header__logo}>
      <img src={LOGO} alt="Logo"></img>
    </div>
    <UserBadge />
  </header>
));
export default Header;
