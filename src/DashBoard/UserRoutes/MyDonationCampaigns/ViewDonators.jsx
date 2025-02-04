

const ViewDonators = ({ donators, idx }) => {
    // console.log('donators', donators);

    return (
        <>
            <tr>
                <th>{idx + 1}</th>
                <td>{donators.donnerName}</td>
                <td>{donators.donationAmount}</td>
                <td>{donators.petsName}</td>
                <td><img className="w-[50px] h-[50px] rounded-full" src={donators.petsImage} alt="" /></td>
            </tr>

        </>
    );
};

export default ViewDonators;