import PropTypes from 'prop-types';
import { StyledHeader, SearchFrom, StyledButton } from './styled';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const searchText = event.target.elements.search.value;

    if (!searchText) return;

    onSubmit(searchText);
  };

  return (
    <StyledHeader>
      <SearchFrom onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />

        <StyledButton type="submit">Search</StyledButton>
      </SearchFrom>
    </StyledHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;
