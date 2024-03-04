import React, { memo } from 'react';
import styles from './styles.module.scss';
import { UserBadge } from '@chat-app/features/user/components/user-badge';

const FAKE_IMAGE = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
const FAKE_USER = 'Paco Gutierrez';

const Header = memo(() => (
  <header className={styles.header}>
    <h1>Chatero</h1>
    <UserBadge image={FAKE_IMAGE} label={FAKE_USER} />
  </header>
));
export default Header;
