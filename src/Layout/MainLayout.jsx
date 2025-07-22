
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
    const location = useLocation()
    const form = location.pathname.includes('petsListing')
    return (
        <div className='bg-[#EDF6FF] px-4'>
            <Navbar />
            <Outlet />
            {form ? '' : <Footer />}

        </div >
    );
};

export default MainLayout;