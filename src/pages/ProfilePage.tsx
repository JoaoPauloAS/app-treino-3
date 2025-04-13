
import React from "react";
import Navigation from "@/components/Navigation";
import { User, Settings, LogOut, ChevronRight, BarChart2, Clock, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  return (
    <>
      <div className="fitness-container">
        <div className="flex flex-col items-center mb-8">
          <div className="h-24 w-24 rounded-full bg-fitness-purple-light flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-fitness-purple" />
          </div>
          
          <h1 className="text-2xl font-bold mb-1">John Doe</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">john.doe@example.com</p>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            
            <Button variant="secondary" size="sm" className="flex items-center gap-1 text-red-500">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="fitness-card p-4 flex flex-col items-center">
            <BarChart2 className="h-8 w-8 text-fitness-purple mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Volume</p>
            <p className="text-xl font-bold">87,450 kg</p>
          </div>
          
          <div className="fitness-card p-4 flex flex-col items-center">
            <Clock className="h-8 w-8 text-fitness-purple mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300">Workout Time</p>
            <p className="text-xl font-bold">42 hours</p>
          </div>
          
          <div className="fitness-card p-4 flex flex-col items-center">
            <Medal className="h-8 w-8 text-fitness-purple mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Workouts</p>
            <p className="text-xl font-bold">64</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="section-title">Account</h2>
          
          <div className="fitness-card">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-fitness-purple-light flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-fitness-purple" />
                </div>
                <p className="font-medium">Profile Information</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-fitness-purple-light flex items-center justify-center mr-3">
                  <Settings className="h-5 w-5 text-fitness-purple" />
                </div>
                <p className="font-medium">Preferences</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-fitness-purple-light flex items-center justify-center mr-3">
                  <LogOut className="h-5 w-5 text-fitness-purple" />
                </div>
                <p className="font-medium">Logout</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <Navigation />
    </>
  );
};

export default ProfilePage;
