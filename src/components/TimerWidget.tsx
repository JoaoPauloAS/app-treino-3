
import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";

interface TimerWidgetProps {
  defaultSeconds?: number;
}

const TimerWidget: React.FC<TimerWidgetProps> = ({ defaultSeconds = 60 }) => {
  const { t } = useLanguage();
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [isActive, setIsActive] = useState(false);
  const [customTime, setCustomTime] = useState(defaultSeconds.toString());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const resetTimer = (newTime = defaultSeconds) => {
    setIsActive(false);
    setSeconds(newTime);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTime(e.target.value);
  };

  const applyCustomTime = () => {
    const newTime = parseInt(customTime);
    if (!isNaN(newTime) && newTime > 0) {
      resetTimer(newTime);
    }
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="fitness-card p-4">
      <h3 className="text-lg font-bold mb-2">{t("rest_timer")}</h3>
      
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-4 tracking-wider">{formatTime(seconds)}</div>
        
        <div className="flex space-x-2 mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTimer}
            className="h-10 w-10 rounded-full"
          >
            {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => resetTimer()}
            className="h-10 w-10 rounded-full"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={customTime}
            onChange={handleCustomTimeChange}
            className="w-16 text-foreground bg-background"
            min="5"
          />
          <Button variant="secondary" size="sm" onClick={applyCustomTime}>
            {t("set")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;
