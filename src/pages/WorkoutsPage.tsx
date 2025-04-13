
import React from "react";
import Navigation from "@/components/Navigation";
import WorkoutCard from "@/components/WorkoutCard";
import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const WorkoutsPage = () => {
  const workouts = [
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
    },
    {
      id: 4,
      title: "Pull Workout",
      date: "5 days ago",
      duration: "55 min",
      exerciseCount: 6
    },
    {
      id: 5,
      title: "Full Body",
      date: "1 week ago",
      duration: "75 min",
      exerciseCount: 8
    }
  ];

  return (
    <>
      <div className="fitness-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Workouts</h1>
          
          <Button variant="outline" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button className="fitness-btn w-full py-4 flex items-center justify-center gap-2">
            <Plus className="h-5 w-5" />
            New Workout
          </Button>
          
          <Button variant="outline" className="w-full py-4 flex items-center justify-center gap-2">
            <Plus className="h-5 w-5" />
            Create Routine
          </Button>
        </div>
        
        <div className="mb-8">
          <h2 className="section-title">Recent Workouts</h2>
          
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              title={workout.title}
              date={workout.date}
              duration={workout.duration}
              exerciseCount={workout.exerciseCount}
            />
          ))}
        </div>
      </div>
      
      <Navigation />
    </>
  );
};

export default WorkoutsPage;
