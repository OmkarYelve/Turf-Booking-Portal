import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { store } from './redux/store';
import Navbar from './components/Navbar';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GroundDetails from './pages/GroundDetails';
import Bookings from './pages/Bookings';
import Grounds from './pages/Grounds';
import Contact from './pages/Contact';
// import Footer from './pages/Footer';

function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <Router>
        {/* ✅ Navbar shows on all pages */}
        <Navbar />

        {/* ✅ Main content wrapper for GSAP ScrollTrigger */}
        <div id="main">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ground/:id" element={<GroundDetails />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/grounds" element={<Grounds />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        {/* Optional footer */}
        {/* <Footer /> */}
      </Router>
    </Provider>
  );
}

export default App;
