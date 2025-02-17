import { FC, ReactNode } from 'react';
// project imports
import Customization from '../Customization';

interface Props {
  children: ReactNode;
}

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout: FC<Props> = ({ children }) => (
  <>
    {children}
    <Customization />
  </>
);
/*
  Customization 컴포넌트는
    ui 또는 페이지의 특정 부분을 커스터마이징(사용자 맞춤 설정) 하기 위해 사용되는 컴포넌트로 보인다.

    컴포넌트 내부에 많은 다른 컴포넌트가 포함되어 있다면, 
    이는 주로 다양한 설정 가능한 옵션이나 ui 요소를 처리하기 위한 목적으로 설계계
*/
export default MinimalLayout;
