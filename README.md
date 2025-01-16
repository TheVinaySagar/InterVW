# Interview Experience Portal

A full-stack web application for sharing and managing interview experiences. Users can submit, view, and manage their interview experiences across different companies.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) 
[![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react)

## Features

- User Authentication (Login/Register)
- Homepage with all interview experiences
- Personal Dashboard
  - Edit submissions
  - Delete submissions
  - View all personal submissions
- Responsive Design
- Form validation and error handling

## Tech Stack

### Frontend
- React.js
- React Router v6 for navigation
- Tailwind CSS for styling
- React Hooks for state management

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

### Setting up MongoDB

1. Create a MongoDB database
2. Copy your connection string

### Server Setup

1. Clone the repository:
```bash
git clone https://github.com/TheVinaySagar/InterVW.git
cd InterVW
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Create a `.env` file in the server directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Install server dependencies:
```bash
npm install express mongoose dotenv cors jsonwebtoken bcryptjs
```

5. Start the server:
```bash
npm start
```

### Client Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install client dependencies:
```bash
npm install react react-dom react-router-dom @heroicons/react axios
```

3. Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Configure Tailwind CSS - Update tailwind.config.js:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. Add Tailwind directives to ./src/index.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Create a `.env` file in the client directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

7. Start the client:
```bash
npm start
```

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditSubmission.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
|   |   |   └── Layout.jsx
|   |   |   └── ProtectedRoute.jsx
|   |   |   └── SubmissionForm.jsx
|   |   |   └── SubmissionList.jsx
|   |   ├── components/
            └── AuthContext.jsx
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Submissions
- `GET /api/submissions` - Get all submissions
- `GET /api/submissions/user` - Get user's submissions
- `POST /api/submissions` - Create new submission
- `PUT /api/submissions/:id` - Update submission
- `DELETE /api/submissions/:id` - Delete submission

## Dependencies

### Server Dependencies
```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.3"
  }
}
```

### Client Dependencies
```json
{
  "dependencies": {
    "@heroicons/react": "^2.0.18",
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.2"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.23",
    "tailwindcss": "^3.3.2"
  }
}
```

## Screenshots

[Add your application screenshots here]

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Improvements

- Add search functionality
- Implement filters by company/location
- Add comment system
- Add upvote/downvote system
- Add tags for technologies/skills
- Implement rich text editor for submissions

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- React Documentation
- Tailwind CSS Documentation
- MongoDB Documentation
- Express.js Documentation
