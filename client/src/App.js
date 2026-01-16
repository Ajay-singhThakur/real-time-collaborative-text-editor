import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import EditorPage from './EditorPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Requirement: Landing Page with "Create Document" button */}
        <Route path="/" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Real-Time Editor</h1>
            <button onClick={() => window.location.href=`/doc/${uuidV4()}`}>
              Create Document
            </button>
          </div>
        } />
        {/* Requirement: Redirect to unique URL */}
        <Route path="/doc/:id" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;