import { useCallback, useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import MainHeading from './MainHeading/MainHeading';
import Container from './Container/Container';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ErrorInfo from './ErrorInfo/ErrorInfo';
import Notiflix from 'notiflix';
import axios from 'axios';

const API_KEY = '41284992-e3e58fe867fcadc7d8005ce00';
const photosPerPage = 12;

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    isLoadingNew: false,
  });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [filter, setFilter] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [scrollImageIndex, setScrollImageIndex] = useState(0);

  let imageRefs = useRef([]);

  const handleFormSubmit = async searchInput => {
    if (searchInput === filter) return;

    setFilter(searchInput);
    setCurrentPage(1);
    getImages(false, 1, searchInput);
  };

  const handleButtonClick = async pageNumber => {
    setCurrentPage(previousPage => previousPage + 1);
    setScrollImageIndex(0);
    getImages(true, pageNumber, filter);
  };

  const handleModalClick = event => {
    if (event.target.localName !== 'img') {
      closeModal();
    }
  };

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleImageClick = (src, tags) => {
    document.addEventListener('keydown', handleCloseModalKeydown);
    setSelectedImage({ src, tags });
  };

  const handleCloseModalKeydown = useCallback(
    event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  const getImages = async (
    loadNextPage = false,
    currentPage = 1,
    filter = ''
  ) => {
    setIsLoading({ isLoading: true, isLoadingNew: !loadNextPage });

    try {
      const searchParams = new URLSearchParams({
        key: API_KEY,
        page: currentPage,
        per_page: photosPerPage,
        image_type: 'photo',
        orientation: 'horizontal',
        q: filter,
      });

      const { data } = await axios(`https://pixabay.com/api/?${searchParams}`);

      setTotalImages(data.total);

      const images = data.hits.map(image => {
        return {
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tags: image.tags,
        };
      });

      if (loadNextPage) {
        setImages(previousImages => {
          setScrollImageIndex(previousImages.length);

          return [...previousImages, ...images];
        });
      } else {
        setImages(images);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading({ isLoading: false, isLoadingNew: false });
    }
  };

  useEffect(() => {
    return () => {
      if (selectedImage) {
        document.removeEventListener('keydown', handleCloseModalKeydown);
      }
    };
  }, [selectedImage, handleCloseModalKeydown]);

  useEffect(() => {
    if (filter !== '' && !isLoading.isLoading) {
      if (totalImages > 0) {
        const imageString = totalImages === 1 ? 'image' : 'images';
        Notiflix.Notify.info(`Hooray! We found ${totalImages} ${imageString}.`);

        if (images.length >= totalImages) {
          Notiflix.Notify.info("You've reached the end of search results.");
        }
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    }
  }, [images, totalImages, filter, isLoading]);

  useEffect(() => {
    if (
      imageRefs.current &&
      scrollImageIndex > 0 &&
      images.length > photosPerPage
    ) {
      console.log(imageRefs.current);
      imageRefs.current[scrollImageIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [scrollImageIndex, images]);

  return (
    <>
      <MainHeading>Image Gallery App</MainHeading>
      <SearchBar onSubmit={handleFormSubmit} />
      <main>
        <section>
          <Container>
            {error && (
              <ErrorInfo>Something went wrong: {error.message}.</ErrorInfo>
            )}
            {!isLoading.isLoadingNew && (
              <ImageGallery>
                {images.map((image, index) => {
                  const { id, webformatURL, largeImageURL, tags } = image;
                  const getImageRef = element =>
                    (imageRefs.current[index] = element);
                  return (
                    <ImageGalleryItem
                      key={id}
                      ref={getImageRef}
                      src={webformatURL}
                      srcLarge={largeImageURL}
                      alt={tags}
                      onClick={handleImageClick}
                    />
                  );
                })}
              </ImageGallery>
            )}
            {images.length > 0 && images.length < totalImages && (
              <Button onClick={() => handleButtonClick(currentPage + 1)}>
                Load more
              </Button>
            )}
            {isLoading.isLoading && <Loader />}
            {selectedImage && (
              <Modal
                src={selectedImage.src}
                alt={selectedImage.alt}
                onClick={handleModalClick}
              />
            )}
          </Container>
        </section>
      </main>
    </>
  );
};

export default App;
