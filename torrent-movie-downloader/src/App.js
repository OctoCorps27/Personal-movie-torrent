import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import { Container } from '@mui/material';

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<SearchPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
