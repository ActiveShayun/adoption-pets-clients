
import { FaPaw, FaHandsHelping, FaHeart, FaShieldAlt } from 'react-icons/fa';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';

const FeaturesSection = () => {
    const features = [
        {
            id: 1,
            icon: <FaPaw size={40} className="text-pink-500" />,
            title: 'Pet Adoption',
            description:
                'Connect with trusted shelters to find loving homes for pets in need.',
        },
        {
            id: 2,
            icon: <FaHandsHelping size={40} className="text-blue-500" />,
            title: 'Volunteer Programs',
            description:
                'Join our community to help care for and support rescued animals.',
        },
        {
            id: 3,
            icon: <FaHeart size={40} className="text-red-500" />,
            title: 'Medical Assistance',
            description:
                'Provide life-saving medical care for injured or sick animals.',
        },
        {
            id: 4,
            icon: <FaShieldAlt size={40} className="text-green-500" />,
            title: 'Safety & Awareness',
            description:
                'Promote safety, education, and animal welfare in your community.',
        },
    ];
    return (
        <div>

            <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionTitle subheading={'Benefits for you'} heading={'Our Features'} />
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        Discover how we make a difference for animals and communities alike.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeaturesSection;