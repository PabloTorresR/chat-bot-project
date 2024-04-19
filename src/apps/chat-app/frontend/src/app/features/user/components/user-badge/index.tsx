import React, { useState } from 'react';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { useAuthActionsSelector } from '../../context/selectors/auth-manager';
import { useUserSelector } from '../../context/selectors/user';
import USER_DEFAULT_AVATAR from '/SVG/icn_3d_person.svg';

export const UserBadge = () => {
  const { authLogout } = useAuthActionsSelector();
  const user = useUserSelector();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    authLogout();
  };

  return (
    <button className={styles.userBadge} tabIndex={0} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
      <span className={styles.userBadge__name}>{user?.data?.preferred_username}</span>
      <img src={USER_DEFAULT_AVATAR} alt="User" className={styles.userBadge__image} />
      {isDropdownOpen && (
        <div className={styles.userBadge__dropdown}>
          <button
            onClick={() => handleLogout()}
            className={classNames(styles.userBadge__dropdown__item, styles['-logout'])}
          >
            Log Out
          </button>
        </div>
      )}
    </button>
  );
};
