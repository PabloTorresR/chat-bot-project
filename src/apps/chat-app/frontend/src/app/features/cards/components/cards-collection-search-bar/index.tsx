import SearchBar from '@chat-app/components/search-bar';
import useCollection from '../../hooks/useCollection';

export const CardsCollectionSearchBar = () => {
  const {
    filters: { searchTerm },
  } = useCollection();

  const handleInputChange = (value: string) => {
    searchTerm.actions.setSearchTerm(value);
  };
  return <SearchBar onInputChange={handleInputChange} value={searchTerm.value} />;
};
