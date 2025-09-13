import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './screens/HomePage/HomePage';
import { QuestionPaperSetup } from './screens/QuestionPaperSetup/QuestionPaperSetup';
import { MarksSetup } from './screens/MarksSetup/MarksSetup';
import { QuestionPaperPreview } from './screens/QuestionPaperPreview/QuestionPaperPreview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/question-paper-setup/:className" element={<QuestionPaperSetup />} />
        <Route path="/marks-setup/:className" element={<MarksSetup />} />
        <Route path="/question-paper-preview/:className" element={<QuestionPaperPreview />} />
      </Routes>
    </Router>
  );
}

export default App;