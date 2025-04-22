import React from "react";
// import { Link, useLocation } from "react-router-dom"; // Remover imports do react-router-dom
import { useRouter } from "next/router"; // Importar useRouter do next/router
import Link from "next/link"; // Importar Link do next/link
import { Dumbbell, BarChart2, List, User, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  // const location = useLocation(); // Remover useLocation
  const router = useRouter(); // Usar useRouter
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    // Usar router.pathname para verificar o caminho atual
    return router.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-fitness-navy border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {/* Usar Link do next/link com atributo href */}
        <Link href="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">{t("home")}</span>
        </Link>
        
        <Link href="/workouts" className={`nav-item ${isActive("/workouts") ? "active" : ""}`}>
          <Dumbbell className="h-6 w-6" />
          <span className="text-xs mt-1">{t("workouts")}</span>
        </Link>
        
        <Link href="/exercises" className={`nav-item ${isActive("/exercises") ? "active" : ""}`}>
          <List className="h-6 w-6" />
          <span className="text-xs mt-1">{t("exercises")}</span>
        </Link>
        
        <Link href="/progress" className={`nav-item ${isActive("/progress") ? "active" : ""}`}>
          <BarChart2 className="h-6 w-6" />
          <span className="text-xs mt-1">{t("progress")}</span>
        </Link>
        
        <Link href="/profile" className={`nav-item ${isActive("/profile") ? "active" : ""}`}>
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">{t("profile")}</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
