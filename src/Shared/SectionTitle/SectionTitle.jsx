import secLogo from '../../../src/assets/secLogo (2).jpg'

const SectionTitle = ({ heading, subheading }) => {
    return (
        <div className="text-center  lg:w-4/4 mx-auto mb-4">
            <h2 className="text-2xl font-medium mb-1 text-[#6F6F97]">----{subheading}----</h2>
            <h3 className="text-4xl font-bold">{heading}</h3>
            <img src={secLogo} className='w-[40px] mx-auto mt-3' alt="" />
        </div>
    );
};

export default SectionTitle;