
import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

const DUE_DATE = new Date("2025-05-04T00:00:00");

function getTimeRemaining(to: Date) {
  const total = to.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function CountdownTimer() {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(DUE_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining(DUE_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (remaining.total <= 0) {
    return (
      <div className="container py-4">
        <div className="flex justify-center items-center gap-2 bg-primary/10 text-primary rounded-md px-4 py-2 text-xl font-bold">
          <Timer className="h-6 w-6" />
          <span>The countdown is over!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="flex justify-center items-center gap-3 bg-primary/10 rounded-md px-4 py-2 text-primary text-xl font-bold">
        <Timer className="h-6 w-6" />
        <span>
          Time to due date:{" "}
          <span className="font-mono">
            {remaining.days}d {remaining.hours}h {remaining.minutes}m {remaining.seconds}s
          </span>
        </span>
      </div>
    </div>
  );
}
