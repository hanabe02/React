/**
 * axios setup to use mock service
 */

import axios from 'axios';

const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3010/' });

// baseURL 모든 axios 요청의 공통적인 시작 경로
// process : node.js에서 제공하는 전역 객체로, 애플리케이션이 실행되는 환경에 대한 정보를 담고 있다.

// react 애플리케이션도 내부적으로 node.js 환경에서 실행되기 때문에, process 객체를 사용할 수 있다.

// process.env : node.js에서 실행 환경에 설정된 모든 환경 변수를 담고 있다.

// REACT_APP_API_URL : api 서버의 기본 주소를 지정한다.

// baseURL은 Axios 라이브러리에서 사용되는데, + 기본 url
// axios 서버의 http 요청을 주고받기 위해 사용하는 라이브러리이다.

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
