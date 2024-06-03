import React from 'react';
import styles from './styles.module.scss';
import ARROW_ICON from '/SVG/icn_arrow_right.svg';
import classNames from 'classnames';
interface Props {
  onClick: () => void;
  isExpanded: boolean;
  className?: string;
}

const ExpandButton = ({ onClick, isExpanded, className }: Props) => {
  return (
    <button className={classNames(styles.expandlableButton, className)} onClick={() => onClick()}>
      <img
        src={ARROW_ICON}
        alt="expand"
        className={classNames(styles.expandlableButton, isExpanded && ['-expanded'])}
      />
    </button>
  );
};

export default ExpandButton;
