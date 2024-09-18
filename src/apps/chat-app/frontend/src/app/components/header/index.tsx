import React, { memo } from 'react';
import styles from './styles.module.scss';
import { UserBadge } from '@chat-app/features/user/components/user-badge';
import LOGO from '@chat-app/assets/logo/banner_asimetric.png';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '@chat-app/routes/namespaces';

const Header = memo(() => {
  const navigate = useNavigate();
  const handleLogoClick = () => navigate(RouteName.Routes.HOME);

  return (
    <header className={styles.header}>
      <button className={styles.header__logo} onClick={handleLogoClick}>
        <img src={LOGO} alt="Logo" />
      </button>
      <UserBadge />
    </header>
  );
});
export default Header;
