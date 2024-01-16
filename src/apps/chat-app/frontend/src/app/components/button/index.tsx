import React, { memo } from 'react';
import styles from './styles.module.scss';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  label: string;
}

const Button = memo(({ onClick, label, ...rest }: Props) => {
  return (
    <button className={styles.button} onClick={onClick} {...rest}>
      {label}
    </button>
  );
});

export default Button;
