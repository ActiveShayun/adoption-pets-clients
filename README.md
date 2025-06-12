live Demo <Br/>

<img src="https://ibb.co.com/C5y8QLzC" alt="Profile Picture" width="150">

![image alt](https://github.com/ActiveShayun/adoption-pets-clients/blob/7797c62734a642cd0921125622047907f092610c/Screenshot%202025-02-05%20040829.png)

![image alt](https://github.com/ActiveShayun/adoption-pets-clients/blob/9013f0e2c05aacc5f08209809d11012a4967e917/Screenshot%202025-02-05%20193553.png)

![image alt](https://github.com/ActiveShayun/adoption-pets-clients/blob/bd49050fb716daadee172cde7ac767ca6e9d8482/Screenshot%202025-02-05%20193611.png)

# 🐾 Pet Adoption Platform

A full-featured, responsive web application designed to help connect pets in need with loving families. Built with the **MERN stack**, the platform provides seamless pet listing, adoption, and donation functionalities, complete with admin and user dashboards.

## 🌐 Live Website
[🔗 Visit the Live Site](https://adoption-auth.web.app/)

---

## 🎯 Project Purpose

This platform was built to leverage technology in making a positive impact in the lives of animals. It allows users to:
- Adopt pets in need of homes
- Donate to support specific pets
- Create and manage pet listings and donation campaigns
- Administer user roles and content

---

## 🧩 Key Features

### ✅ General Features
- Fully responsive on **mobile**, **tablet**, and **desktop**
- Secured environment variables for Firebase and MongoDB credentials
- Clean UI design using `shadcn-ui`, `react-icons`, `react-loading-skeleton`

### 🚀 Authentication
- Email/Password login
- Google & GitHub OAuth
- Role-based access control (Admin & User)
- JWT token-based auth
- Firebase `updateProfile` for user profile picture and name
- Protected routes with role restrictions

### 🏠 Home Page
- Responsive Navbar with dropdown and profile pic
- Banner section
- Pet categories (Cat, Dog, Rabbit, Fish, etc.)
- Inspirational Call-to-Action section
- About Us + Two relevant custom sections

### 🐶 Pet Listing & Details
- Search by name & filter by category
- Infinite scroll using `react-intersection-observer` + `tanstack query`
- Details modal with pre-filled adoption form
- Adoption requests are stored and manageable

### 💳 Donation Campaigns
- List of campaigns with infinite scrolling
- Donation details with Stripe integration
- Recommended donations section

### 🔒 User Dashboard (Protected)
- Add, update, delete pets (with image upload via imgbb API)
- Pet listing in sortable table using `Tanstack Table`
- Manage adoptions & view requests
- Create/edit donation campaigns
- View and manage donation history with refund option

### 🔐 Admin Dashboard (Protected)
- Access to all user dashboard features
- View/manage all users (make admin, ban user)
- Moderate all pet listings (edit/delete/update status)
- Moderate donation campaigns (edit/pause/delete)

---

## 📦 NPM Packages Used

### 🔧 Core Stack
- `React`, `Node.js`, `Express`, `MongoDB`
- `Firebase`, `Tanstack Query`, `Tanstack Table`

### 🧰 Dev & UI
- `shadcn-ui`, `react-hook-form`, `react-icons`
- `react-router-dom`, `react-toastify`, `clsx`
- `stripe`, `react-intersection-observer`
- `react-loading-skeleton`, `react-quill`, `zod`, `axios`, `jsonwebtoken`

---

## 🌈 UI Library & Editor
- **UI Library**: `shadcn-ui` (No daisyUI used)
- **WYSIWYG Editor**: `React Quill` for rich text in long descriptions


## 📁 Repositories

- **Frontend**: [GitHub Client Repo](hhttps://github.com/ActiveShayun/adoption-pets-clients)

---

##  🧶 Step-by-Step: Client Side Setup (with Code)

###  1. Clone the Client Repository

```bash
# Clone Client
[git clone ](https://github.com/ActiveShayun/adoption-pets-clients)
 cd client-repo

2. Install Dependencies
# For client
npm install

3. Create .env File
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_BACKEND_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

5. Run the Project Locally
npm run dev