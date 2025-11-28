import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Table, Modal, Card, Form } from 'react-bootstrap';

const MOCK_PROVIDERS = [
    { id: 'SC001', name: 'Spotify', link: 'https://spotify.com' },
    { id: 'SC002', name: 'YouTube', link: 'https://youtube.com' },
    { id: 'SC003', name: 'Apple Music', link: 'https://music.apple.com' },
];

function ProviderManagePage() {
    const navigate = useNavigate();
    const [providers, setProviders] = useState(MOCK_PROVIDERS);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProviderId, setSelectedProviderId] = useState(null);
    const [newProviderName, setNewProviderName] = useState('');
    const [newProviderLink, setNewProviderLink] = useState('');
    
    const handleGoBack = () => {
        navigate(-1);
    };

    const handleShowDeleteModal = (id) => {
        setSelectedProviderId(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        setProviders(providers.filter(prov => prov.id !== selectedProviderId));
        setShowDeleteModal(false);
        setSelectedProviderId(null);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedProviderId(null);
    };

    const handleShowAddModal = () => {
        setShowAddModal(true);
        setNewProviderName('');
        setNewProviderLink('');
    };
    
    const handleAddProvider = (e) => {
        e.preventDefault();
        if (!newProviderName || !newProviderLink) {
            alert("이름과 링크를 모두 입력해주세요.");
            return;
        }

        const newId = 'SC' + (providers.length + 1).toString().padStart(3, '0');

        const newProvider = {
            id: newId,
            name: newProviderName,
            link: newProviderLink,
        };

        setProviders([...providers, newProvider]);
        setShowAddModal(false);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleLinkClick = (link) => {
        window.open(link, '_blank');
    };


    return (
        <Container style={{ maxWidth: '1000px', marginTop: '50px' }}>
            <div className="mb-4 d-flex align-items-center">
                <Button variant="link" onClick={handleGoBack} className="p-0" style={{ color: '#333' }}>
                    ← 뒤로가기
                </Button>
            </div>
            
            <h2 className="mb-1" style={{ fontWeight: 'bold' }}>제공원 관리</h2>
            <p className="text-muted mb-4" style={{ fontSize: '0.9em' }}>음악 제공원 목록을 확인하고 관리하세요</p>

            <Card className="p-4 shadow-sm" style={{ border: 'none', backgroundColor: 'white' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 style={{ fontWeight: 'bold' }}>제공원 목록 ({providers.length}개)</h4>
                    <Button variant="dark" onClick={handleShowAddModal}>
                        + 제공원 추가
                    </Button>
                </div>
                <div className="mt-3">
                    <Table borderless responsive>
                        <thead style={{ color: '#555' }}>
                            <tr>
                                <th className="p-0 pb-2 border-bottom">제공원 ID</th>
                                <th className="p-0 pb-2 border-bottom">제공원 이름</th>
                                <th className="p-0 pb-2 border-bottom">제공원 링크</th>
                                <th className="p-0 pb-2 border-bottom">작업</th>
                            </tr>
                        </thead>
                        <tbody>
                            {providers.map((prov) => (
                                <tr key={prov.id}>
                                    <td className="p-0 py-2">{prov.id}</td>
                                    <td className="p-0 py-2">{prov.name}</td>
                                    <td className="p-0 py-2">
                                        <Button 
                                            variant="link" 
                                            onClick={() => handleLinkClick(prov.link)}
                                            style={{ padding: '0' }}
                                        >
                                            링크 {'⇗'}
                                        </Button>
                                    </td>
                                    <td className="p-0 py-2">
                                        <Button 
                                            variant="link" 
                                            onClick={() => handleShowDeleteModal(prov.id)}
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

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>제공원 삭제 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>정말 이 제공원을 삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        예
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        아니오
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>새 제공원 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddProvider}>
                        <Form.Group className="mb-3">
                            <Form.Label>제공원 이름</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="예: Spotify" 
                                value={newProviderName}
                                onChange={(e) => setNewProviderName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>제공원 링크 (URL)</Form.Label>
                            <Form.Control 
                                type="url" 
                                placeholder="예: https://spotify.com" 
                                value={newProviderLink}
                                onChange={(e) => setNewProviderLink(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleAddProvider}>
                        추가하기
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ProviderManagePage;