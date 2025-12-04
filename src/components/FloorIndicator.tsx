import { cn } from "@/lib/utils";

interface FloorIndicatorProps {
  currentFloor: number;
  totalFloors: number;
  onFloorClick: (floor: number) => void;
  floorLabels: string[];
}

const FloorIndicator = ({ currentFloor, totalFloors, onFloorClick, floorLabels }: FloorIndicatorProps) => {
  return (
    <div className="floor-indicator hidden md:flex">
      {Array.from({ length: totalFloors }).map((_, index) => (
        <div key={index} className="group relative flex items-center">
          <div
            className={cn("floor-dot", currentFloor === index && "active")}
            onClick={() => onFloorClick(index)}
          />
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium text-foreground whitespace-nowrap bg-card px-2 py-1 rounded shadow-lg">
            {floorLabels[index]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FloorIndicator;
