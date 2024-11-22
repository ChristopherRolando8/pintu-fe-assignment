# Pintu Frontend Assignment

This repository contains a frontend assignment for Pintu, showcasing a modern React-based application built with a strong focus on maintainability, scalability, and performance. Below, you'll find an overview of the app's design and instructions to set up and run the project.

## 🛠️ Project Design

### 1. Architecture
The application follows a component-based architecture using React and TypeScript. This ensures:

- **Reusability**: Shared components are encapsulated and modular.
- **Scalability**: Easy to extend features by following consistent patterns.
- **Maintainability**: Separation of concerns using modern tools.

### 2. Technologies Used
- **React**: For building the user interface.
- **TypeScript**: To enable type safety and enhance code reliability.
- **CSS Modules**: For scoped, maintainable styling.
- **Axios**: For handling API requests.

### 3. Design Principles
- **State Management**: Leveraging React's useState and Context API for state management.
- **Responsive Design**: Ensures usability across different screen sizes.
- **Error Handling**: Graceful handling of API errors with fallback UI.

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/ChristopherRolando8/pintu-fe-assignment.git
cd pintu-fe-assignment
```

### 2. Install Dependencies
Ensure you have Node.js (version 16 or higher) and npm or yarn installed.

Run the following command:
```bash
npm install
# or
yarn install
```

### 3. Run the Development Server
Start the local development server:
```bash
npm run dev
# or
yarn dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

### 4. Build for Production
To build the app for production:
```bash
npm run build
# or
yarn build
```
The optimized output will be in the `build/` or `.next/` folder (depending on the framework).

### 5. Run Tests
To execute the tests:
```bash
npm run test
# or
yarn test
```

## 📂 Folder Structure
```
pintu-fe-assignment/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Main application views
│   ├── hooks/        # Custom React hooks
│   ├── styles/       # CSS or styled-components
│   ├── utils/        # Utility functions
│   ├── services/     # API service calls
│   ├── context/      # React context for state management
│   └── types/        # Type definitions
├── package.json      # Project dependencies and scripts
└── README.md         # Documentation
```
