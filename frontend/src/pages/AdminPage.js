import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ADMIN_CARDS = [
  { icon: '🎵', color: '#9370DB', title: '악곡 요청 관리', desc: '사용자 악곡 요청 확인 및 처리' },
  { icon: '🔗', color: '#3CB371', title: '제공원 관리', desc: '음악 제공원 추가 및 삭제' },
  { icon: '🧑‍🎤', color: '#BA55D3', title: '아티스트 관리', desc: '아티스트 정보 추가 및 관리' },
];

const AdminCard = ({ data, isLoggedIn, onClick }) => {
  const buttonStyle = isLoggedIn
    ? { backgroundColor: 'black', color: 'white', padding: '10px 20px' }
    : { backgroundColor: '#ddd', color: '#666', padding: '10px 20px', cursor: 'default' };

  return (
    <Col md={4} className="mb-4">
      <Card style={{ border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
        <Card.Body className="text-center p-4">
          <div 
            style={{ 
              fontSize: '40px', 
              color: data.color, 
              marginBottom: '10px',
              lineHeight: '1', 
            }}
          >
            {data.icon}
          </div>
          <Card.Title style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{data.title}</Card.Title>
          <Card.Text className="text-muted mb-3" style={{ fontSize: '0.85em' }}>
            {data.desc}
          </Card.Text>
          <Button 
            variant={isLoggedIn ? 'dark' : 'light'} 
            className="w-100"
            style={buttonStyle}
            disabled={!isLoggedIn}
            onClick={isLoggedIn ? onClick : undefined}
          >
            관리하기
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};


function AdminPage() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
      sessionStorage.getItem('adminLoggedIn') === 'true'
  );
  const [adminId, setAdminId] = useState(
      sessionStorage.getItem('adminId') || ''
  );
  
  const [idInput, setIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (idInput === 'admin' && passwordInput === '1234') {
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminId', idInput);
        
        setAdminId(idInput);
        setIsAdminLoggedIn(true);
    } else {
        alert('잘못된 관리자 아이디 또는 비밀번호입니다.');
    }
  };

  const handleLogout = () => {
      sessionStorage.removeItem('adminLoggedIn');
      sessionStorage.removeItem('adminId');
      
      setIsAdminLoggedIn(false);
      setAdminId('');
      setIdInput('');
      setPasswordInput('');
  };

  const handleManageClick = (title) => {
      if (!isAdminLoggedIn) return;
      if (title === '악곡 요청 관리') {
          navigate('/admin/requests');
      } else if (title === '제공원 관리') {
          navigate('/admin/providers');
      } else if (title === '아티스트 관리') {
          navigate('/admin/artists');
      }
  };

  const LoginContent = (
    <Card className="p-4 mb-5 shadow-sm" style={{ border: 'none', backgroundColor: 'white' }}>
      <h5 className="mb-3" style={{ fontWeight: 'bold' }}>관리자 로그인</h5>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>관리자 아이디</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="관리자 아이디를 입력하세요" 
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            style={{ backgroundColor: '#f0f0f0', border: 'none', padding: '12px' }}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="비밀번호를 입력하세요" 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            style={{ backgroundColor: '#f0f0f0', border: 'none', padding: '12px' }}
          />
        </Form.Group>
        <Button 
          variant="dark" 
          type="submit" 
          className="w-100" 
          style={{ backgroundColor: 'black', color: 'white', padding: '12px' }}
        >
          로그인
        </Button>
      </Form>
    </Card>
  );

  const LoggedInContent = (
    <Card className="p-4 mb-5 shadow-sm" style={{ border: 'none', backgroundColor: 'white' }}>
      <h5 className="mb-3" style={{ fontWeight: 'bold' }}>관리자 로그인 정보</h5>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div style={{ color: '#555', fontSize: '0.9em' }}>로그인된 관리자 계정</div>
          <div style={{ fontWeight: 'bold' }}>{adminId}</div> 
        </div>
        <Button 
          variant="light" 
          onClick={handleLogout}
          style={{ color: 'black', border: '1px solid #ddd' }}
        >
          로그아웃
        </Button>
      </div>
    </Card>
  );


  return (
    <Container style={{ width: '100%', maxWidth: '900px', marginTop: '50px' }}>
      
      <div className="text-center mb-5">
        <h1 className="mb-1" style={{ color: '#333', fontWeight: 'normal' }}>관리자 사이트</h1>
        <p className="text-muted mb-4">시스템을 관리하고 운영하세요</p>
      </div>
      
      {isAdminLoggedIn ? LoggedInContent : LoginContent}

      <Row>
        {ADMIN_CARDS.map((card, index) => (
          <AdminCard 
            key={index} 
            data={card} 
            isLoggedIn={isAdminLoggedIn} 
            onClick={() => handleManageClick(card.title)} 
          />
        ))}
      </Row>
    </Container>
  );
}

export default AdminPage;