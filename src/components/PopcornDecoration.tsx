
import { Popcorn, Baby } from "lucide-react";

export function PopcornDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary via-primary to-secondary opacity-50"></div>
      
      {/* Scattered popcorn elements with our custom float animation */}
      <div className="absolute top-1/4 left-10 animate-float opacity-10" style={{ animationDelay: "0s" }}>
        <Popcorn size={30} className="text-primary rotate-12" />
      </div>
      <div className="absolute top-1/3 right-16 animate-float opacity-10" style={{ animationDelay: "0.5s" }}>
        <Popcorn size={24} className="text-primary -rotate-12" />
      </div>
      <div className="absolute top-2/3 left-1/4 animate-float opacity-10" style={{ animationDelay: "1.2s" }}>
        <Popcorn size={20} className="text-primary rotate-45" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 animate-float opacity-10" style={{ animationDelay: "0.7s" }}>
        <Popcorn size={28} className="text-primary -rotate-20" />
      </div>
      <div className="absolute top-1/2 left-3/4 animate-float opacity-10" style={{ animationDelay: "1.5s" }}>
        <Popcorn size={22} className="text-primary rotate-12" />
      </div>
      
      {/* *** New: More red and pink popcorn elements *** */}
      <div className="absolute top-10 right-1/4 animate-float opacity-30" style={{ animationDelay: "0.3s" }}>
        <Popcorn size={22} style={{ color: "#ea384c" }} className="rotate-3" />
      </div>
      <div className="absolute bottom-16 left-1/3 animate-float opacity-30" style={{ animationDelay: "0.8s" }}>
        <Popcorn size={30} style={{ color: "#D946EF" }} className="-rotate-12" />
      </div>
      <div className="absolute top-[40%] left-[15%] animate-float opacity-20" style={{ animationDelay: "1.4s" }}>
        <Popcorn size={36} style={{ color: "#FFDEE2" }} className="rotate-6" />
      </div>
      <div className="absolute top-0 left-2/3 animate-float opacity-30" style={{ animationDelay: "1.9s" }}>
        <Popcorn size={24} style={{ color: "#ea384c" }} className="rotate-[17deg]" />
      </div>
      <div className="absolute bottom-8 right-8 animate-float opacity-20" style={{ animationDelay: "2.2s" }}>
        <Popcorn size={32} style={{ color: "#D946EF" }} className="rotate-[22deg]" />
      </div>
      {/* Add some baby icons too */}
      <div className="absolute top-1/3 left-1/3 animate-float opacity-10" style={{ animationDelay: "0.8s" }}>
        <Baby size={24} className="text-accent rotate-12" />
      </div>
      <div className="absolute bottom-1/3 right-1/3 animate-float opacity-10" style={{ animationDelay: "1.8s" }}>
        <Baby size={20} className="text-accent -rotate-12" />
      </div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary/20 rounded-tl-xl"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary/20 rounded-tr-xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary/20 rounded-bl-xl"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary/20 rounded-br-xl"></div>
    </div>
  );
}
