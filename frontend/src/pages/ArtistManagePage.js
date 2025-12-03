import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Table, Card, Row, Col, Modal, Form, Spinner } from 'react-bootstrap';
import apiClient from '../api/apiClient';

// ====================================================================
// ⚠️ 성별 유틸리티 함수 (API 사양서에 맞춰 M, F, None을 변환)
// ====================================================================

const mapGenderToApi = (uiGender) => {
    switch (uiGender) {
        case '남성': return 'M';
        case '여성': return 'F';
        case '선택 안함': return 'None';
        default: return 'None';
    }
};

const mapGenderToUi = (apiGender) => {
    switch (apiGender) {
        case 'M': return '남성';
        case 'F': return '여성';
        case 'None': return '선택 안함';
        default: return '선택 안함';
    }
};

// ====================================================================
// 💻 ArtistManagePage 컴포넌트 시작
// ====================================================================

function ArtistManagePage() {
    const navigate = useNavigate();
    // MOCK_ARTISTS 제거, 초기 상태를 빈 배열로 설정
    const [artists, setArtists] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 아티스트 추가 상태
    const [showAddArtistModal, setShowAddArtistModal] = useState(false);
    const [newArtistName, setNewArtistName] = useState('');
    const [newArtistGender, setNewArtistGender] = useState('');
    
    // 아티스트 삭제 상태
    const [showDeleteArtistModal, setShowDeleteArtistModal] = useState(false);
    const [deleteArtistId, setDeleteArtistId] = useState('');
    
    // 아티스트 정보 확인 상태
    const [showCheckInfoModal, setShowCheckInfoModal] = useState(false);
    const [checkArtistId, setCheckArtistId] = useState('');
    const [checkedArtistInfo, setCheckedArtistInfo] = useState(null);

    // 1. 🖼️ 아티스트 목록 조회 (GET /manager/artists)
    const fetchArtists = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // apiClient는 베이스 URL(/api)을 가지고 있으므로, 나머지 경로를 추가
            const response = await apiClient.get('/manager/artists'); // ⬅️ API 4.6.8
            
            // 응답 구조: { success: true, data: { artists: [..], totalCount: N } }
            const fetchedArtists = response.data.data.artists.map(artist => ({
                id: artist.id, // 서버에서 받은 숫자 ID를 그대로 사용
                name: artist.name,
                gender: mapGenderToUi(artist.gender),
            }));
            setArtists(fetchedArtists);
        } catch (err) {
            console.error("아티스트 목록 로드 오류:", err.response || err);
            // 401(인증)이나 403(권한) 에러는 apiClient에서 처리되므로, 일반 에러만 표시
            setError("아티스트 목록을 불러오지 못했습니다. (서버 연결 또는 권한 확인)");
            setArtists([]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // 컴포넌트 마운트 시 목록을 가져옵니다.
    useEffect(() => {
        fetchArtists();
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    // 2. 🔍 아티스트 정보 확인 (GET /manager/artists/{artistId})
    const handleCheckInfo = () => {
        setShowCheckInfoModal(true);
        setCheckedArtistInfo(null);
        setCheckArtistId('');
    };

    const handleCloseCheckInfoModal = () => {
        setShowCheckInfoModal(false);
        setCheckArtistId('');
        setCheckedArtistInfo(null);
    };

    const handleCheckInfoConfirm = async () => {
        const idToSearch = checkArtistId.trim();
        if (!idToSearch) {
            alert('아티스트 ID를 입력해주세요.');
            return;
        }

        try {
            // ID를 URL 경로에 포함하여 요청
            const response = await apiClient.get(`/manager/artists/${idToSearch}`); // ⬅️ API 4.6.9
            
            // 응답 구조: { success: true, data: { id: N, name: S, gender: G } }
            const artistData = response.data.data;
            setCheckedArtistInfo({
                id: artistData.id,
                name: artistData.name,
                gender: mapGenderToUi(artistData.gender),
            });
        } catch (err) {
            if (err.response && err.response.status === 404) {
                alert(`ID '${idToSearch}'를 가진 아티스트를 찾을 수 없습니다.`); // ⬅️ API 404 실패 응답
            } else {
                // 401, 403 외의 기타 오류 처리
                alert("아티스트 정보 조회 중 오류가 발생했습니다.");
            }
            setCheckedArtistInfo(null);
        }
    };

    // 3. ➕ 아티스트 추가 (POST /manager/artists)
    const handleAddArtist = () => {
        setShowAddArtistModal(true);
    };

    const handleCloseAddArtistModal = () => {
        setShowAddArtistModal(false);
        setNewArtistName('');
        setNewArtistGender('');
    };

    const handleAddArtistConfirm = async () => {
        if (!newArtistName.trim() || !newArtistGender) {
            alert('아티스트 이름과 성별을 모두 선택해주세요.');
            return;
        }

        const apiGender = mapGenderToApi(newArtistGender);
        
        try {
            const response = await apiClient.post('/manager/artists', { // ⬅️ API 4.6.10
                name: newArtistName,
                gender: apiGender,
            });
            
            // 성공 (201 Created) 후 목록 새로고침
            alert(response.data.message || `${response.data.data.name}이/가 성공적으로 추가되었습니다.`);
            handleCloseAddArtistModal();
            fetchArtists(); // 목록을 다시 불러와 업데이트
            
        } catch (err) {
            console.error("아티스트 추가 오류:", err.response || err);
            // 400 Bad Request (INVALID_INPUT 등) 처리
            const msg = err.response?.data?.message || "아티스트 추가에 실패했습니다.";
            alert(msg);
        }
    };

    // 4. 🗑️ 아티스트 삭제 (DELETE /manager/artists/{artistId})
    const handleDeleteArtist = () => {
        setShowDeleteArtistModal(true);
    };

    const handleCloseDeleteArtistModal = () => {
        setShowDeleteArtistModal(false);
        setDeleteArtistId('');
    };

    const handleDeleteArtistConfirm = async () => {
        const idToDelete = deleteArtistId.trim();
        if (!idToDelete) {
            alert('삭제할 아티스트 ID를 입력해주세요.');
            return;
        }

        try {
            // ID를 URL 경로에 포함하여 요청
            const response = await apiClient.delete(`/manager/artists/${idToDelete}`); // ⬅️ API 4.6.11
            
            // 성공 (200 OK) 후 목록 새로고침
            alert(response.data.message || `아티스트 ID ${idToDelete}가 삭제되었습니다.`);
            handleCloseDeleteArtistModal();
            fetchArtists(); // 목록을 다시 불러와 업데이트

        } catch (err) {
            if (err.response && err.response.status === 404) {
                alert(`ID ${idToDelete}를 가진 아티스트를 찾을 수 없습니다.`); // ⬅️ API 404 실패 응답
            } else {
                alert("아티스트 삭제 중 오류가 발생했습니다.");
            }
        }
    };

    // ====================================================================
    // 🎨 UI 렌더링
    // ====================================================================

    return (
        <Container style={{ maxWidth: '1000px', marginTop: '50px' }}>
            <div className="mb-4 d-flex align-items-center">
                <Button variant="link" onClick={handleGoBack} className="p-0" style={{ color: '#333' }}>
                    ← 뒤로가기
                </Button>
            </div>
            
            <h2 className="mb-1" style={{ fontWeight: 'bold' }}>아티스트 관리</h2>
            <p className="text-muted mb-4" style={{ fontSize: '0.9em' }}>아티스트 정보를 확인, 수정, 삭제하세요</p>

            <Row className="mb-4 gx-3">
                <Col><Button variant="light" className="w-100 py-3" style={{ backgroundColor: '#f0f0f0', border: 'none', color: '#333', fontWeight: 'bold' }} onClick={handleCheckInfo}><span style={{ marginRight: '8px' }}>ⓘ</span> 아티스트 정보 확인</Button></Col>
                <Col><Button variant="dark" className="w-100 py-3" style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }} onClick={handleAddArtist}><span style={{ marginRight: '8px' }}>+</span> 아티스트 추가</Button></Col>
                <Col><Button variant="danger" className="w-100 py-3" style={{ backgroundColor: '#dc3545', color: 'white', fontWeight: 'bold' }} onClick={handleDeleteArtist}><span style={{ marginRight: '8px' }}>🗑️</span> 아티스트 삭제</Button></Col>
            </Row>

            <Card className="p-4 shadow-sm" style={{ border: 'none', backgroundColor: 'white' }}>
                <h4 style={{ fontWeight: 'bold' }}>아티스트 목록 ({isLoading ? '로딩 중' : artists.length + '명'})</h4>
                <div className="mt-3">
                    {isLoading ? (
                        <div className="text-center py-5"><Spinner animation="border" /> <p className="mt-2">데이터 로딩 중...</p></div>
                    ) : error ? (
                        <div className="text-center py-5 text-danger">{error}</div>
                    ) : (
                        <Table borderless responsive>
                            <thead style={{ color: '#555' }}>
                                <tr>
                                    <th className="p-0 pb-2 border-bottom">아티스트 ID</th>
                                    <th className="p-0 pb-2 border-bottom">아티스트 이름</th>
                                    <th className="p-0 pb-2 border-bottom">성별</th>
                                </tr>
                            </thead>
                            <tbody>
                                {artists.map((artist) => (
                                    <tr key={artist.id}>
                                        <td className="p-0 py-2">{artist.id}</td>
                                        <td className="p-0 py-2">{artist.name}</td>
                                        <td className="p-0 py-2">{artist.gender}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </Card>

            {/* 아티스트 추가 모달 (POST) */}
            <Modal show={showAddArtistModal} onHide={handleCloseAddArtistModal} centered>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}><Modal.Title><h4 style={{ fontWeight: 'bold', marginBottom: '0' }}>새 아티스트 추가</h4></Modal.Title></Modal.Header>
                <Modal.Body className="pt-0">
                    <p className="text-muted mb-4">새로운 아티스트 정보를 입력하세요</p>
                    <Form>
                        <Form.Group className="mb-3"><Form.Label style={{ fontWeight: 'bold' }}>아티스트 이름</Form.Label><Form.Control type="text" placeholder="예: NewJeans" value={newArtistName} onChange={(e) => setNewArtistName(e.target.value)}/></Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label style={{ fontWeight: 'bold' }}>성별</Form.Label>
                            <Form.Select value={newArtistGender} onChange={(e) => setNewArtistGender(e.target.value)}>
                                <option value="">성별 선택</option>
                                <option value="남성">남성</option>
                                <option value="여성">여성</option>
                                <option value="선택 안함">선택 안함</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="dark" className="w-100 py-3" style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }} onClick={handleAddArtistConfirm}>추가하기</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* 아티스트 삭제 모달 (DELETE) */}
            <Modal show={showDeleteArtistModal} onHide={handleCloseDeleteArtistModal} centered>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}><Modal.Title><h4 style={{ fontWeight: 'bold', marginBottom: '0' }}>아티스트 삭제</h4></Modal.Title></Modal.Header>
                <Modal.Body className="pt-0">
                    <p className="text-muted mb-4">삭제할 아티스트의 ID를 입력하세요</p>
                    <Form>
                        <Form.Group className="mb-4"><Form.Label style={{ fontWeight: 'bold' }}>아티스트 ID</Form.Label><Form.Control type="text" placeholder="예: 101" value={deleteArtistId} onChange={(e) => setDeleteArtistId(e.target.value)}/></Form.Group>
                        <Button variant="danger" className="w-100 py-3" style={{ backgroundColor: '#dc3545', color: 'white', fontWeight: 'bold' }} onClick={handleDeleteArtistConfirm}>삭제하기</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* 아티스트 정보 확인 모달 (GET 상세 조회) */}
            <Modal show={showCheckInfoModal} onHide={handleCloseCheckInfoModal} centered>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}><Modal.Title><h4 style={{ fontWeight: 'bold', marginBottom: '0' }}>아티스트 정보 확인</h4></Modal.Title></Modal.Header>
                <Modal.Body className="pt-0">
                    <p className="text-muted mb-4">조회할 아티스트의 ID를 입력하세요</p>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 'bold' }}>아티스트 ID</Form.Label>
                            <Row className="g-2">
                                <Col xs={8}><Form.Control type="text" placeholder="예: 101" value={checkArtistId} onChange={(e) => setCheckArtistId(e.target.value)}/></Col>
                                <Col xs={4}><Button variant="dark" className="w-100" style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }} onClick={handleCheckInfoConfirm}>확인</Button></Col>
                            </Row>
                        </Form.Group>

                        {checkedArtistInfo && (
                            <Card className="mt-4 p-3" style={{ backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
                                <h5 style={{ fontWeight: 'bold' }}>조회 결과</h5>
                                <p className="mb-1">ID: **{checkedArtistInfo.id}**</p>
                                <p className="mb-1">이름: **{checkedArtistInfo.name}**</p>
                                <p className="mb-0">성별: **{checkedArtistInfo.gender}**</p>
                            </Card>
                        )}
                        
                        {!checkedArtistInfo && checkArtistId && (
                             <div className="mt-4 text-danger">ID를 찾을 수 없거나 아직 조회하지 않았습니다.</div>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default ArtistManagePage;