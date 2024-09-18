import SearchIcon from '/SVG/icn_magnifying_glass.svg';

import styles from './styles.module.scss';

interface Props {
  value: string;
  onSearch?: () => void;
  onInputChange: (query: string) => void;
}

const SearchBar = ({ onSearch, onInputChange, value }: Props) => {
  return (
    <div className={styles.searchBar}>
      <input type="text" value={value} onChange={e => onInputChange?.(e.target.value)} placeholder="Search..." />
      <button onClick={() => onSearch?.()}>
        <img src={SearchIcon} alt="search" />
      </button>
    </div>
  );
};

export default SearchBar;
