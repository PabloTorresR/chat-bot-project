import React, { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

export const PageList = () => {
    const [isExtended, setIsExtended] = useState(true);

    const togglePanel = () => {
        setIsExtended(!isExtended);
    };

    return (
        <div className={classNames(styles.pageList, isExtended && ['-extended'])}>
            <button className={styles.pageList__toggleButton} onClick={togglePanel} type="button">
                {isExtended ? 'Shrink' : 'Extend'}
            </button>
            <div className={styles.pageList__toggleButton}>
                <div className={styles.pageList__elem}>Conversations</div>
                <div className={styles.pageList__elem}>Words</div>
                <div className={styles.pageList__elem}>Settings</div>
            </div>
        </div>
    );
};
