import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Donation from "../Pages/Donation/Donation";
import PetListing from "../Pages/PetListing/PetListing";
import DashLayout from "../DashBoard/DashBoard/DashLayout";
import AddPets from "../DashBoard/UserRoutes/AddPets";
import PetsDetails from "../components/PetsDetails/PetsDetails";
import Login from "../UserAuthentication/Login";
import Register from "../UserAuthentication/Register";
import MyAddedPets from "../DashBoard/UserRoutes/MyAddedPets/MyAddedPets";
import UpdatePets from "../DashBoard/UserRoutes/MyAddedPets/UpdatePets";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import AdoptionRequest from "../DashBoard/UserRoutes/AdoptionRequest/AdoptionRequest";
import AddDonationCampaigns from "../DashBoard/UserRoutes/AddDonationCampaigns/AddDonationCampaigns";
import ProvideDonation from "../components/ProvideDonation/ProvideDonation";
import MyDonationCampaigns from "../DashBoard/UserRoutes/MyDonationCampaigns/MyDonationCampaigns";
import EditDonation from "../components/upDateMydonation/EditDonation";
import AllUsers from "../DashBoard/DashBoard/AdminRoute/Alluser/AllUsers";
import AllPetsAdmin from "../DashBoard/DashBoard/AdminRoute/AllPets/AllPetsAdmin";
import AdminUpdatePets from "../components/AdninUpDatedPets/AdminUpdatePets";
import AllDonations from "../DashBoard/DashBoard/AdminRoute/AllDonations/AllDonations";
import UpdateDonation from "../components/EditDonation/UpdateDonation";
import AdminRoute from "./Adminroute/AdminRoute/AdminRoute";
import ErrorElement from "./ErrorElement";
import DashErrorElement from "./DashErrorElement";
import UserrRoutesAccess from "../components/AdminAcceccUserRoutes/UserrRoutesAccess";
import DonationDetails from "../Pages/Donation/DonationDetails";
import AdminProfile from "../DashBoard/DashBoard/AdminRoute/AdminProfile/AdminProfile";
import Profile from "../DashBoard/UserRoutes/UserProfile/Profile";
import State from "../DashBoard/DashBoard/adminState/State";
import UserPayDonation from "../DashBoard/UserRoutes/UserAddedDonation/UserPayDonation";
import DonationPay from "../Pages/AddedDonations/DonationPay";
import MyDonationHistory from "../DashBoard/UserRoutes/MyDonations/MyDonationHistory";


const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorElement />,
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "petsListing",
                element: <PetListing />
            },
            {
                path: 'petsDetails/:id',
                element: <PetsDetails />,
            },
            {
                path: "donation",
                element: <Donation />
            },
            {
                path: "/detailsDonation/:id",
                element: <PrivateRoute> <DonationDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://adoption-pets-server-site.vercel.app/details-donation/${params.id}`)
            },
            {
                path: "donationProviders",
                element: <PrivateRoute><ProvideDonation /></PrivateRoute>
            },

            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    },
    {
        path: "dashBoard/",
        errorElement: <DashErrorElement />,
        element: <PrivateRoute> <DashLayout />,</PrivateRoute>,
        children: [
            // users route
            {
                path: "adminAccessUserRoute",
                element: <UserrRoutesAccess />
            },
            {
                path: "addMyPets",
                element: <PrivateRoute><MyAddedPets /></PrivateRoute>
            },
            {
                path: "/dashBoard/dashBoard/editPets/:id",
                element: <PrivateRoute><UpdatePets /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://adoption-pets-server-site.vercel.app/petsDetails/${params.id}`)
            },
            {
                path: "addPets",
                element: <PrivateRoute> <AddPets /></PrivateRoute>
            },
            {
                path: "CreateDonation",
                element: <PrivateRoute><AddDonationCampaigns /></PrivateRoute>
            },
            {
                path: "adoptionRequest",
                element: <PrivateRoute><AdoptionRequest /></PrivateRoute>
            },
            {
                path: "myCreateDonation",
                element: <PrivateRoute><MyDonationCampaigns /></PrivateRoute>
            },
            {
                path: "/dashBoard/dashBoard/donation/:id",
                element: <PrivateRoute><EditDonation /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://adoption-pets-server-site.vercel.app/details-donation/${params.id}`)
            },
            {
                path: "myDonationHistory",
                element: <PrivateRoute> <MyDonationHistory /></PrivateRoute>
            },
            {
                path: "userPayDonation",
                element: <PrivateRoute><UserPayDonation /></PrivateRoute>
            },
            {
                path: "donationPay/",
                element: <PrivateRoute><DonationPay /></PrivateRoute>
            },
            {
                path: "userProfile/",
                element: <Profile />
            },

            // admin route
            {
                path: 'adminState',
                element: <State />
            },
            {
                path: "allUsers",
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: "allPets",
                element: <AdminRoute><AllPetsAdmin /></AdminRoute>
            },
            {
                path: "updatePets/:id",
                element: <AdminRoute><AdminUpdatePets /></AdminRoute>,
                loader: ({ params }) => fetch(`https://adoption-pets-server-site.vercel.app/petsDetails/${params.id}`)
            },
            {
                path: "allDonations",
                element: <AdminRoute><AllDonations /></AdminRoute>
            },
            {
                path: "editDonation/:id",
                element: <AdminRoute><UpdateDonation /></AdminRoute>,
                loader: ({ params }) => fetch(`https://adoption-pets-server-site.vercel.app/details-donation/${params.id}`)
            },
            {
                path: "adminProfile/",
                element: <AdminProfile />
            }

        ]
    }
])

export default router