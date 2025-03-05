import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TimeInput({ value, onChange, className }: TimeInputProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor="time">Enter Target Time (24-hour format)</Label>
      <Input
        type="time"
        id="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-center"
      />
    </div>
  );
}
