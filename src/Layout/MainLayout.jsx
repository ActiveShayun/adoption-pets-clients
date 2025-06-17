
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='bg-[#EDF6FF] px-4 '>
            <Navbar />
            <Outlet />
            <Footer />
        </div >
    );
};

export default MainLayout;