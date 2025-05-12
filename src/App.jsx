import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<h1>Register</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  ) 
}

export default App
