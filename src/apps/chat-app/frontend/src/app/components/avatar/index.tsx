import React, { memo } from 'react';
import styles from './styles.module.scss';

interface Props {
  imageUrl: string;
  size?: number;
}

const DEFAULT_SIZE = 36;

const Avatar = memo(({ imageUrl, size }: Props) => {
  return (
    <div className={styles.avatar}>
      <img src={imageUrl} alt={'avatar'} style={{ width: size ?? DEFAULT_SIZE, height: size ?? DEFAULT_SIZE }} />
    </div>
  );
});

export default Avatar;
