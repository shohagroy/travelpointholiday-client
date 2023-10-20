# Travel Point Holiday - Booking Website

This is a comprehensive Booking Website project powered by Next.js, tailored for all your travel and holiday needs. Whether you're planning a family vacation or a business trip, Travel Point Holiday offers a seamless booking experience. Explore exciting destinations, find accommodations, and create unforgettable memories.

## Description

Travel Point Holiday is a modern web application designed to provide a user-friendly platform for booking travel-related services. The project is built using Next.js, offering a fast and dynamic experience for the frontend, while the backend relies on Next.js API for efficient management of products, reviews, and user sessions. With a clean and intuitive interface, users can easily navigate through the site and plan their ideal travel experiences.

## Features

## Client

- **Explore Travel Places:** Browse and explore a wide range of travel destinations worldwide. Get detailed information, view images, and learn about the top attractions at each location.

- **User-Friendly Booking:** Users can easily book travel services by adding them to their cart and completing the booking process. Options for adding and removing services from the cart are available.

- **Leave Reviews:** Share your travel experiences and provide feedback by leaving reviews for the services you've booked. This helps other travelers make informed decisions.

- **User Authentication:** Users can create an account or sign in using their Gmail credentials, ensuring a secure and personalized experience.

- **Manage Bookings:** Logged-in users can efficiently manage their bookings, including the ability to cancel and request refunds for booked services.

- **User Profiles:** Users have the option to create and manage their profiles, providing a central hub for personal information and travel preferences.

- **Contact Us:** Access a "Contact Us" page to get in touch with any inquiries, feedback, or support requests.

- **About Us:** Learn more about the website and its mission through the "About Us" page.

- **Responsive Design:** The website is fully responsive, offering a seamless experience across various devices, including mobile, tablet, and desktop.

## Admin Features

TravelPoint includes a set of features designed specifically for admin users, ensuring efficient site management and user support:

### Admin Authentication

- **Different Roles:** Admins have elevated roles or permissions compared to regular users.
- **Login Page and Registration:** Implement an admin login page and a registration process for admin users.

### Admin Dashboard

- **Centralized Admin Dashboard:** Admins access a dedicated dashboard that provides a comprehensive overview of the site.

### Admin Access to Attractions

- **Full Control:** Admins can view, add, update, and delete travel attractions.
- **Attraction Details:** Admins manage attraction details, including name, description, images, location, and pricing.

### User Management

- **Manage User Accounts:** Admins can oversee user accounts, offering options to view, update, or delete user profiles.
- **Create New Admins:** Admins have the capability to create new admin accounts for other users.

### Booking Management

- **Booking Overview:** Admins view and manage booking information, including bookings made by users.
- **Booking Details:** Admins access booking details, update booking statuses, and handle cancellations or refunds.

### Review Management

- **Review Oversight:** Admins monitor and manage user reviews of attractions and services.
- **Review Actions:** Admins can read, edit, or remove reviews that violate community guidelines.

## Technologies Used

- **Frontend:** Built with Next.js, React, and styled using Tailwind CSS and Ant Design for a sleek and responsive design.
- **User Authentication:** Implements user authentication using NextAuth.js, providing secure and customizable authentication options.
- **Deployment:** Hosted and deployed on Vercel for effortless scaling and seamless integration with your development workflow.

**Frontend Dependencies:**

- **@ant-design/cssinjs:** Version 1.17.0
- **@hookform/resolvers:** Version 3.3.2
- **@reduxjs/toolkit:** Version 1.9.7
- **antd:** Version 5.10.0
- **axios:** Version 1.5.1
- **jwt-decode:** Version 3.1.2
- **next:** Version 13.5.4
- **react:** Version 18
- **react-dom:** Version 18
- **react-hook-form:** Version 7.47.0
- **react-quill:** Version 2.0.0
- **react-redux:** Version 8.1.3
- **recharts:** Version 2.9.0
- **yup:** Version 1.3.2

## Production Deployment

The project is deployed to Vercel and can be accessed using the following link:

[Live Demo: https:travelpointholiday.vercel.app/](https:travelpointholiday.vercel.app/)

## How to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/shohagroy/travelpointholiday-client.git
```

# Install frontend and backend both dependencies

cd travelpointholiday-client
npm install

# Create a .env file following content:

NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://travelpoint-server-rouge.vercel.app/api/v1

# Run the project server

npm run dev
