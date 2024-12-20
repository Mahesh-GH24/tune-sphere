
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import TicketMaster from './pages/TicketMaster';
import Spotify from './pages/SpotifyPage';
import Footer from './Components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/spotify" element={<Spotify />} />
        <Route path="/ticket" element={<TicketMaster />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

