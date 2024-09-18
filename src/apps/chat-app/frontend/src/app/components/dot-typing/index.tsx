import React, { memo } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface DotTypingProps {
  className?: string;
}

const DotTyping = memo(({ className }: DotTypingProps) => {
  const dotTypingClasses = classNames(styles.dotTyping, className);
  return <div className={dotTypingClasses}></div>;
});

export default DotTyping;
