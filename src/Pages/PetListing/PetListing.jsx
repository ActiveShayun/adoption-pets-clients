import React from 'react';
import AllPets from '../../UseHooks/AllPets/AllPets';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import PetCard from './PetCard';

const PetListing = () => {
    const [allPets, refetch, loading, search, setSearch, category, setCategory] = AllPets();
    const adoptedPets = allPets?.filter(pets => pets.adopted !== 'Adopted')
    const descendingWithDate = [...adoptedPets].sort((a, b) => new Date(b.deadline) - new Date(a.deadline))

    // console.log('adoptedPets', descendingWithDate);
    const reset = () => {
        // console.log('refetch', allPets);
        allPets
    }
    // console.log(search);
    return (
        <div className='pt-20 mb-8'>
            <SectionTitle subheading={'Available Pets For Adoption'} heading={'Gets Pets Here'} />
            <div className=' flex items-center gap-5 justify-center'>
                <div className='flex items-center gap-4'>
                    <div class="max-w-sm mx-auto">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            id="countries"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose a category</option>
                            <option value="cat">Cats</option>
                            <option value="dog">Dog</option>
                            <option value="rabbits">Rabbits</option>
                            <option value="fish">Fish</option>
                        </select>
                    </div>
                    {/* search bar */}
                    <div class="flex items-center max-w-sm mx-auto">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                </svg>
                            </div>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                id="simple-search"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search pets name..." required />
                        </div>
                        <button
                            onClick={reset}
                            type="submit"
                            class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </div>

            {
                loading ? (
                    <div>
                        <div class="flex items-center justify-center  border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                        </div>
                    </div>
                ) :
                    adoptedPets.length ? (
                        <div className='grid grid-cols-1 lg:grid-cols-3 justify-center gap-4 mt-8'>
                            {
                                descendingWithDate?.map(pet =>
                                    <PetCard
                                        pet={pet}
                                        key={pet._id}
                                    />
                                )
                            }
                        </div>
                    )
                        : <p className='text-center text-2xl mt-4'>No data found</p>
            }

        </div>
    );
};

export default PetListing;