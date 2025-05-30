import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AllPets from '../../../UseHooks/AllPets/AllPets';
import Pets from './Pets';


const CategorySection = () => {
    const [allPets] = AllPets()
    console.log(allPets);
    const dogs = allPets.filter(dog => dog.petsCategory === 'dog').slice(0, 4)
    const fishes = allPets.filter(fish => fish.petsCategory === 'fish').slice(0, 4)
    const rabbits = allPets.filter(rabbit => rabbit.petsCategory === 'rabbits')
    // console.log('cats'.cats, dogs);
    const cats = allPets.filter(c => c.petsCategory === 'cat').slice(0, 4)
    console.log(cats);

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