import React, { ReactNode } from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  label: string | ReactNode;
  classNames?: string;
}

const Button = ({ onClick, label, classNames, ...rest }: Props) => {
  return (
    <button className={classnames(styles.button, classNames)} onClick={() => onClick?.()} {...rest}>
      {label}
    </button>
  );
};

export default Button;
