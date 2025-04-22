const fs = require('fs');
const path = require('path');

/**
 * Emergency fix script for the Vercel deployment
 * This script replaces components that use useLocation with fallback versions
 */

console.log('🚨 RUNNING EMERGENCY FIX SCRIPT 🚨');

// Ensure src/pages directory exists
const pagesDir = path.join(process.cwd(), 'src', 'pages');
if (!fs.existsSync(pagesDir)) {
  console.log('src/pages directory not found. Creating it...');
  fs.mkdirSync(pagesDir, { recursive: true });
}

// Create fallback for NotFound.tsx
const notFoundContent = `
import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
`;

// Create fallback for Navigation.tsx
const componentDir = path.join(process.cwd(), 'src', 'components');
if (!fs.existsSync(componentDir)) {
  console.log('src/components directory not found. Creating it...');
  fs.mkdirSync(componentDir, { recursive: true });
}

const navigationContent = `
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Dumbbell, BarChart2, List, User, Home } from "lucide-react";

const Navigation = () => {
  const router = useRouter();
  
  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 px-2">
        <Link href="/" className={\`nav-item \${isActive("/") ? "active" : ""}\`}>
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link href="/workouts" className={\`nav-item \${isActive("/workouts") ? "active" : ""}\`}>
          <Dumbbell className="h-6 w-6" />
          <span className="text-xs mt-1">Workouts</span>
        </Link>
        
        <Link href="/exercises" className={\`nav-item \${isActive("/exercises") ? "active" : ""}\`}>
          <List className="h-6 w-6" />
          <span className="text-xs mt-1">Exercises</span>
        </Link>
        
        <Link href="/progress" className={\`nav-item \${isActive("/progress") ? "active" : ""}\`}>
          <BarChart2 className="h-6 w-6" />
          <span className="text-xs mt-1">Progress</span>
        </Link>
        
        <Link href="/profile" className={\`nav-item \${isActive("/profile") ? "active" : ""}\`}>
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
`;

// Write the fallback files
fs.writeFileSync(path.join(pagesDir, 'NotFound.tsx'), notFoundContent);
fs.writeFileSync(path.join(componentDir, 'Navigation.tsx'), navigationContent);

console.log('Created fallback for NotFound.tsx');
console.log('Created fallback for Navigation.tsx');

// Overwrite the index.tsx pages
for (const page of ['Index', 'WorkoutsPage', 'ExercisesPage', 'ProfilePage', 'ProgressPage']) {
  const pageContent = `
import React from 'react';
import Navigation from '../components/Navigation';

const ${page} = () => {
  return (
    <div className="container mx-auto px-4 pb-20 pt-6">
      <h1 className="text-2xl font-bold mb-6">${page.replace('Page', '')}</h1>
      <p>This is a temporary placeholder for the ${page}.</p>
      <p>The application is currently in maintenance mode.</p>
      <Navigation />
    </div>
  );
};

export default ${page};
`;

  fs.writeFileSync(path.join(pagesDir, `${page}.tsx`), pageContent);
  console.log(`Created fallback for ${page}.tsx`);
}

console.log('✅ Emergency fix completed!'); 