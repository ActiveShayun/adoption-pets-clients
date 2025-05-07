import axios from "axios";


export const upLoadImgBBPhoto = async (image) => {
    const upload = new FormData()
    upload.append('image', image)
    console.log('uploadImg', upload);

    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOSTING_KEY}`, upload)

    console.log('img bb', data.data.url);
    return data.data.url
}