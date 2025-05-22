import { Plane } from "lucide-react";

export const LoadingFlight = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center mt-72 relative">
        <Plane
          className="w-20 h-20 text-green-600 animate-takeoff"
          aria-label="Loading airplane"
        />

        <p className="mt-4  font-black text-4xl animate-pulse">Loading...</p>

        <style>{`
        @keyframes takeoff {
          0% {
            opacity: 0;
            transform: translateY(100%) rotate(-20deg) scale(0.5);
          }
          30% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
          70% {
            transform: translateY(-150px) rotate(20deg) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(-300px) rotate(20deg) scale(0.5);
            opacity: 0;
          }
        }
        .animate-takeoff {
          animation: takeoff 3s ease-in-out infinite;
        }
      `}</style>
      </div>
    </div>
  );
};
