import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AllPets from '../../../UseHooks/AllPets/AllPets';
import Pets from './Pets';
import { useQuery } from '@tanstack/react-query';
import AxiosPublic from '../../../UseHooks/AxiosPublic';


const CategorySection = () => {
    const axiosPublic = AxiosPublic()
    const { data: pets = [] } = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allPetsHome')
            console.log(res.data);
            return res.data
        }
    })

    console.log("📦 All Pets Data:", pets)

    const dogs = pets?.filter(dog => dog.petsCategory === 'dog').slice(0, 4)
    const fishes = pets?.filter(fish => fish.petsCategory === 'fish').slice(0, 4)
    const rabbits = pets?.filter(rabbit => rabbit.petsCategory === 'rabbits')
    // console.log('cats'.cats, dogs);
    const cats = pets?.filter(c => c.petsCategory === 'cat').slice(0, 4)
    console.log('dogs', dogs);

    return (
        <div className='text-center mt-10'>

            <Tabs>
                <TabList>
                    <Tab>
                        <div className='text-lg font-semibold'>Dog</div>
                    </Tab>
                    <Tab>
                        <div className='text-lg font-semibold'>Cat</div>
                    </Tab>
                    <Tab>
                        <div className='text-lg font-semibold'>Rabbits</div>
                    </Tab>
                    <Tab>
                        <div className='text-lg font-semibold'>Fish</div>
                    </Tab>
                </TabList>

                <TabPanel>
                    <Pets pets={dogs} />
                </TabPanel>
                <TabPanel>
                    <Pets pets={cats} />
                </TabPanel>
                <TabPanel>
                    <Pets pets={rabbits} />
                </TabPanel>
                <TabPanel>
                    <Pets pets={fishes} />
                </TabPanel>

            </Tabs>
        </div>
    );
};

export default CategorySection;