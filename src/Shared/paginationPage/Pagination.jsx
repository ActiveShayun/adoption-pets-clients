import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";


const Pagination = ({ pages, currentPage, setCurrentPage, itemsPerPage, handleChancePerPage, handleNextPage, handlePrevPage }) => {
    console.log('currentPage', currentPage);
    return (
        <div>
            <div className="flex gap-6 items-center p-4">
                {/* prev button */}
                <div>
                    <button onClick={handlePrevPage} 
                        className=" text-black  w-[25px] h-[25px] bg-orange-500 rounded-full flex items-center justify-center">
                        <FaArrowCircleLeft />
                    </button>
                </div>
                {/* all pages */}
                <div>
                    {
                        pages?.map(page => {
                            return (
                                <button key={page} onClick={() => setCurrentPage(page)}
                                    className={`${currentPage === page ? 'bg-yellow-600' : ''} 
                                 bg-black text-white
                             mr-3 w-[25px] h-[25px] rounded-full`}>
                                    {page}
                                </button>
                            )
                        })
                    }
                </div>
                {/* select page */}
                <div>
                    <select 
                     value={itemsPerPage} onChange={handleChancePerPage}
                        defaultValue="Small"
                        className="bg-orange-600 w-[26px] h-[26px] rounded-full text-white">
                        <option value={'5'}>5</option>
                        <option value={'10'}>10</option>
                        <option value={'20'}>20</option>
                        <option value={'50'}>50</option>
                    </select>
                </div>
                {/* next button*/}
                <div>
                     <button onClick={handleNextPage}
                        className=" text-black w-[25px] h-[25px] bg-orange-500 rounded-full flex items-center justify-center">
                        <FaArrowCircleRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;