import AxiosPublic from "../AxiosPublic";


export const getAllPets = async (search, category, sort, page) => {
    console.log('pageParams', page);
    const axiosPublic = AxiosPublic();
    const take = 10
    const skip = (page - 1) * take
    const res = await axiosPublic.get(
        `/AllPets?search=${search}&category=${category}&sort=${sort}&take=${take}&skip=${skip}`
    );
    // console.log('getAllPets', res.data);
    return res.data;
}