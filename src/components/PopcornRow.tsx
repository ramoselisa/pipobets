
import { Popcorn } from "lucide-react";

export function PopcornRow({ count = 9, className = "" }: { count?: number; className?: string }) {
  // Make the popcorns a bit wavy
  return (
    <div className={`w-full flex items-center justify-center gap-0.5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Popcorn
          key={i}
          size={24}
          className={
            "text-yellow-400 drop-shadow-md " +
            (i % 2 === 0 ? "rotate-[-12deg]" : "rotate-[10deg] ")
          }
          style={{ marginBottom: `${(Math.sin(i) * 6).toFixed(2)}px` }}
        />
      ))}
    </div>
  );
}
