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
      <div className="w-16 h-16 bg-fitness-gray dark:bg-fitness-dark-gray rounded-lg overflow-hidden mr-4 flex-shrink-0">
        <Image 
          src={imageUrl} 
          alt={name} 
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{muscleGroup}</p>
      </div>
    </div>
  );
};

export default ExerciseItem;
