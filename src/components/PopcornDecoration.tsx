import { Popcorn, Baby } from "lucide-react";

export function PopcornDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary via-primary to-secondary opacity-50"></div>

      {/* Classic popcorn icons */}
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
      
      {/* More RED and PINK popcorn elements! */}
      <div className="absolute top-8 left-1/5 animate-float opacity-30" style={{ animationDelay: "0.2s" }}>
        <Popcorn size={34} style={{ color: "#ea384c" }} className="-rotate-3" />
      </div>
      <div className="absolute top-2/3 right-24 animate-float opacity-30" style={{ animationDelay: "0.6s" }}>
        <Popcorn size={36} style={{ color: "#FFDEE2" }} className="rotate-6" />
      </div>
      <div className="absolute bottom-10 left-[12%] animate-float opacity-30" style={{ animationDelay: "1.1s" }}>
        <Popcorn size={28} style={{ color: "#D946EF" }} className="rotate-12" />
      </div>
      <div className="absolute top-[12%] right-6 animate-float opacity-40" style={{ animationDelay: "1.7s" }}>
        <Popcorn size={40} style={{ color: "#ea384c" }} className="-rotate-12" />
      </div>
      <div className="absolute top-16 left-[60%] animate-float opacity-40" style={{ animationDelay: "2.4s" }}>
        <Popcorn size={38} style={{ color: "#D946EF" }} className="rotate-[22deg]" />
      </div>
      <div className="absolute bottom-[17%] left-[38%] animate-float opacity-25" style={{ animationDelay: "1.55s" }}>
        <Popcorn size={24} style={{ color: "#ea384c" }} className="rotate-[17deg]" />
      </div>
      <div className="absolute bottom-8 right-2 animate-float opacity-30" style={{ animationDelay: "2.1s" }}>
        <Popcorn size={36} style={{ color: "#FFDEE2" }} className="rotate-[6deg]" />
      </div>
      <div className="absolute bottom-16 right-16 animate-float" style={{ opacity: 0.32, animationDelay: "1.3s" }}>
        <Popcorn size={30} style={{ color: "#D946EF" }} className="-rotate-18" />
      </div>
      <div className="absolute top-[22%] right-1/3 animate-float opacity-35" style={{ animationDelay: "0.48s" }}>
        <Popcorn size={28} style={{ color: "#FFDEE2" }} className="rotate-2" />
      </div>
      <div className="absolute bottom-[10%] left-[70%] animate-float opacity-30" style={{ animationDelay: "1.05s" }}>
        <Popcorn size={32} style={{ color: "#ea384c" }} className="rotate-20" />
      </div>
      {/* Existing fancy ones for variety */}
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
