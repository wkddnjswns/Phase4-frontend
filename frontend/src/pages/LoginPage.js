import React from 'react';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';

function LoginPage() {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('로그인 시도...');
  };

  return (
    <Container style={{ width: '100%', maxWidth: '700px' }}>
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

      <Row className="g-3">
        <Col>
          <Button variant="dark" className="w-100" style={{ backgroundColor: 'black', color: 'white', padding: '20px'}}>
            검색하기
          </Button>
        </Col>

        <Col>
          <Button variant="light" className="w-100" style={{ backgroundColor: '#f0f0f0', color: '#333', padding: '20px' }}>
            내 정보 보기
          </Button>
        </Col>

        <Col>
          <Button variant="dark" className="w-100" style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
            플레이리스트 찾아보기
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;