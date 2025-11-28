import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Table, Card, Row, Col, Modal, Form } from 'react-bootstrap';

const MOCK_ARTISTS = [
    { id: '#1', name: 'BTS', gender: '그룹' },
    { id: '#2', name: 'IU', gender: '여성' },
    { id: '#3', name: '박효신', gender: '남성' },
    { id: '#4', name: 'BLACKPINK', gender: '그룹' },
    { id: '#5', name: 'NewJeans', gender: '그룹' },
];

function ArtistManagePage() {
    const navigate = useNavigate();
    const [artists, setArtists] = useState(MOCK_ARTISTS);
    const [showAddArtistModal, setShowAddArtistModal] = useState(false);
    const [newArtistName, setNewArtistName] = useState('');
    const [newArtistGender, setNewArtistGender] = useState('');
    
    const [showDeleteArtistModal, setShowDeleteArtistModal] = useState(false);
    const [deleteArtistId, setDeleteArtistId] = useState('');
    
    const [showCheckInfoModal, setShowCheckInfoModal] = useState(false);
    const [checkArtistId, setCheckArtistId] = useState('');
    const [checkedArtistInfo, setCheckedArtistInfo] = useState(null);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleCheckInfo = () => {
        setShowCheckInfoModal(true);
        setCheckedArtistInfo(null);
    };

    const handleCloseCheckInfoModal = () => {
        setShowCheckInfoModal(false);
        setCheckArtistId('');
        setCheckedArtistInfo(null);
    };

    const handleCheckInfoConfirm = () => {
        if (!checkArtistId.trim()) {
            alert('아티스트 ID를 입력해주세요.');
            return;
        }

        const foundArtist = artists.find(artist => artist.id === checkArtistId.trim());

        if (foundArtist) {
            setCheckedArtistInfo(foundArtist);
        } else {
            alert(`ID '${checkArtistId.trim()}'를 가진 아티스트를 찾을 수 없습니다.`);
            setCheckedArtistInfo(null);
        }
    };

    const handleAddArtist = () => {
        setShowAddArtistModal(true);
    };

    const handleCloseAddArtistModal = () => {
        setShowAddArtistModal(false);
        setNewArtistName('');
        setNewArtistGender('');
    };

    const handleAddArtistConfirm = () => {
        if (!newArtistName.trim()) {
            alert('아티스트 이름을 입력해주세요.');
            return;
        }

        const newId = `#${artists.length + 1}`;
        const newArtist = {
            id: newId,
            name: newArtistName,
            gender: newArtistGender || '선택 안함',
        };

        setArtists([...artists, newArtist]);
        handleCloseAddArtistModal();
    };

    const handleDeleteArtist = () => {
        setShowDeleteArtistModal(true);
    };

    const handleCloseDeleteArtistModal = () => {
        setShowDeleteArtistModal(false);
        setDeleteArtistId('');
    };

    const handleDeleteArtistConfirm = () => {
        if (!deleteArtistId.trim()) {
            alert('삭제할 아티스트 ID를 입력해주세요.');
            return;
        }

        const filteredArtists = artists.filter(artist => artist.id !== deleteArtistId.trim());

        if (filteredArtists.length === artists.length) {
            alert(`ID '${deleteArtistId.trim()}'를 가진 아티스트를 찾을 수 없습니다.`);
            return;
        }

        setArtists(filteredArtists);
        alert(`아티스트 ID '${deleteArtistId.trim()}'가 삭제되었습니다.`);
        handleCloseDeleteArtistModal();
    };

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
                <Col>
                    <Button 
                        variant="light" 
                        className="w-100 py-3 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: '#f0f0f0', border: 'none', color: '#333', fontWeight: 'bold' }}
                        onClick={handleCheckInfo}
                    >
                        <span style={{ marginRight: '8px' }}>ⓘ</span> 아티스트 정보 확인
                    </Button>
                </Col>
                <Col>
                    <Button 
                        variant="dark" 
                        className="w-100 py-3 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}
                        onClick={handleAddArtist}
                    >
                        <span style={{ marginRight: '8px' }}>+</span> 아티스트 추가
                    </Button>
                </Col>
                <Col>
                    <Button 
                        variant="danger" 
                        className="w-100 py-3 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: '#dc3545', color: 'white', fontWeight: 'bold' }}
                        onClick={handleDeleteArtist}
                    >
                        <span style={{ marginRight: '8px' }}>🗑️</span> 아티스트 삭제
                    </Button>
                </Col>
            </Row>

            <Card className="p-4 shadow-sm" style={{ border: 'none', backgroundColor: 'white' }}>
                <h4 style={{ fontWeight: 'bold' }}>아티스트 목록 ({artists.length}명)</h4>
                <div className="mt-3">
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
                </div>
            </Card>

            <Modal show={showAddArtistModal} onHide={handleCloseAddArtistModal} centered>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                    <Modal.Title>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '0' }}>새 아티스트 추가</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-0">
                    <p className="text-muted mb-4">새로운 아티스트 정보를 입력하세요</p>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 'bold' }}>아티스트 이름</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="예: BTS"
                                value={newArtistName}
                                onChange={(e) => setNewArtistName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label style={{ fontWeight: 'bold' }}>성별</Form.Label>
                            <Form.Select
                                value={newArtistGender}
                                onChange={(e) => setNewArtistGender(e.target.value)}
                            >
                                <option value="">성별 선택</option>
                                <option value="남성">남성</option>
                                <option value="여성">여성</option>
                                <option value="선택 안함">선택 안함</option>
                            </Form.Select>
                        </Form.Group>
                        <Button
                            variant="dark"
                            className="w-100 py-3"
                            style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}
                            onClick={handleAddArtistConfirm}
                        >
                            추가하기
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteArtistModal} onHide={handleCloseDeleteArtistModal} centered>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                    <Modal.Title>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '0' }}>아티스트 삭제</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-0">
                    <p className="text-muted mb-4">삭제할 아티스트의 ID를 입력하세요</p>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label style={{ fontWeight: 'bold' }}>아티스트 ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="예: #1"
                                value={deleteArtistId}
                                onChange={(e) => setDeleteArtistId(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant="danger"
                            className="w-100 py-3"
                            style={{ backgroundColor: '#dc3545', color: 'white', fontWeight: 'bold' }}
                            onClick={handleDeleteArtistConfirm}
                        >
                            삭제하기
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showCheckInfoModal} onHide={handleCloseCheckInfoModal} centered>
                <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                    <Modal.Title>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '0' }}>아티스트 정보 확인</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-0">
                    <p className="text-muted mb-4">조회할 아티스트의 ID를 입력하세요</p>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 'bold' }}>아티스트 ID</Form.Label>
                            <Row className="g-2">
                                <Col xs={8}>
                                    <Form.Control
                                        type="text"
                                        placeholder="예: #1"
                                        value={checkArtistId}
                                        onChange={(e) => setCheckArtistId(e.target.value)}
                                    />
                                </Col>
                                <Col xs={4}>
                                    <Button
                                        variant="dark"
                                        className="w-100"
                                        style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}
                                        onClick={handleCheckInfoConfirm}
                                    >
                                        확인
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>

                        {checkedArtistInfo && (
                            <Card className="mt-4 p-3" style={{ backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
                                <h5 style={{ fontWeight: 'bold' }}>조회 결과</h5>
                                <p className="mb-1">
                                    ID: {checkedArtistInfo.id}
                                </p>
                                <p className="mb-1">
                                    이름: {checkedArtistInfo.name}
                                </p>
                                <p className="mb-0">
                                    성별: {checkedArtistInfo.gender}
                                </p>
                            </Card>
                        )}
                        
                        {!checkedArtistInfo && checkArtistId && (
                             <div className="mt-4 text-danger">
                                 ID를 찾을 수 없거나 아직 조회하지 않았습니다.
                             </div>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default ArtistManagePage;