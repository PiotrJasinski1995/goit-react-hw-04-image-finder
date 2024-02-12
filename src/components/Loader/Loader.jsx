import { InfinitySpin } from 'react-loader-spinner';
import { LoaderStyled, LoaderBackground } from './styled';

const Loader = () => {
  return (
    <LoaderStyled>
      <LoaderBackground>
        <InfinitySpin
          visible={true}
          width="200"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      </LoaderBackground>
    </LoaderStyled>
  );
};

export default Loader;
