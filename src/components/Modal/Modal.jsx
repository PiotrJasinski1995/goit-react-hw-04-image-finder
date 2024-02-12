import PropTypes from 'prop-types';
import { StyledModalOverlay, StyledImage } from './styled';

const Modal = ({ src = '', alt = '', onClick }) => {
  return (
    <StyledModalOverlay onClick={onClick}>
      <StyledImage src={src} alt={alt} />
    </StyledModalOverlay>
  );
};

Modal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

export default Modal;
