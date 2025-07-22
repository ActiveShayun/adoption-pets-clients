


// /components/PetFilters.jsx
const PetsFilter = ({ reset, search, setSearch, category, setCategory, sort, setSort }) => {
    return (
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
            <div className="w-full flex items-center  gap-4 border border-gray-700 
                 pl-0 rounded-md bg-white px-4">
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
                <button className='block'
                    onClick={reset}
                    type="submit"
                >
                    Reset
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
    );
};

export default PetsFilter;
