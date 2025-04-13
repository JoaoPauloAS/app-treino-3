
import React from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const LanguageToggle: React.FC = () => {
  const { language, changeLanguage, t } = useLanguage();
  
  const handleLanguageChange = (value: string) => {
    if (value) {
      changeLanguage(value as Language);
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5" />
      <ToggleGroup 
        type="single" 
        value={language} 
        onValueChange={handleLanguageChange}
        aria-label={t("language")}
      >
        <ToggleGroupItem value="pt-BR" aria-label="Português">
          PT
        </ToggleGroupItem>
        <ToggleGroupItem value="en" aria-label="English">
          EN
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default LanguageToggle;
