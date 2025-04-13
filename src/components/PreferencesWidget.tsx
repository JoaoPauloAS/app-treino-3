
import React from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const PreferencesWidget: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="fitness-card p-4 flex flex-col gap-4">
      <h3 className="text-lg font-bold">{t("preferences")}</h3>
      
      <div className="flex items-center justify-between">
        <span>{t("dark_mode")}</span>
        <ThemeToggle />
      </div>
      
      <div className="flex items-center justify-between">
        <span>{t("language")}</span>
        <LanguageToggle />
      </div>
    </div>
  );
};

export default PreferencesWidget;
