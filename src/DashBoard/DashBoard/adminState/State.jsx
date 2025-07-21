import { useQuery } from '@tanstack/react-query';
import AxiosSecure from '../../../UseHooks/AxiosSecure/AxiosSecure';
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Area, Line, Legend, Tooltip } from 'recharts';
import { FaUsers, FaCodePullRequest } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { GiLovers } from "react-icons/gi";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import TriAngleChart from './TriAngleChart';


const State = () => {
    const axiosSecure = AxiosSecure();
    const [value, onChange] = useState(new Date());

    const { data: totalRevenue = [] } = useQuery({
        queryKey: ['revenue'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-status');
            console.log('totalRevenue', res.data);
            return res.data;
        }
    });
    const { data: chart = [] } = useQuery({
        queryKey: ['chart'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donation-state');
            console.log('chart', res.data);
            return res.data;
        }
    });

    return (
        <div>
            {
                totalRevenue?.map(revenue => {
                    return <div key={revenue.users} className='grid grid-cols-2 lg:grid-cols-4 items-start gap-4'>
                        <div className='flex items-center gap-4 bg-white p-4 rounded-md'>
                            <FaUsers className='text-4xl' />
                            <div>
                                <p className='font-bold'>{revenue.users}</p>
                                <p>Total Users</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 bg-white p-4 rounded-md'>
                            <MdOutlinePets className='text-4xl' />
                            <div>
                                <p className='font-bold'>{revenue.allPets}</p>
                                <p>Total Pets</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 bg-white p-4 rounded-md'>
                            <FaCodePullRequest className='text-4xl' />
                            <div>
                                <p className='font-bold'>{revenue.adoptedRequest}</p>
                                <p>Adopted Requests</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 bg-white p-4 rounded-md'>
                            <GiLovers className='text-4xl' />
                            <div>
                                <p className='font-bold'>${revenue.totalDonation}</p>
                                <p>Donation Collect</p>
                            </div>
                        </div>
                    </div>
                })
            }

            {/* Chart */}
            {
                chart?.length > 0 && (
                    <div className='mt-8'>
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer>
                                <ComposedChart
                                    width={500}
                                    height={400}
                                    data={chart}
                                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis dataKey="revenue" scale="band" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="category" fill="#8884d8" stroke="#8884d8" />
                                    <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                                    <Line type="monotone" dataKey="quantity" stroke="#ff7300" />
                                    <Line type="monotone" dataKey="revenue" stroke="#00C49F" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-3'>
                            <div className='col-span-2'>
                                <TriAngleChart />
                            </div>
                            <div className='col-span-1'>
                                <Calendar
                                    className="my-calendar scale-[0.75]  origin-top-left"
                                    onChange={onChange}
                                    value={value}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default State;
