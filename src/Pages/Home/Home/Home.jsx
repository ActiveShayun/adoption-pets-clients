
import Banner from '../../Banner/Banner';
import AboutSection from '../AboutSection/AboutSection';
import CallActionSec from '../CallActionSection/CallActionSec';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import OurService from '../ourService/OurService';
import PetsCategorySection from '../petsCategorySection/PetsCategorySection';

const Home = () => {
    return (
        <div>
                 <Banner/>
                 <OurService/>
                 <PetsCategorySection/>
                 <CallActionSec/>
                 <FeaturesSection/>
                 <AboutSection/>
        </div>
    );
};

export default Home;