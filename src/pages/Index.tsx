
import React from "react";
import Navigation from "@/components/Navigation";
import WorkoutCard from "@/components/WorkoutCard";
import TimerWidget from "@/components/TimerWidget";
import { PlusCircle, ChevronRight, Zap, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t } = useLanguage();
  
  const recentWorkouts = [
    {
      id: 1,
      title: "Upper Body Strength",
      date: "Today",
      duration: "45 min",
      exerciseCount: 5
    },
    {
      id: 2,
      title: "Leg Day",
      date: "Yesterday",
      duration: "60 min",
      exerciseCount: 6
    },
    {
      id: 3,
      title: "Push Workout",
      date: "3 days ago",
      duration: "50 min",
      exerciseCount: 7
    }
  ];

  return (
    <>
      <div className="fitness-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t("workout_tracker")}</h1>
        </div>

        <Button className="fitness-btn w-full mb-6 py-6 flex items-center justify-center gap-2 text-lg">
          <PlusCircle className="h-5 w-5" />
          {t("start_new_workout")}
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="fitness-card p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-fitness-purple-light flex items-center justify-center mr-4">
              <Zap className="h-6 w-6 text-fitness-purple" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t("weekly_volume")}</p>
              <p className="text-xl font-bold">12,450 kg</p>
            </div>
          </div>
          
          <div className="fitness-card p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-fitness-purple-light flex items-center justify-center mr-4">
              <TrendingUp className="h-6 w-6 text-fitness-purple" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t("workouts_this_week")}</p>
              <p className="text-xl font-bold">3 / 5</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="section-title">{t("recent_workouts")}</h2>
            <Button variant="ghost" size="sm" className="flex items-center text-fitness-purple">
              {t("view_all")} <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {recentWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              title={workout.title}
              date={workout.date}
              duration={workout.duration}
              exerciseCount={workout.exerciseCount}
            />
          ))}
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-4">
          <TimerWidget />
          
          <div className="fitness-card p-4 mt-4 md:mt-0">
            <h3 className="text-lg font-bold mb-2">{t("upcoming_workouts")}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center p-2 border-b border-gray-100 dark:border-gray-800">
                <div className="h-10 w-10 rounded-full bg-fitness-purple-light flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-fitness-purple" />
                </div>
                <div>
                  <p className="font-medium">Pull Workout</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t("tomorrow")}</p>
                </div>
              </div>
              
              <div className="flex items-center p-2">
                <div className="h-10 w-10 rounded-full bg-fitness-purple-light flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-fitness-purple" />
                </div>
                <div>
                  <p className="font-medium">Leg Day</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t("in_days").replace("%d", "2")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Navigation />
    </>
  );
};

export default Dashboard;
