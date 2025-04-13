
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useLanguage } from "@/contexts/LanguageContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <Toggle 
      pressed={theme === "dark"} 
      onPressedChange={toggleTheme}
      aria-label={t(theme === "light" ? "dark_mode" : "light_mode")}
      className="flex items-center gap-2"
    >
      {theme === "light" ? (
        <>
          <Moon className="h-5 w-5" />
          <span className="sr-only sm:not-sr-only text-sm">{t("dark_mode")}</span>
        </>
      ) : (
        <>
          <Sun className="h-5 w-5" />
          <span className="sr-only sm:not-sr-only text-sm">{t("light_mode")}</span>
        </>
      )}
    </Toggle>
  );
};

export default ThemeToggle;
