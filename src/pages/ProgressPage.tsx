
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import ProgressChart from "@/components/ProgressChart";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProgressPage = () => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState("3months");
  
  const benchPressData = [
    { date: "Jan 1", weight: 70 },
    { date: "Jan 15", weight: 75 },
    { date: "Feb 1", weight: 77.5 },
    { date: "Feb 15", weight: 80 },
    { date: "Mar 1", weight: 82.5 },
    { date: "Mar 15", weight: 85 },
  ];
  
  const squatData = [
    { date: "Jan 1", weight: 100 },
    { date: "Jan 15", weight: 105 },
    { date: "Feb 1", weight: 110 },
    { date: "Feb 15", weight: 115 },
    { date: "Mar 1", weight: 120 },
    { date: "Mar 15", weight: 125 },
  ];
  
  const deadliftData = [
    { date: "Jan 1", weight: 120 },
    { date: "Jan 15", weight: 130 },
    { date: "Feb 1", weight: 135 },
    { date: "Feb 15", weight: 140 },
    { date: "Mar 1", weight: 145 },
    { date: "Mar 15", weight: 150 },
  ];

  return (
    <>
      <div className="fitness-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t("progress_tracking")}</h1>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-fitness-purple" />
            <span className="font-medium">{t("last_3_months")}</span>
          </div>
          
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("select_period")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">{t("last_month")}</SelectItem>
              <SelectItem value="3months">{t("last_3_months")}</SelectItem>
              <SelectItem value="6months">{t("last_6_months")}</SelectItem>
              <SelectItem value="1year">{t("last_year")}</SelectItem>
              <SelectItem value="all">{t("all_time")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-8 space-y-6">
          <ProgressChart 
            data={benchPressData} 
            title="Bench Press Progress" 
            exerciseName={t("weight_progression")}
          />
          
          <ProgressChart 
            data={squatData} 
            title="Squat Progress" 
            exerciseName={t("weight_progression")}
          />
          
          <ProgressChart 
            data={deadliftData} 
            title="Deadlift Progress" 
            exerciseName={t("weight_progression")}
          />
        </div>
        
        <div className="fitness-card p-4 mb-6">
          <h3 className="text-lg font-bold mb-4">{t("personal_records")}</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
              <div>
                <p className="font-medium">Bench Press</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">March 15, 2023</p>
              </div>
              <p className="text-xl font-bold text-fitness-purple">85 kg</p>
            </div>
            
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
              <div>
                <p className="font-medium">Squat</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">March 15, 2023</p>
              </div>
              <p className="text-xl font-bold text-fitness-purple">125 kg</p>
            </div>
            
            <div className="flex justify-between items-center pb-2">
              <div>
                <p className="font-medium">Deadlift</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">March 15, 2023</p>
              </div>
              <p className="text-xl font-bold text-fitness-purple">150 kg</p>
            </div>
          </div>
        </div>
      </div>
      
      <Navigation />
    </>
  );
};

export default ProgressPage;
