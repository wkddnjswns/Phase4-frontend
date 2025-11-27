import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import PlaylistPage from './pages/PlaylistPage';
import PlaylistDetailPage from './pages/PlaylistDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="playlists" element={<PlaylistPage />} />
          <Route path="playlists/:rank" element={<PlaylistDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;