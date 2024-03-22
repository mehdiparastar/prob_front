// pages
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import Maintenance from '../pages/Maintenance/Maintenance';
import NotFound from '../pages/NotFound/NotFound';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import MSDetails from '../pages/MSDetails/MSDetails';


export const RoutesList: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* public routes */}
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="notfound" element={<NotFound />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="about" element={<About />} />
        <Route path="msDetails" element={<MSDetails />} />


        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};


