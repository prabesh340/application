import React from "react";

const Flav = ({ id, name, imgUrl, color }) => {
  const gradientClasses = {
    lime: "from-lime-400 to-lime-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
  };
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-start px-4 overflow-hidden rotate-0 ${
        id % 2 == 0 ? "sm:rotate-8" : "sm:-rotate-8"
      }`}
    >
      <div className="w-full h-full max-w-4xl">
        <div
           className={`relative rounded-3xl overflow-visible aspect-5/4 bg-linear-to-br ${
    gradientClasses[color] || ""
  }`}
        >
          {/* Can Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={imgUrl}
              alt={`${name} flavor can`}
              className="w-[110%] h-auto object-contain drop-shadow-2xl z-10"
              style={{ transform: "rotate(10deg)" }}
            />
          </div>

          {/* Flavor Text */}
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 z-20">
            <h2
              className="text-[#FAEADE] text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight"
              style={{
                fontFamily: "Antonio, sans-serif",
                letterSpacing: "-0.05em",
              }}
            >
              {name}
            </h2>
          </div>

          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Flav;
