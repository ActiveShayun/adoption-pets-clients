import AxiosPublic from "../UseHooks/AxiosPublic";


export const upLoadImgBBPhoto = async (image) => {
    const axiosPublic = AxiosPublic()
    const upload = new FormData()
    upload.append('image', image)
    console.log('uploadImg', upload);

    const { data } = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOSTING_KEY}`, upload)

    console.log('img bb', data);
    return data.data.url
}