import axios from 'axios';

// API 명세서에 따른 기본 URL 설정 (예: http://localhost:8080/api)
// 관리자 API의 경우 베이스 URL이 '/api/manager'로 시작해야 하지만, 
// 인증(auth) API는 '/api/auth' 이므로, 최상위 '/api'만 베이스로 잡고, 
// 각 함수에서 나머지 경로를 추가하는 것이 더 유연합니다.
const API_BASE_URL = 'http://localhost:8080/api'; 

const apiClient = axios.create({
    baseURL: API_BASE_URL, // 모든 요청은 http://localhost:8080/api로 시작
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * 1. 요청 인터셉터: 세션 토큰 자동 추가
 * - localStorage에 저장된 토큰을 읽어 모든 요청 헤더에 'Authorization: Bearer <token>' 형식으로 추가합니다.
 */
apiClient.interceptors.request.use((config) => {
    // 관리자 세션 토큰을 'manager_token'으로 저장한다고 가정
    const token = localStorage.getItem('manager_token'); 
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // [cite: 185]
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * 2. 응답 인터셉터: 에러 처리 및 세션 만료 시 리다이렉트
 * - 서버 응답 상태 코드를 확인하여 공통 에러 처리를 수행합니다.
 */
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response ? error.response.status : null;
        
        // 401 UNAUTHORIZED 처리: 세션 만료, 로그인 필요 [cite: 406, 1384]
        if (status === 401) {
            console.error('인증 실패 또는 세션 만료. 로그인 페이지로 리다이렉트합니다.');
            
            // 저장된 토큰 제거
            localStorage.removeItem('manager_token');
            
            // 로그인 페이지로 리다이렉트 (실제 React 라우터에 맞게 수정 필요)
            // 현재는 window.location.href를 사용하지만, React Router의 navigate를 사용해야 합니다.
            // window.location.href = '/manager/login'; 
            
            // 🚨 주의: 현재 컴포넌트 외부에서 navigate를 바로 쓸 수 없으므로, 
            // 실제 프로젝트에서는 전역 상태 관리(Context)나 라우터 컨텍스트를 사용해야 합니다.
        }
        
        // 403 FORBIDDEN 처리: 접근 권한 없음 (관리자 전용 API를 일반 사용자가 호출 등) [cite: 1387]
        if (status === 403) {
            alert("접근 권한이 없습니다. 관리자 인증을 확인해주세요.");
        }

        return Promise.reject(error);
    }
);

export default apiClient;