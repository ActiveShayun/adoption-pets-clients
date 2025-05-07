import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form';
import { upLoadImgBBPhoto } from '../../utiity/utility';


const Modal = ({ isOpen, setIsOpen, updateProfile }) => {

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = async (data) => {

        const image = data.profilePhoto[0]
        console.log(image, data);

        const uploadImage = await upLoadImgBBPhoto(image)
        console.log('uploadImage', uploadImage);

    }



    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 rounded-lg">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 rounded-lg">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        <DialogTitle className="font-bold">
                            Update Your Account</DialogTitle>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                {/* photo */}
                                <div className='mb-4'>
                                    <label className='block font-semibold mb-2'
                                        htmlFor="">Profile Photo</label>
                                    <input
                                        {...register('profilePhoto', { required: true })}
                                        type="file"
                                        placeholder='Please select your photo' required />
                                </div>
                                {/* name*/}
                                <div className='mb-4'>
                                    <label className='block font-semibold mb-2'
                                        htmlFor="">User Name</label>
                                    <input
                                        defaultValue={updateProfile?.name}
                                        {...register('name', { required: true })}
                                        type="text"
                                        placeholder='Please select your email' required />
                                </div>
                                {/* photo */}
                                <div className=''>
                                    <label className='block font-semibold mb-3'
                                        htmlFor="">User Email </label>
                                    <input
                                        {...register('email', { required: true })}
                                        defaultValue={updateProfile?.email}
                                        type="email" disabled />
                                </div>
                                <button type="submit"
                                    class="text-white mt-5 md:w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Profile</button>
                            </div>
                        </form>
                        <div className="flex gap-4">
                            <button className='border py-1 px-3 rounded-lg'
                                onClick={() => setIsOpen(false)}>Cancel</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default Modal;