
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import AxiosSecure from '../../../UseHooks/AxiosSecure/AxiosSecure';


const TriAngleChart = () => {
    const axiosSecure = AxiosSecure();
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
    const getPath = (x, y, width, height) => {
        if ([x, y, width, height].some(v => v == null)) return '';

        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
         ${x + width / 2}, ${y}
         C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
    };
    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const { data: chart = [] } = useQuery({
        queryKey: ['chart'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donation-state');
            console.log('chart', res.data);
            return res.data;
        }
    })


    return (
        <div className='lg:w-[600px] h-[230px]'>
            {
                chart.length > 0 && (
                    <ResponsiveContainer>
                        <BarChart
                            width={700}
                            height={230}
                            data={chart}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Bar dataKey="quantity" fill="#8884d8" shape={TriangleBar} label={{ position: 'top' }}>
                                {chart.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )
            }
        </div>
    );
};

export default TriAngleChart;