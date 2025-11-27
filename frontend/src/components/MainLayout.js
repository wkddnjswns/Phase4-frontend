import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      <h1 className="mb-1" style={{ color: '#333', fontWeight: 'normal' }}>사용자 사이트</h1>
      <p className="text-muted mb-4">플레이리스트를 검색하고 관리하세요</p>

      <Outlet />
    </div>
  );
}

export default MainLayout;