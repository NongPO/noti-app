import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/Contact'; // นำเข้าหน้านี้
import Aboutus from '../src/pages/Aboutus'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
        <Route path="/" element={<AboutPage />} />
          <Route path='/Aboutus' element={<Aboutus/>} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/Aboutus" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App
