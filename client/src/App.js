import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobList from './components/JobList';
import JobApply from './components/JobApply';
import './app.css';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/apply/:jobId" element={<JobApply />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
