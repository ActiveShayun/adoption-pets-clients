import React from 'react';
import AllPets from '../../UseHooks/AllPets/AllPets';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import PetCard from './PetCard';
import { LoaderIcon } from 'react-hot-toast';

const PetListing = () => {
    const {
        allPets,
        loading,
        search,
        setSearch,
        category,
        setCategory,
        setSort,
        sort
    } = AllPets();
    const adoptedPets = allPets?.filter(pets => pets.adopted !== 'Adopted')
    // const descendingWithDate = [...adoptedPets].sort((a, b) => new Date(b.deadline) - new Date(a.deadline))

    console.log('sort', sort);
    const reset = () => {
        setSearch('');
        setCategory('');
        setSort('');
    };
    // console.log(search);
    return (
        <div className='pt-20 mb-8'>
            <SectionTitle subheading={'Available Pets For Adoption'} heading={'Gets Pets Here'} />
            <div className='grid  grid-cols-1 lg:grid-cols-3 items-center w-full gap-4'>
                <div className="">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        id="countries"
                        className="px-4 py-2 rounded-md w-full border border-gray-500">
                        <option value={''}>Choose a category</option>
                        <option value="cat">Cats</option>
                        <option value="dog">Dog</option>
                        <option value="rabbits">Rabbits</option>
                        <option value="fish">Fish</option>
                    </select>
                </div>
                {/* search bar */}
                <div className="w-full flex items-center  gap-4 border border-gray-700 pr-4
                 pl-0 rounded-md bg-white">
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="w-full">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            id="simple-search"
                            className="w-full text-sm p-2
                            "
                            placeholder="Search pets name..." required />
                    </div>
                    <button
                        onClick={reset}
                        type="submit"
                    >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </div>
                {/* sort by age */}
                <div className="">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        id="countries"
                        className="px-4 py-2 rounded-md w-full border border-gray-500">
                        <option value={''}>Sort by Age</option>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>


            {
                loading ? (
                    <div>
                        <div><LoaderIcon className='animate-spin text-3xl' /></div>
                    </div>
                ) :
                    adoptedPets.length ? (
                        <div className='grid grid-cols-1 lg:grid-cols-4 justify-center gap-4 mt-8'>
                            {
                                adoptedPets?.map(pet =>
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