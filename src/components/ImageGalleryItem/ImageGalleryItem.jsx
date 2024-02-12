import PropTypes from 'prop-types';
import { StyledImage, StyledListElement } from './styled';
import { forwardRef } from 'react';

const ImageGalleryItem = forwardRef(
  ({ src = '', srcLarge = '', alt = '', onClick }, ref) => {
    const handleImageClick = _event => {
      onClick(srcLarge, alt);
    };

    return (
      <StyledListElement onClick={handleImageClick} ref={ref}>
        <StyledImage src={src} alt={alt} loading="lazy" />
      </StyledListElement>
    );
  }
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  srcLarge: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
