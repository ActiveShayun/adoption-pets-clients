import React from 'react';
import AllPets from '../../UseHooks/AllPets/AllPets';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import PetCard from './PetCard';
import { LuLoader } from "react-icons/lu";
import PetsFilter from '../../Shared/FilterPets/PetsFilter';
import { useLocation } from 'react-router-dom';

const PetListing = () => {
    const {
        data,
        loading,
        search,
        setSearch,
        category,
        setCategory,
        setSort,
        sort,
        showSpinner,
        isFetchingNextPage
    } = AllPets();
    console.log('allPets PetListing ', data?.pages[0]);
    const location = useLocation()
    console.log(location.pathname);

    // const adoptedPets = allPets?.filter(pets => pets.adopted !== 'Adopted')
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
            <PetsFilter
                reset={reset}
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                sort={sort}
                setSort={setSort}
            />
            {
                showSpinner ? <LuLoader
                    className='flex justify-center w-full animate-spin text-5xl' />
                    :
                    <div className='grid grid-cols-1 lg:grid-cols-4 justify-center gap-4 mt-8'>
                        {data?.pages.map((page, i) => (
                            <React.Fragment key={i}>
                                {page.map((pet) => (
                                    <PetCard key={pet._id} pet={pet} />
                                ))}
                            </React.Fragment>
                        ))}

                    </div>
            }


            {isFetchingNextPage &&
                <LuLoader className='flex justify-center w-full animate-spin
            text-4xl text-green-800 mb-28' />}

        </div>
    );
};

export default PetListing;