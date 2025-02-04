
import { Outlet } from 'react-router-dom';
import UserCategory from '../UserCategory/UserCategory';
import AdminCategory from '../AdminCategory/AdminCategory';
import AdminUse from '../../UseHooks/AdminUse/AdminUse';


const DashLayout = () => {

const [isAdmin] = AdminUse()
//  console.log('isAdmin',isAdmin);

    // console.log('isAdmin navbaR', isAdmin);
    return (
        <div className='bg-gradient-to-tr from-green-400 to-yellow-400
         px-4 py-8  max-w-screen-xl mx-auto rounded-md'>
            <div className='lg:max-w-7xl mx-auto'>
                <section className='grid lg:grid-cols-12 lg:gap-10'>
                    <aside className='lg:col-span-3'>
                        {
                            isAdmin ?
                                <div>
                                    <AdminCategory />
                                </div>
                                :
                                <div className=''>
                                    <UserCategory />
                                </div>
                        }

                    </aside>
                    <section className='lg:col-span-9'>
                        <Outlet />
                    </section>
                </section>
            </div>
        </div>
    );
};

export default DashLayout;