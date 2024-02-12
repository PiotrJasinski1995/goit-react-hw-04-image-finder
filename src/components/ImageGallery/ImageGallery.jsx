import UpButton from 'components/UpButton/UpButton';
import { StyledGallery } from './styled';
import { useEffect, useState } from 'react';

const ImageGallery = ({ children }) => {
  const [showUpButton, setShowUpButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowUpButton(true);
    } else {
      setShowUpButton(false);
    }
  };

  const handleUpButtonClick = () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    document.documentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <StyledGallery>{children}</StyledGallery>
      {showUpButton && <UpButton onClick={handleUpButtonClick} />}
    </>
  );
};

export default ImageGallery;
