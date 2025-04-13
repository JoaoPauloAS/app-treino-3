
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import ExerciseItem from "@/components/ExerciseItem";
import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ExercisesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  const exercises = [
    {
      id: 1,
      name: "Bench Press",
      muscleGroup: "Chest",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Squat",
      muscleGroup: "Legs",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Deadlift",
      muscleGroup: "Back",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Pull Up",
      muscleGroup: "Back",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Shoulder Press",
      muscleGroup: "Shoulders",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Bicep Curl",
      muscleGroup: "Arms",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 7,
      name: "Tricep Extension",
      muscleGroup: "Arms",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 8,
      name: "Leg Press",
      muscleGroup: "Legs",
      imageUrl: "/placeholder.svg"
    }
  ];
  
  const muscleGroups = ["all", "chest", "back", "shoulders", "arms", "legs", "abs"];
  
  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "all" || ex.muscleGroup.toLowerCase() === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="fitness-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Exercise Library</h1>
          
          <Button variant="ghost" size="icon">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {muscleGroups.map((group) => (
            <Button
              key={group}
              variant={activeFilter === group ? "default" : "outline"}
              className="whitespace-nowrap"
              onClick={() => setActiveFilter(group)}
            >
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </Button>
          ))}
        </div>
        
        <div className="mb-8">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <ExerciseItem
                key={exercise.id}
                name={exercise.name}
                muscleGroup={exercise.muscleGroup}
                imageUrl={exercise.imageUrl}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No exercises found</p>
            </div>
          )}
        </div>
      </div>
      
      <Navigation />
    </>
  );
};

export default ExercisesPage;
