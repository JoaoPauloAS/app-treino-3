
import React from "react";
import { Clock, Calendar, Dumbbell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WorkoutCardProps {
  title: string;
  date: string;
  duration: string;
  exerciseCount: number;
  onClick?: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  date,
  duration,
  exerciseCount,
  onClick
}) => {
  const { t } = useLanguage();
  
  return (
    <div 
      className="fitness-card mb-4 cursor-pointer hover:translate-y-[-2px] transition-transform"
      onClick={onClick}
    >
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        
        <div className="flex flex-wrap text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center mr-4 mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center mr-4 mb-2">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center mb-2">
            <Dumbbell className="h-4 w-4 mr-1" />
            <span>{exerciseCount} {t("exercises_count")}</span>
          </div>
        </div>
      </div>
      
      <div className="h-1.5 bg-fitness-purple-light">
        <div className="h-full bg-fitness-purple" style={{ width: "70%" }}></div>
      </div>
    </div>
  );
};

export default WorkoutCard;
