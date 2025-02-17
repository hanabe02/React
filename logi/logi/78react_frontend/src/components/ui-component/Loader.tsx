// material-ui
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

// styles
const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%'
});
// LoaderWrapper 실행

// ==============================|| LOADER ||============================== //

const Loader = () => (
  // react에서 loader 함수를 실행하여 반환값(jsx)을 확인하고, 이를 기반 DOM 구성
  // 1. loaderwrapper, linearProgress 를 포함한 jsx 를 반환
  // 2. 반환된 jsx는 가상 dom을 추가
    // react는 반환된 jsx를 가상 dom 형태로 변환
    // 이 가상 dom 은 react의 렌더링 엔진이 실제 dom 과 동기화 할 때 사용한다.
  <LoaderWrapper>
    <LinearProgress color="primary" />
    {/* LinearProgress 실행 내부 구현에 따라 dom 요소 생성 */}
  </LoaderWrapper>
);

export default Loader;
