import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'

import Landing from './pages/Landing'
import Login from './pages/Login'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import GroundDetails from './pages/GroundDetails';
import Bookings from './pages/Bookings';
import Grounds from './pages/Grounds';
import Footer from './pages/Footer';
import Signup from './pages/Signup';
import Contact from './pages/Contact';

function App() {

  return (
    <>
    <div >
      <Provider store={store}>
        <Toaster />
        <Router>
          
          <Routes>
            <Route path="/" exact element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ground/:id" element={<GroundDetails />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/grounds" element={<Grounds />} />
            <Route path='/contact' element={<Contact/>}  />
          </Routes>
        </Router>
        {/* <Footer /> */}
      </Provider>
      </div>
    </>
  )
}

export default App
