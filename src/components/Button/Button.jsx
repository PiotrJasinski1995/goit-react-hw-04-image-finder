import PropTypes from 'prop-types';
import { StyledButton } from './styled';

const Button = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
