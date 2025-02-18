
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='bg-[#EDF6FF] px-4'>
            <div className="max-w-6xl mx-auto">
              <section className=' fixed z-[454544] lg:w-[1152px] w-full'>  <Navbar /></section>
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;