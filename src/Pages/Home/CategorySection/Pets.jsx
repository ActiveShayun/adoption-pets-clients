import PetsCard from "./PetsCard";


const Pets = ({ pets }) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
                {
                    pets?.map(pet => <PetsCard key={pet._id} pet={pet} />)
                }
            </div>
        </div>
    );
};

export default Pets;