import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Table, Modal, Card, Spinner } from 'react-bootstrap';
import apiClient from '../api/apiClient'; // apiClient 임포트 경로 확인

// ====================================================================
// 💻 SongRequestPage 컴포넌트 시작
// ====================================================================

function SongRequestPage() {
    const navigate = useNavigate();
    
    // MOCK 데이터 제거 및 API 연동을 위한 상태 추가
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    // 요청 ID는 서버에서 숫자로 오므로, ID 타입 통일을 위해 숫자 대신 문자열 그대로 사용
    const [selectedRequestId, setSelectedRequestId] = useState(null); 

    // 1. 🖼️ 악곡 요청 목록 조회 (GET /manager/requests)
    const fetchRequests = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // API 4.6.3 곡 요청 목록 조회
            const response = await apiClient.get('/manager/requests'); 
            
            // 응답 구조: { success: true, data: { requests: [..], totalCount: N } }
            // API 응답 필드: id, title, artist, userld, requestAt
            const fetchedRequests = response.data.data.requests.map(req => ({
                id: req.id,
                title: req.title,
                artist: req.artist,
                requesterId: req.userld, // API는 userld, UI는 신청자 ID (requesterId)
                date: new Date(req.requestAt).toLocaleString('ko-KR', { 
                    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' 
                }), // 날짜 형식 변환
            }));
            setRequests(fetchedRequests);
        } catch (err) {
            console.error("악곡 요청 목록 로드 오류:", err.response || err);
            setError("악곡 요청 목록을 불러오지 못했습니다. (서버 연결 또는 권한 확인)");
            setRequests([]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // 컴포넌트 마운트 시 목록을 가져옵니다.
    useEffect(() => {
        fetchRequests();
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleShowDeleteModal = (id) => {
        setSelectedRequestId(id);
        setShowModal(true);
    };

    // 2. 🗑️ 악곡 요청 삭제 (DELETE /manager/requests/{requestId})
    const handleConfirmDelete = async () => {
        if (!selectedRequestId) return;
        
        try {
            // API 4.6.4 곡 요청 삭제
            await apiClient.delete(`/manager/requests/${selectedRequestId}`); 
            
            // 성공 (200 OK) 후 목록 새로고침
            alert(`요청 ID ${selectedRequestId}가 삭제(처리)되었습니다.`);
            fetchRequests(); // 목록을 다시 불러와 업데이트

        } catch (err) {
            if (err.response && err.response.status === 404) {
                alert(`ID ${selectedRequestId}를 가진 요청을 찾을 수 없습니다.`); // ⬅️ API 404 실패 응답
            } else {
                const msg = err.response?.data?.message || "요청 삭제 처리 중 오류가 발생했습니다.";
                alert(msg);
            }
        } finally {
            setShowModal(false);
            setSelectedRequestId(null);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRequestId(null);
    };

    return (
        <Container style={{ maxWidth: '1000px', marginTop: '50px' }}>
            <div className="mb-4 d-flex align-items-center">
                <Button variant="link" onClick={handleGoBack} className="p-0" style={{ color: '#333' }}>
                    ← 뒤로가기
                </Button>
            </div>
            
            <h2 className="mb-1" style={{ fontWeight: 'bold' }}>악곡 요청 관리</h2>
            <p className="text-muted mb-4" style={{ fontSize: '0.9em' }}>사용자들이 요청한 악곡 목록을 확인하고 관리하세요</p>

            <Card className="p-4 shadow-sm" style={{ border: 'none', backgroundColor: 'white' }}>
                <h4 style={{ fontWeight: 'bold' }}>악곡 요청 목록 ({isLoading ? '로딩 중' : requests.length + '건'})</h4>
                <div className="mt-3">
                    {isLoading ? (
                        <div className="text-center py-5"><Spinner animation="border" /> <p className="mt-2">데이터 로딩 중...</p></div>
                    ) : error ? (
                        <div className="text-center py-5 text-danger">{error}</div>
                    ) : (
                        <Table borderless responsive>
                            <thead style={{ color: '#555' }}>
                                <tr>
                                    <th className="p-0 pb-2 border-bottom">요청 ID</th>
                                    <th className="p-0 pb-2 border-bottom">곡명</th>
                                    <th className="p-0 pb-2 border-bottom">아티스트</th>
                                    <th className="p-0 pb-2 border-bottom">신청자 ID</th>
                                    <th className="p-0 pb-2 border-bottom">요청 일시</th>
                                    <th className="p-0 pb-2 border-bottom">작업</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req) => (
                                    <tr key={req.id}>
                                        <td className="p-0 py-2">{req.id}</td>
                                        <td className="p-0 py-2">{req.title}</td>
                                        <td className="p-0 py-2">{req.artist}</td>
                                        <td className="p-0 py-2">{req.requesterId}</td>
                                        <td className="p-0 py-2">{req.date}</td>
                                        <td className="p-0 py-2">
                                            <Button 
                                                variant="link" 
                                                onClick={() => handleShowDeleteModal(req.id)}
                                                style={{ color: '#dc3545', padding: '0' }}
                                            >
                                                🗑️ 완료 처리
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </Card>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>요청 삭제(처리) 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>요청 ID **{selectedRequestId}**에 대한 처리를 완료하고 목록에서 삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        예, 삭제합니다
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        아니오
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default SongRequestPage;