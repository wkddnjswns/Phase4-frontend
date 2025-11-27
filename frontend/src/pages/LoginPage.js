import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';

const LoggedInInfoCard = ({ userName, onLogout }) => (
  <Card className="p-4 mb-4 shadow-sm" style={{ border: 'none', backgroundColor: 'white' }}>
    <h5 className="mb-3" style={{ fontWeight: 'bold' }}>로그인 정보</h5>
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <div style={{ color: '#555', fontSize: '0.9em' }}>로그인된 계정</div>
        <div style={{ fontWeight: 'bold' }}>{userName}</div> 
      </div>
      <Button 
        variant="light" 
        onClick={onLogout}
        style={{ color: 'black', border: '1px solid #ddd' }}
      >
        로그아웃
      </Button>
    </div>
  </Card>
);


function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setUsername('as'); 
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
      setIsLoggedIn(false);
      setUsername('');
  };

  return (
    <Container style={{ width: '100%', maxWidth: '700px' }}>
      
      {isLoggedIn ? (
        <LoggedInInfoCard userName={username} onLogout={handleLogout} />
      ) : (
        <Card className="p-4 mb-4 shadow-sm" style={{ border: 'none', backgroundColor: 'white' }}>
          <h5 className="mb-3" style={{ fontWeight: 'bold' }}>로그인</h5>
          <Form onSubmit={handleLogin}>
            
            <Form.Group className="mb-3">
              <Form.Label>이메일</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="이메일을 입력하세요" 
                style={{ backgroundColor: '#f0f0f0', border: 'none', padding: '12px' }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="비밀번호를 입력하세요" 
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
      )}

      <Row className="g-3">
        <Col>
          <Button variant="dark" className="w-100" style={{ backgroundColor: 'black', color: 'white', padding: '20px', minHeight: '80px' }}>
            검색하기
          </Button>
        </Col>

        <Col>
          <Button variant="light" className="w-100" style={{ backgroundColor: '#f0f0f0', color: '#333', padding: '20px', minHeight: '80px' }}>
            내 정보 보기
          </Button>
        </Col>

        <Col>
          <Button variant="dark" className="w-100" style={{ backgroundColor: 'black', color: 'white', padding: '20px', minHeight: '80px' }}>
            플레이리스트 찾아보기
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;