import PropTypes from 'prop-types';
import upArrow from '../../images/up-arrow.png';
import { StyledUpButton } from './styled';

const UpButton = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <StyledUpButton type="button">
      <img src={upArrow} alt="up arrow" width="50px" onClick={handleClick} />
    </StyledUpButton>
  );
};

UpButton.propTypes = {
  onClick: PropTypes.func,
};

export default UpButton;
