import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Container, Card, Button, Form, Row, Col, Table, Modal, Alert } from 'react-bootstrap';

const TAB_CONTENTS = {
  '소유': {
    title: '내가 소유한 플레이리스트',
    headers: ['제목', '곡 수', '생성일'],
    data: [
      { id: 1, col1: '내 플레이리스트 1', col2: 25, col3: '2025-01-15' },
      { id: 2, col1: '내 플레이리스트 2', col2: 18, col3: '2025-02-20' },
      { id: 3, col1: '운동 음악', col2: 30, col3: '2025-03-10' },
    ],
  },
  '공유': {
    title: '나와 공유된 플레이리스트',
    headers: ['제목', '곡 수', '소유자'],
    data: [
      { id: 1, col1: '공유된 플레이리스트 1', col2: 15, col3: '친구1' },
      { id: 2, col1: '공유된 플레이리스트 2', col2: 20, col3: '친구2' },
    ],
  },
  '편집 가능': {
    title: '편집 가능한 플레이리스트',
    headers: ['제목', '곡 수', '소유자'],
    data: [
      { id: 1, col1: '편집 가능한 플레이리스트 1', col2: 10, col3: '동료1' },
      { id: 2, col1: '편집 가능한 플레이리스트 2', col2: 12, col3: '동료2' },
    ],
  },
  '내 댓글': {
    title: '내가 작성한 댓글',
    headers: ['플레이리스트', '댓글', '작성일'],
    data: [
      { id: 1, col1: 'K-Pop 히트곡', col2: '좋은 플레이리스트네요!', col3: '2025-11-15' },
      { id: 2, col1: '발라드 모음', col2: '감성 넘쳐요', col3: '2025-11-18' },
    ],
  },
};

const TAB_NAMES = Object.keys(TAB_CONTENTS);

const PlaylistTable = ({ content }) => (
  <>
    <div className="text-muted mt-3 mb-3" style={{ fontSize: '0.9em' }}>
      {content.title}
    </div>
    <Table borderless style={{ fontSize: '0.9em' }}>
      <thead style={{ color: '#555' }}>
        <tr>
          {content.headers.map((header) => (
            <th key={header} className="p-0 pb-2 border-bottom">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content.data.map((row) => (
          <tr key={row.id}>
            <td className="p-0 py-2">{row.col1}</td>
            <td className="p-0 py-2">{row.col2}</td>
            <td className="p-0 py-2">{row.col3}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
);


function MyPage() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext();
  const [activeTab, setActiveTab] = useState('소유');
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1000);
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAccountDeletion = () => {
    setIsLoggedIn(false);
    setShowModal(false);
    navigate('/');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    handleShowAlert('비밀번호가 변경되었습니다');
  };

  const handleNicknameChange = (e) => {
    e.preventDefault();
    handleShowAlert('닉네임이 변경되었습니다');
  };


  return (
    <Container style={{ maxWidth: '800px' }}>
      
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="position-absolute top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 1050, width: '100%', maxWidth: '300px' }}>
          {alertMessage}
        </Alert>
      )}

      <div className="mb-4 d-flex align-items-center">
        <Button variant="link" onClick={handleGoBack} className="p-0" style={{ color: '#333' }}>
          ← 뒤로가기
        </Button>
      </div>

      <h2 className="mb-1" style={{ fontWeight: 'normal' }}>내 정보</h2>
      <p className="mb-4 text-muted" style={{ fontWeight: 'bold' }}>asd</p>
      
      <Card className="p-4 mb-5 shadow-sm" style={{ border: 'none' }}>
        <h4 className="mb-4" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>계정 설정</h4>

        <div className="mb-4">
          <h5 className="mb-3" style={{ fontSize: '1em' }}>비밀번호 변경</h5>
          <Form onSubmit={handlePasswordChange}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="text-muted" style={{ fontSize: '0.8em' }}>현재 비밀번호</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="" 
                  style={{ backgroundColor: '#f0f0f0', border: 'none', padding: '12px' }}
                />
              </Col>
              <Col md={6}>
                <Form.Label className="text-muted" style={{ fontSize: '0.8em' }}>변경할 비밀번호</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="" 
                  style={{ backgroundColor: '#f0f0f0', border: 'none', padding: '12px' }}
                />
              </Col>
              <Col xs={12}>
                <Button variant="dark" type="submit" style={{ backgroundColor: 'black', color: 'white', padding: '8px 20px' }}>
                  비밀번호 변경
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="mb-4">
          <h5 className="mb-3" style={{ fontSize: '1em' }}>닉네임 변경</h5>
          <Form className="d-flex align-items-end" onSubmit={handleNicknameChange}>
            <div style={{ flexGrow: 1, maxWidth: '300px' }}>
              <Form.Label className="text-muted" style={{ fontSize: '0.8em' }}>새 닉네임</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="새 닉네임을 입력하세요" 
                style={{ backgroundColor: '#f0f0f0', border: 'none', padding: '12px' }}
              />
            </div>
            <Button variant="dark" type="submit" className="ms-3" style={{ backgroundColor: 'black', color: 'white', padding: '12px 20px', height: '48px' }}>
              닉네임 변경
            </Button>
          </Form>
        </div>

        <div>
          <h5 className="mb-2" style={{ fontSize: '1em' }}>계정 삭제</h5>
          <p className="text-muted mb-3" style={{ fontSize: '0.9em' }}>계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.</p>
          <Button 
            variant="danger" 
            onClick={handleShowModal}
            style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 20px', border: 'none' }}
          >
            계정 삭제
          </Button>
        </div>
      </Card>
      
      <Card className="p-4 shadow-sm" style={{ border: 'none' }}>
        <h4 className="mb-4" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>플레이리스트 및 댓글</h4>

        <div className="mb-4 p-1 rounded-pill" style={{ backgroundColor: '#eee', display: 'flex' }}>
          {TAB_NAMES.map((tab) => (
            <Button
              key={tab}
              variant="link"
              onClick={() => setActiveTab(tab)}
              className="flex-grow-1 text-center p-2 rounded-pill"
              style={{
                color: 'black',
                fontWeight: 'normal',
                backgroundColor: activeTab === tab ? 'white' : 'transparent',
                boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'background-color 0.2s',
                textDecoration: 'none'
              }}
            >
              {tab}
            </Button>
          ))}
        </div>

        <PlaylistTable content={TAB_CONTENTS[activeTab]} />
      </Card>
      
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>계정 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말 계정을 영구적으로 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleAccountDeletion}>
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

export default MyPage;