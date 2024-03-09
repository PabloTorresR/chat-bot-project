import React, { useState } from 'react';

import styles from './styles.module.scss';
import classNames from 'classnames';

interface Props {
  image: string;
  label: string;
}

export const UserBadge = ({ image, label }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
  };

  return (
    <button className={styles.userBadge} tabIndex={0} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
      <span className={styles.userBadge__name}>{label}</span>
      <img src={image} alt="User" className={styles.userBadge__image} />
      {isDropdownOpen && (
        <div className={styles.userBadge__dropdown}>
          <button onClick={handleLogout} className={classNames(styles.userBadge__dropdown__item, styles['-logout'])}>
            Log Out
          </button>
        </div>
      )}
    </button>
  );
};
