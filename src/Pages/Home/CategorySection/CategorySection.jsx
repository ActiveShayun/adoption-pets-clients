import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AllPets from '../../../UseHooks/AllPets/AllPets';
import Pets from './Pets';
import { getAllPets } from '../../../UseHooks/getAllPets/getAllPets';


const CategorySection = () => {
    const { data } = AllPets()

    const dogs = data?.pages[0]?.filter(dog => dog.petsCategory === 'dog').slice(0, 5)
    const fishes = data?.pages[0]?.filter(fish => fish.petsCategory === 'fish').slice(0, 4)
    const rabbits = data?.pages[0]?.filter(rabbit => rabbit.petsCategory === 'rabbits')
    // console.log('cats'.cats, dogs);
    const cats = data?.pages[0]?.filter(c => c.petsCategory === 'cat').slice(0, 4)
    console.log('CategorySection', dogs);

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