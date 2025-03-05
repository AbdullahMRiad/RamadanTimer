import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TimeInput({ value, onChange, className }: TimeInputProps) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':').map(Number);
      setHours(h);
      setMinutes(m);
    }
  }, [value]);

  const updateTime = (newHours: number, newMinutes: number) => {
    // Ensure hours are between 0 and 23
    newHours = ((newHours % 24) + 24) % 24;
    // Ensure minutes are between 0 and 59
    newMinutes = ((newMinutes % 60) + 60) % 60;

    onChange(`${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`);
  };

  const adjustTime = (type: 'hours' | 'minutes', increment: boolean) => {
    if (type === 'hours') {
      updateTime(hours + (increment ? 1 : -1), minutes);
    } else {
      updateTime(hours, minutes + (increment ? 1 : -1));
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => adjustTime('hours', true)}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <div className="text-4xl font-mono w-16 text-center">
            {hours.toString().padStart(2, '0')}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => adjustTime('hours', false)}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-4xl font-mono">:</div>
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => adjustTime('minutes', true)}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <div className="text-4xl font-mono w-16 text-center">
            {minutes.toString().padStart(2, '0')}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => adjustTime('minutes', false)}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}