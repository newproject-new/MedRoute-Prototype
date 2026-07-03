import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import EmergencySelect from './pages/EmergencySelect';
import Results from './pages/Results';
import FacilityDetail from './pages/FacilityDetail';
import Facilities from './pages/Facilities';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="emergency" element={<EmergencySelect />} />
          <Route path="results/:emergencyId" element={<Results />} />
          <Route path="facility/:facilityId" element={<FacilityDetail />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
