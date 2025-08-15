# MyCycle Admin Portal

A modern React-based admin dashboard for managing cycle inventory with CRUD operations, authentication, and responsive design.

## Features

- 🔐 **Authentication System** - Secure login with session management
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Built with Tailwind CSS and Lucide React icons
- 🔄 **CRUD Operations** - Create, Read, Update, Delete cycles
- 🔔 **Toast Notifications** - User-friendly success/error messages
- 📊 **Dashboard Stats** - Real-time cycle count and analytics
- 🎯 **Component Architecture** - Modular and maintainable code structure

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Lightning fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful SVG icons
- **React Hot Toast** - Elegant toast notifications

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to admin folder

```bash
cd admin
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

4. Configure your `.env` file with the following variables:

```properties
# API Configuration
VITE_API_URL=http://localhost:5000

# Admin Authentication Credentials
VITE_ADMIN_PHONE=your_admin_phone_number
VITE_ADMIN_PASSWORD=your_admin_password
```

5. Start the development server

```bash
npm run dev
```

6. Open your browser and visit `http://localhost:5173`

## Environment Variables

The application requires the following environment variables:

| Variable              | Description              | Default Value           |
| --------------------- | ------------------------ | ----------------------- |
| `VITE_API_URL`        | Backend API endpoint     | `http://localhost:5000` |
| `VITE_ADMIN_PHONE`    | Admin login phone number | _Required_              |
| `VITE_ADMIN_PASSWORD` | Admin login password     | _Required_              |

## Authentication

The admin portal uses a simple authentication system with the following features:

- **Login Form** - Phone number and password validation
- **Session Management** - 24-hour token expiration
- **Auto-logout** - Automatic logout on token expiration
- **Persistent Sessions** - Remember login across browser sessions

### Admin Credentials

Configure the admin credentials in your `.env` file using the `VITE_ADMIN_PHONE` and `VITE_ADMIN_PASSWORD` environment variables.

_Note: In production, implement proper backend authentication with secure password hashing and JWT tokens._

## Project Structure

```
admin/
├── src/
│   ├── components/         # React components
│   │   ├── Sidebar.jsx    # Navigation sidebar
│   │   ├── Header.jsx     # Top header with logout
│   │   ├── LoginPage.jsx  # Authentication form
│   │   ├── ViewCycles.jsx # Display cycles grid
│   │   ├── CreateCycle.jsx # Create new cycle form
│   │   └── ManageCycles.jsx # Edit/delete cycles
│   ├── contexts/          # React contexts
│   │   └── AuthContext.jsx # Authentication state
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.js     # Authentication hook
│   │   └── useCycles.js   # Cycles data management
│   ├── services/          # API services
│   │   └── api.js         # Centralized API calls
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── .env                  # Environment variables
├── .env.example         # Environment template
└── package.json         # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The admin portal integrates with a REST API for cycle management:

- `GET /api/cycles` - Fetch all cycles
- `POST /api/cycles` - Create new cycle
- `PUT /api/cycles/:id` - Update existing cycle
- `DELETE /api/cycles/:id` - Delete cycle

Configure the API endpoint using the `VITE_API_URL` environment variable.

## Development

### Component Guidelines

- Use functional components with hooks
- Implement proper error handling
- Follow responsive design principles
- Use Tailwind CSS utility classes
- Include loading states and user feedback

### Code Style

- ESLint configuration included
- Consistent naming conventions
- Modular component architecture
- Separation of concerns (hooks, services, components)

## Security Considerations

⚠️ **Important for Production:**

- Implement proper backend authentication
- Use secure password hashing (bcrypt)
- Implement JWT tokens with refresh mechanism
- Add rate limiting for login attempts
- Use HTTPS in production
- Sanitize user inputs
- Implement proper CORS policies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the MyCycle web application.

---

Built with ❤️ using React, Vite, and Tailwind CSS
