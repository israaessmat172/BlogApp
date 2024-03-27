# Nodejs Blog Application

Welcome to the Nodejs Blog Application! This is a feature-rich blogging platform built using Nodejs, providing comprehensive backend functionality for managing users, posts, comments, categories, and various features associated with a blogging platform.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **User Management:** 
- User registration with hashed passwords.
- User login and authentication with JWT.
- User profile management (update profile, change password).
- Admin functionalities (block/unblock users, upgrade user account).

2. **CRUD Operations:** Perform Create, Read, Update, and Delete operations on blog posts, allowing users to manage their content efficiently.

3. **Post Management:**
- Like and dislike posts.
- View post statistics (number of views, likes, dislikes).
- Upload post photos.
  
4. **Comment Management:** Create, update, and delete comments on posts.

5. **Follow/Unfollow Users:** 
- Follow and unfollow other users.
- View users who have followed your profile.

6. **Blocking Users:** 
- Block and unblock other users.
- Admin blocking/unblocking of users.

## Getting Started

 ### Prerequisites
    -Node.js 21.4
    -MongoDB

 ### Installation

1. Clone the repository:

```bash
    git clone https://github.com/israaessmat172/BlogApp.git
    cd blog-api
```

2. Install dependencies:

```bash
   npm install
```
3. Set up environment variables:

- Create a `.env` file 
- Provide necessary configurations such as MongoDB URI,JWT_KEY, CLOUDINARY_CLOUD_NAME, Cloudinary API key, CLOUDINARY_API_SECRET_KEY.

## Usage

1. Run the application:

```bash
   npm run server
```

2. Access the API endpoints using tools like Thunder Client, Postman, or curl.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens) for authentication
- Cloudinary for file uploads

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Deployment
You can visit my app using this link
[Blog App](https://blogapp-ecv2.onrender.com)
