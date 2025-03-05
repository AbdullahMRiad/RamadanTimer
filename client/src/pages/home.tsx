import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TimeInput } from "@/components/ui/time-input";
import { Clock, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { differenceInSeconds, format, parse, isValid } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { getTimeString } from "@/lib/countdown";
import { useTheme } from "next-themes";

export default function Home() {
  const [targetTime, setTargetTime] = useState("");
  const [countdown, setCountdown] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

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
      <div className="flex justify-between items-center w-full max-w-lg mx-auto">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="flex-1 space-y-2"
        >
          <div className="flex items-center gap-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="w-9 p-0">
                <Clock className="h-6 w-6" />
                <span className="sr-only">Toggle time picker</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <Card className="w-full p-4">
              <TimeInput
                value={targetTime}
                onChange={(val) => setTargetTime(val)}
                className="text-xl"
              />
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-[clamp(2rem,15vw,12rem)] font-mono font-bold tracking-tight">
          {countdown || "00:00:00"}
        </div>
      </div>
    </div>
  );
}