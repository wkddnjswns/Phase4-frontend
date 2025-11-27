import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Table, Card } from 'react-bootstrap';

const MOCK_RESULTS = [
    { id: 'AR001', name: 'BTS', gender: '그룹' },
    { id: 'AR002', name: 'IU', gender: '여성' },
    { id: 'AR003', name: '박효신', gender: '남성' },
    { id: 'AR004', name: '아이유', gender: '여성' },
    { id: 'AR005', name: 'NewJeans', gender: '그룹' },
];

const GENDER_OPTIONS = ['전체', '남성', '여성'];
const ROLE_OPTIONS = ['전체', '가수', '작곡사', '작사가'];

const SearchResultTable = ({ results }) => (
    <div className="mt-5">
        <h4 style={{ fontWeight: 'bold' }}>검색 결과 ({results.length}건)</h4>
        <div className="mt-3 p-4" style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <Table borderless responsive>
                <thead style={{ color: '#555' }}>
                    <tr>
                        <th className="p-0 pb-2 border-bottom" style={{ width: '30%' }}>아티스트 ID</th>
                        <th className="p-0 pb-2 border-bottom" style={{ width: '40%' }}>아티스트명</th>
                        <th className="p-0 pb-2 border-bottom" style={{ width: '30%' }}>성별</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((item) => (
                        <tr key={item.id}>
                            <td className="p-0 py-2">{item.id}</td>
                            <td className="p-0 py-2">{item.name}</td>
                            <td className="p-0 py-2">{item.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    </div>
);

function ArtistSearchPage() {
    const navigate = useNavigate();
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setResults(MOCK_RESULTS);
        setShowResults(true);
    };

    return (
        <Container style={{ maxWidth: '900px' }}>
            <div className="mb-4 d-flex align-items-center">
                <Button variant="link" onClick={handleGoBack} className="p-0" style={{ color: '#333' }}>
                    ← 뒤로가기
                </Button>
            </div>
            
            <h2 className="mb-4" style={{ fontWeight: 'bold' }}>아티스트 검색</h2>

            <Card className="p-4 shadow-sm" style={{ border: 'none', backgroundColor: 'white' }}>
                <Form onSubmit={handleSearch}>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold' }}>아티스트명</Form.Label>
                        <Form.Control type="text" placeholder="아티스트명 입력" className="mb-2" />
                        <div className="d-flex">
                            <Form.Check type="radio" label="포함" name="artistNameMatch" id="artistNameInclude" defaultChecked className="me-3" />
                            <Form.Check type="radio" label="완전일치" name="artistNameMatch" id="artistNameExact" />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold' }}>성별</Form.Label>
                        <Form.Select defaultValue="전체">
                            {GENDER_OPTIONS.map(gender => <option key={gender}>{gender}</option>)}
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-5">
                        <Form.Label style={{ fontWeight: 'bold' }}>역할</Form.Label>
                        <Form.Select defaultValue="전체">
                            {ROLE_OPTIONS.map(role => <option key={role}>{role}</option>)}
                        </Form.Select>
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

export default ArtistSearchPage;