import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TimeInput } from "@/components/ui/time-input";
import { differenceInSeconds, format, parse, isValid } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { getTimeString } from "@/lib/countdown";

export default function Home() {
  const [targetTime, setTargetTime] = useState("");
  const [countdown, setCountdown] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!targetTime) return;

    const today = new Date();
    const target = parse(targetTime, "HH:mm", today);
    
    if (!isValid(target)) return;

    // Adjust target to today's date
    target.setFullYear(today.getFullYear());
    target.setMonth(today.getMonth());
    target.setDate(today.getDate());

    // If target time is in the past, add 1 day
    if (target < today) {
      target.setDate(target.getDate() + 1);
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diff = differenceInSeconds(target, now);
      
      if (diff <= 0) {
        clearInterval(interval);
        setCountdown("00:00:00");
        toast({
          title: "Countdown Complete",
          description: "The countdown has reached zero.",
        });
        return;
      }

      setCountdown(getTimeString(diff));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, toast]);

  return (
    <div className="min-h-screen bg-background flex flex-col p-4 sm:p-8">
      <Card className="w-full max-w-lg mx-auto p-4">
        <TimeInput
          value={targetTime}
          onChange={(val) => setTargetTime(val)}
          className="text-xl"
        />
      </Card>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-[clamp(2rem,15vw,12rem)] font-mono font-bold tracking-tight">
          {countdown || "00:00:00"}
        </div>
      </div>
    </div>
  );
}
