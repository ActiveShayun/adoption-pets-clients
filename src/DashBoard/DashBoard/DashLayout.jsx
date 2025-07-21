
import { Outlet } from 'react-router-dom';
import UserCategory from '../UserCategory/UserCategory';
import AdminCategory from '../AdminCategory/AdminCategory';
import AdminUse from '../../UseHooks/AdminUse/AdminUse';
import UseAuth from '../../AuthProvider/UseAuth';
import { getGreetingMessage } from '../../utiity/getGreetingMessage';


const DashLayout = () => {
    const { message, colorClass } = getGreetingMessage()
    const { user } = UseAuth()
    const [isAdmin] = AdminUse()
    //  console.log('isAdmin',isAdmin);

    // console.log('isAdmin navbaR', isAdmin);
    return (
        <div className='bg-[#F2F2F2] max-w-screen-xl mx-auto rounded-md'>
            <div className='lg:max-w-7xl mx-auto'>
                <section className='grid lg:grid-cols-12 lg:gap-10'>
                    <aside className='lg:col-span-3  overflow-y-auto'>
                        {
                            isAdmin ?
                                <div>
                                    <AdminCategory />
                                </div>
                                :
                                <div className='bg-[#EAF6FF]'>
                                    <UserCategory />
                                </div>
                        }

                    </aside>
                    <section className='lg:col-span-9 w-full p-4 overflow-x-auto'>
                        <h2 className='text-3xl mb-4'>Hi {user?.displayName}
                            <span className={`${colorClass}`}> {message}</span>
                        </h2>
                        <Outlet />
                    </section>
                </section>
            </div>
        </div>
    );
};

export default DashLayout;