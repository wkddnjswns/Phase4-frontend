import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Table, Modal, Card } from 'react-bootstrap';

const MOCK_REQUESTS = [
    { id: '#1', title: 'New Jeans - Ditto', artist: 'New Jeans', requesterId: 'user123', date: '2025-11-15 14:30' },
    { id: '#2', title: 'IVE - Kitsch', artist: 'IVE', requesterId: 'user456', date: '2025-11-16 09:15' },
    { id: '#3', title: 'Seventeen - Super', artist: 'Seventeen', requesterId: 'user789', date: '2025-11-17 16:45' },
    { id: '#4', title: 'Stray Kids - S-Class', artist: 'Stray Kids', requesterId: 'user321', date: '2025-11-18 11:20' },
    { id: '#5', title: 'TWICE - Set Me Free', artist: 'TWICE', requesterId: 'user654', date: '2025-11-19 13:50' },
];

function SongRequestPage() {
    const navigate = useNavigate();
    const [requests, setRequests] = useState(MOCK_REQUESTS);
    const [showModal, setShowModal] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleShowDeleteModal = (id) => {
        setSelectedRequestId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        setRequests(requests.filter(req => req.id !== selectedRequestId));
        setShowModal(false);
        setSelectedRequestId(null);
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
                <h4 style={{ fontWeight: 'bold' }}>악곡 요청 목록 ({requests.length}건)</h4>
                <div className="mt-3">
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
                                            🗑️
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>요청 삭제 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>정말 이 요청을 삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        예
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