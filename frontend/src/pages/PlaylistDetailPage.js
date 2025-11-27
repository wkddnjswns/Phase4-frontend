import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Table } from 'react-bootstrap';

const PLAYLIST_DATA_MOCK = {
  '1': { title: 'K-Pop 메가 히트', owner: '음악큐레이터', songs: 150, details: [
      { song: 'Dynamite', artist: 'BTS' },
      { song: 'Butter', artist: 'BTS' },
      { song: 'Love Dive', artist: 'IVE' },
    ]
  },
  '2': { title: '발라드 명곡 컬렉션', owner: '감성DJ', songs: 145, details: [
      { song: 'Good Day', artist: 'IU' },
      { song: 'Missing You', artist: 'TOY' },
      { song: 'Always', artist: 'Yoon Mi-rae' },
    ]
  },
  '3': { title: '운동할 때 듣는 음악', owner: '피트니스왕', songs: 140, details: [
      { song: 'Power', artist: 'EXO' },
      { song: 'Fire', artist: 'BTS' },
      { song: 'Boom Boom', artist: 'Momoland' },
    ]
  },
  '4': { title: '카페 분위기 재즈', owner: '재즈리버', songs: 135, details: [
      { song: 'Autumn Leaves', artist: 'Miles Davis' },
      { song: 'Take Five', artist: 'Dave Brubeck' },
      { song: 'Lullaby of Birdland', artist: 'Sarah Vaughan' },
    ]
  },
  '5': { title: '출퇴근길 팝송', owner: '음악통근러', songs: 130, details: [
      { song: 'Shape of You', artist: 'Ed Sheeran' },
      { song: 'Blinding Lights', artist: 'The Weeknd' },
      { song: 'Uptown Funk', artist: 'Mark Ronson' },
    ]
  },
  '6': { title: '힙합 모음집', owner: '힙합헤드', songs: 125, details: [
      { song: 'Gangnam Style', artist: 'PSY' },
      { song: 'Nunu Nana', artist: 'Jessi' },
      { song: 'Any Song', artist: 'Zico' },
    ]
  },
  '7': { title: '락 레전드', owner: '락스타', songs: 120, details: [
      { song: 'Bohemian Rhapsody', artist: 'Queen' },
      { song: 'Stairway to Heaven', artist: 'Led Zeppelin' },
      { song: 'Smells Like Teen Spirit', artist: 'Nirvana' },
    ]
  },
  '8': { title: '인디 음악 탐험', owner: '인디러버', songs: 115, details: [
      { song: 'How can I love the heartbreak, you\'re the one I love', artist: 'AKMU' },
      { song: 'Through the Night', artist: 'IU' },
      { song: 'Busan Vacance', artist: 'Busker Busker' },
    ]
  },
  '9': { title: 'EDM 파티 믹스', owner: '클럽왕', songs: 110, details: [
      { song: 'Levels', artist: 'Avicii' },
      { song: 'Clarity', artist: 'Zedd' },
      { song: 'Wake Me Up', artist: 'Avicii' },
    ]
  },
  '10': { title: '클래식 명작', owner: '고전애호가', songs: 105, details: [
      { song: 'Symphony No. 5', artist: 'Beethoven' },
      { song: 'Moonlight Sonata', artist: 'Beethoven' },
      { song: 'Canon in D', artist: 'Pachelbel' },
    ]
  },
};

const SPOTIFY_LINK = 'https://open.spotify.com/';

function PlaylistDetailPage() {
  const navigate = useNavigate();
  const { rank } = useParams();

  const data = PLAYLIST_DATA_MOCK[rank] || PLAYLIST_DATA_MOCK['1']; 
  const detailSongs = data.details;

  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleLinkClick = () => {
    window.open(SPOTIFY_LINK, '_blank');
  };

  return (
    <Container style={{ maxWidth: '900px' }}>
      <div className="mb-4 d-flex align-items-center">
        <Button variant="link" onClick={handleGoBack} className="p-0" style={{ color: '#333' }}>
          ← 플레이리스트 목록으로
        </Button>
      </div>
      
      <div className="mb-5">
        <h2 className="mb-1" style={{ fontWeight: 'bold' }}>{data.title}</h2>
        <p className="text-muted" style={{ fontSize: '0.9em' }}>
          소유자: {data.owner} | 총 {data.songs}곡
        </p>
      </div>

      <Table borderless className="mb-5">
        <thead style={{ color: '#555' }}>
          <tr>
            <th className="p-0 pb-2 border-bottom" style={{ width: '50%' }}>곡명</th>
            <th className="p-0 pb-2 border-bottom" style={{ width: '30%' }}>아티스트</th>
            <th className="p-0 pb-2 border-bottom" style={{ width: '20%' }}>링크</th>
          </tr>
        </thead>
        <tbody>
          {detailSongs.map((song, index) => (
            <tr key={index}>
              <td className="p-0 py-2">{song.song}</td>
              <td className="p-0 py-2">{song.artist}</td>
              <td className="p-0 py-2">
                <Button 
                  variant="link" 
                  onClick={handleLinkClick} 
                  className="p-0" 
                  style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.9em' }}
                >
                  <span style={{ fontSize: '1em' }}>{'⇗'}</span> 링크
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </Container>
  );
}

export default PlaylistDetailPage;