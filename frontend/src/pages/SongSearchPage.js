import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Table, InputGroup, Card, Alert } from 'react-bootstrap';

const MOCK_RESULTS = [
    { id: 'TR002', title: 'Butter', duration: '2:45', release: '2021-05-21', source: 'spotify', link: 'https://open.spotify.com/' },
    { id: 'TR005', title: 'Celebrity', duration: '3:15', release: '2021-01-27', source: 'youtube', link: 'https://open.spotify.com/' },
    { id: 'TR001', title: 'Dynamite', duration: '3:45', release: '2020-08-21', source: 'youtube', link: 'https://open.spotify.com/' },
    { id: 'TR003', title: 'Love Dive', duration: '3:15', release: '2022-04-05', source: 'youtube', link: 'https://open.spotify.com/' },
    { id: 'TR004', title: 'Permission to Dance', duration: '3:08', release: '2021-07-09', source: 'spotify', link: 'https://open.spotify.com/' },
];

const SORT_FIELDS = ['곡명', '아티스트명', '재생시간', '발매일'];
const SORT_ORDERS = ['오름차순', '내림차순'];
const SPOTIFY_LINK = 'https://open.spotify.com/';

const durationToSeconds = (m, s) => (parseInt(m || 0) * 60) + parseInt(s || 0);

const dateToTimestamp = (y, m, d) => {
    if (!y || !m || !d) return NaN;
    const date = new Date(y, m - 1, d);
    return date.getTime();
};

const isValidDate = (y, m, d) => {
    if (!y && !m && !d) return true;
    if (!y || !m || !d) return false;
    
    const date = new Date(y, m - 1, d);
    
    return date.getFullYear() === parseInt(y) && date.getMonth() === parseInt(m) - 1 && date.getDate() === parseInt(d);
};

const SearchResultTable = ({ results }) => {
    const handleLinkClick = () => {
        window.open(SPOTIFY_LINK, '_blank');
    };

    return (
        <div className="mt-5">
            <h4 style={{ fontWeight: 'bold' }}>검색 결과 ({results.length}건)</h4>
            <div className="mt-3 p-4" style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <Table borderless responsive>
                    <thead style={{ color: '#555' }}>
                        <tr>
                            <th className="p-0 pb-2 border-bottom" style={{ width: '15%' }}>곡 ID</th>
                            <th className="p-0 pb-2 border-bottom" style={{ width: '25%' }}>곡명</th>
                            <th className="p-0 pb-2 border-bottom" style={{ width: '15%' }}>재생시간</th>
                            <th className="p-0 pb-2 border-bottom" style={{ width: '15%' }}>발매일</th>
                            <th className="p-0 pb-2 border-bottom" style={{ width: '15%' }}>제공원</th>
                            <th className="p-0 pb-2 border-bottom" style={{ width: '15%' }}>제공원 링크</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item) => (
                            <tr key={item.id}>
                                <td className="p-0 py-2">{item.id}</td>
                                <td className="p-0 py-2">{item.title}</td>
                                <td className="p-0 py-2">{item.duration}</td>
                                <td className="p-0 py-2">{item.release}</td>
                                <td className="p-0 py-2">{item.source}</td>
                                <td className="p-0 py-2">
                                    <Button 
                                        variant="link" 
                                        onClick={handleLinkClick} 
                                        className="p-0" 
                                        style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.9em' }}
                                    >
                                        링크 {'⇗'}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

function SongSearchPage() {
    const navigate = useNavigate();
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [durationMinM, setDurationMinM] = useState('');
    const [durationMinS, setDurationMinS] = useState('');
    const [durationMaxM, setDurationMaxM] = useState('');
    const [durationMaxS, setDurationMaxS] = useState('');

    const [releaseMinY, setReleaseMinY] = useState('');
    const [releaseMinM, setReleaseMinM] = useState('');
    const [releaseMinD, setReleaseMinD] = useState('');
    const [releaseMaxY, setReleaseMaxY] = useState('');
    const [releaseMaxM, setReleaseMaxM] = useState('');
    const [releaseMaxD, setReleaseMaxD] = useState('');


    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setShowResults(false);

        const minMsg = '최소값과 최대값 설정이 잘못되었습니다';
        const dateMsg = '발매일 날짜 설정이 잘못되었습니다';

        const totalDurationMin = durationToSeconds(durationMinM, durationMinS);
        const totalDurationMax = durationToSeconds(durationMaxM, durationMaxS);

        if (totalDurationMin > totalDurationMax) {
            const maxInputsEmpty = !durationMaxM && !durationMaxS;
            if (!maxInputsEmpty) {
                setErrorMessage(minMsg);
                setTimeout(() => setErrorMessage(''), 3000);
                return;
            }
        }

        if (!isValidDate(releaseMinY, releaseMinM, releaseMinD) || !isValidDate(releaseMaxY, releaseMaxM, releaseMaxD)) {
            setErrorMessage(dateMsg);
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }

        const minTime = dateToTimestamp(releaseMinY, releaseMinM, releaseMinD);
        const maxTime = dateToTimestamp(releaseMaxY, releaseMaxM, releaseMaxD);
        
        const hasMinInput = releaseMinY || releaseMinM || releaseMinD;
        const hasMaxInput = releaseMaxY || releaseMaxM || releaseMaxD;

        if (hasMinInput && hasMaxInput && minTime > maxTime) {
            setErrorMessage(minMsg);
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }


        setResults(MOCK_RESULTS);
        setShowResults(true);
    };

    const DurationInputGroup = ({ label, isMin }) => {
        const m = isMin ? durationMinM : durationMaxM;
        const setM = isMin ? setDurationMinM : setDurationMaxM;
        const s = isMin ? durationMinS : durationMaxS;
        const setS = isMin ? setDurationMinS : setDurationMaxS;

        return (
            <Form.Group as={Col} md={6} className="mb-3">
                <Form.Label>{label}</Form.Label>
                <Row className="g-2">
                    <Col>
                        <InputGroup>
                            <Form.Control type="number" placeholder="분" min="0" value={m} onChange={(e) => setM(e.target.value)} />
                            <InputGroup.Text>분</InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <Form.Control type="number" placeholder="초" min="0" max="59" value={s} onChange={(e) => setS(e.target.value)} />
                            <InputGroup.Text>초</InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Row>
            </Form.Group>
        );
    };
    
    const ReleaseDateInputGroup = ({ label, isMin }) => {
        const y = isMin ? releaseMinY : releaseMaxY;
        const setY = isMin ? setReleaseMinY : setReleaseMaxY;
        const m = isMin ? releaseMinM : releaseMaxM;
        const setM = isMin ? setReleaseMinM : setReleaseMaxM;
        const d = isMin ? releaseMinD : releaseMaxD;
        const setD = isMin ? setReleaseMinD : setReleaseMaxD;

        return (
            <Form.Group as={Col} md={6} className="mb-3">
                <Form.Label>{label}</Form.Label>
                <Row className="g-2">
                    <Col>
                        <InputGroup>
                            <Form.Control type="number" placeholder="년" max="2100" value={y} onChange={(e) => setY(e.target.value)} />
                            <InputGroup.Text>년</InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <Form.Control type="number" placeholder="월" min="1" max="12" value={m} onChange={(e) => setM(e.target.value)} />
                            <InputGroup.Text>월</InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <Form.Control type="number" placeholder="일" min="1" max="31" value={d} onChange={(e) => setD(e.target.value)} />
                            <InputGroup.Text>일</InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Row>
            </Form.Group>
        );
    };


    return (
        <Container style={{ maxWidth: '900px' }}>
            <div className="mb-4 d-flex align-items-center">
                <Button variant="link" onClick={handleGoBack} className="p-0" style={{ color: '#333' }}>
                    ← 뒤로가기
                </Button>
            </div>
            
            <h2 className="mb-4" style={{ fontWeight: 'bold' }}>악곡 검색</h2>
            
            {errorMessage && (
                <Alert 
                    variant="danger" 
                    className="position-fixed top-0 start-50 translate-middle-x mt-3" 
                    style={{ zIndex: 2000, width: '100%', maxWidth: '400px' }}
                    onClose={() => setErrorMessage('')}
                    dismissible
                >
                    {errorMessage}
                </Alert>
            )}

            <Card className="p-4 shadow-sm" style={{ border: 'none', backgroundColor: 'white' }}>
                <Form onSubmit={handleSearch}>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold' }}>곡명</Form.Label>
                        <Form.Control type="text" placeholder="곡명 입력" className="mb-2" />
                        <div className="d-flex">
                            <Form.Check type="radio" label="포함" name="songMatch" id="songInclude" defaultChecked className="me-3" />
                            <Form.Check type="radio" label="완전일치" name="songMatch" id="songExact" />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold' }}>아티스트명</Form.Label>
                        <Form.Control type="text" placeholder="아티스트명 입력" className="mb-2" />
                        <div className="d-flex">
                            <Form.Check type="radio" label="포함" name="artistMatch" id="artistInclude" defaultChecked className="me-3" />
                            <Form.Check type="radio" label="완전일치" name="artistMatch" id="artistExact" />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold' }}>재생시간</Form.Label>
                        <Row>
                            <DurationInputGroup label="최소:" isMin={true} />
                            <DurationInputGroup label="최대:" isMin={false} />
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold' }}>제공원</Form.Label>
                        <Form.Control type="text" placeholder="제공원 입력 (youtube, spotify)" className="mb-2" />
                        <div className="d-flex">
                            <Form.Check type="radio" label="포함" name="sourceMatch" id="sourceInclude" defaultChecked className="me-3" />
                            <Form.Check type="radio" label="완전일치" name="sourceMatch" id="sourceExact" />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-5">
                        <Form.Label style={{ fontWeight: 'bold' }}>발매일</Form.Label>
                        <Row>
                            <ReleaseDateInputGroup label="최소:" isMin={true} />
                            <ReleaseDateInputGroup label="최대:" isMin={false} />
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-5">
                        <Form.Label style={{ fontWeight: 'bold' }}>정렬 기준</Form.Label>
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Label className="text-muted" style={{ fontSize: '0.8em' }}>정렬 필드</Form.Label>
                                <Form.Select>
                                    {SORT_FIELDS.map(field => <option key={field}>{field}</option>)}
                                </Form.Select>
                            </Col>
                            <Col md={6}>
                                <Form.Label className="text-muted" style={{ fontSize: '0.8em' }}>정렬 순서</Form.Label>
                                <Form.Select>
                                    {SORT_ORDERS.map(order => <option key={order}>{order}</option>)}
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100" style={{ backgroundColor: 'black', color: 'white', padding: '12px' }}>
                        검색
                    </Button>
                </Form>
            </Card>

            {showResults && <SearchResultTable results={results} />}

        </Container>
    );
}

export default SongSearchPage;