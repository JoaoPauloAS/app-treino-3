
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Dumbbell, BarChart2, List, User, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-fitness-navy border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 px-2">
        <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">{t("home")}</span>
        </Link>
        
        <Link to="/workouts" className={`nav-item ${isActive("/workouts") ? "active" : ""}`}>
          <Dumbbell className="h-6 w-6" />
          <span className="text-xs mt-1">{t("workouts")}</span>
        </Link>
        
        <Link to="/exercises" className={`nav-item ${isActive("/exercises") ? "active" : ""}`}>
          <List className="h-6 w-6" />
          <span className="text-xs mt-1">{t("exercises")}</span>
        </Link>
        
        <Link to="/progress" className={`nav-item ${isActive("/progress") ? "active" : ""}`}>
          <BarChart2 className="h-6 w-6" />
          <span className="text-xs mt-1">{t("progress")}</span>
        </Link>
        
        <Link to="/profile" className={`nav-item ${isActive("/profile") ? "active" : ""}`}>
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">{t("profile")}</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
