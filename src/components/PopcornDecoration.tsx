
import { Popcorn, Baby } from "lucide-react";

export function PopcornDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-300 via-red-500 to-red-300 opacity-50"></div>

      {/* Cinema popcorn-style decorative elements */}
      <div className="absolute top-1/4 left-10 animate-float opacity-20" style={{ animationDelay: "0s" }}>
        <Popcorn size={30} className="text-red-500 rotate-12" />
      </div>
      <div className="absolute top-1/3 right-16 animate-float opacity-20" style={{ animationDelay: "0.5s" }}>
        <Popcorn size={24} className="text-white bg-red-500 rounded-full p-1 rotate-[-12deg]" />
      </div>
      <div className="absolute top-2/3 left-1/4 animate-float opacity-20" style={{ animationDelay: "1.2s" }}>
        <Popcorn size={20} className="text-red-400 rotate-45" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 animate-float opacity-20" style={{ animationDelay: "0.7s" }}>
        <Popcorn size={28} className="text-white bg-red-600 rounded-full p-1 -rotate-20" />
      </div>
      <div className="absolute top-1/2 left-3/4 animate-float opacity-20" style={{ animationDelay: "1.5s" }}>
        <Popcorn size={22} className="text-red-500 rotate-12" />
      </div>
      
      {/* More detailed red and white popcorn elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i}
          className={`absolute animate-float opacity-${10 + (i % 5) * 5}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          <Popcorn 
            size={Math.random() * 30 + 20} 
            className={`${
              i % 3 === 0 
                ? "text-white bg-red-500 rounded-full p-1" 
                : "text-red-400"
            }`} 
          />
        </div>
      ))}
      
      {/* Decorative corner elements with red accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-red-200 rounded-tl-xl"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-red-200 rounded-tr-xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-red-200 rounded-bl-xl"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-red-200 rounded-br-xl"></div>
    </div>
  );
}
