import React from "react";
import Image from "next/image";

interface ExerciseItemProps {
  name: string;
  muscleGroup: string;
  imageUrl: string;
  onClick?: () => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  name,
  muscleGroup,
  imageUrl,
  onClick
}) => {
  return (
    <div 
      className="fitness-card flex items-center p-3 mb-3 cursor-pointer hover:translate-y-[-2px] transition-transform"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-md">
          <Image
            src={imageUrl || '/placeholder-exercise.jpg'}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{muscleGroup}</p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseItem;
