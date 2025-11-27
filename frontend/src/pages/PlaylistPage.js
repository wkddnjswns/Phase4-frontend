import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

const PLAYLIST_DATA = [
  { rank: 1, title: 'K-Pop 메가 히트', owner: '음악큐레이터', songs: 150 },
  { rank: 2, title: '발라드 명곡 컬렉션', owner: '감성DJ', songs: 145 },
  { rank: 3, title: '운동할 때 듣는 음악', owner: '피트니스왕', songs: 140 },
  { rank: 4, title: '카페 분위기 재즈', owner: '재즈리버', songs: 135 },
  { rank: 5, title: '출퇴근길 팝송', owner: '음악통근러', songs: 130 },
  { rank: 6, title: '힙합 모음집', owner: '힙합헤드', songs: 125 },
  { rank: 7, title: '락 레전드', owner: '락스타', songs: 120 },
  { rank: 8, title: '인디 음악 탐험', owner: '인디러버', songs: 115 },
  { rank: 9, title: 'EDM 파티 믹스', owner: '클럽왕', songs: 110 },
  { rank: 10, title: '클래식 명작', owner: '고전애호가', songs: 105 },
];

const PlaylistCard = ({ rank, title, owner, songs, navigate }) => {
  const handleDetailClick = () => {
    navigate(`/playlists/${rank}`);
  };
  
  return (
    <Col xs={12} md={6} className="mb-4">
      <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <div 
              style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                backgroundColor: '#9370DB', 
                color: 'white', 
                fontWeight: 'bold', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '0.8em'
              }}
              className="me-2"
            >
              {rank}
            </div>
            <h5 className="mb-0" style={{ fontSize: '1em', fontWeight: 'bold' }}>{title}</h5>
          </div>
          <span style={{ color: '#9370DB' }}>🎵</span>
        </div>
        
        <div className="mb-3" style={{ fontSize: '0.9em', color: '#666' }}>
          소유자: {owner}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <span style={{ color: '#9370DB', fontWeight: 'bold', fontSize: '0.9em' }}>{songs}곡</span>
          <Button 
            variant="link" 
            className="p-0" 
            onClick={handleDetailClick}
            style={{ color: '#666', textDecoration: 'none', fontSize: '0.9em' }}
          >
            자세히 보기 →
          </Button>
        </div>
      </div>
    </Col>
  );
};

function PlaylistPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container style={{ maxWidth: '900px' }}>
      <div className="mb-4 d-flex align-items-center">
        <Button variant="link" onClick={handleGoBack} className="p-0" style={{ color: '#333' }}>
          ← 뒤로가기
        </Button>
      </div>
      
      <h2 className="mb-1" style={{ fontWeight: 'bold' }}>플레이리스트 찾아보기</h2>
      <p className="text-muted mb-4" style={{ fontSize: '0.9em' }}>응원 수가 많은 상위 10개 플레이리스트</p>

      <Row>
        {PLAYLIST_DATA.map(playlist => (
          <PlaylistCard key={playlist.rank} {...playlist} navigate={navigate} />
        ))}
      </Row>
    </Container>
  );
}

export default PlaylistPage;