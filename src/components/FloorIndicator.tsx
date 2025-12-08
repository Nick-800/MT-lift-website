interface FloorIndicatorProps {
  currentFloor: number;
  totalFloors: number;
  onFloorClick: (floor: number) => void;
  floorLabels: string[];
}

const FloorIndicator = ({
  currentFloor,
  totalFloors,
  onFloorClick,
  floorLabels,
}: FloorIndicatorProps) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {Array.from({ length: totalFloors }).map((_, index) => (
        <button
          key={index}
          onClick={() => onFloorClick(index)}
          className="group flex items-center gap-3 justify-end"
          aria-label={`Go to ${floorLabels[index]}`}
        >
          <span
            className={`text-xs font-medium transition-all duration-300 ${
              currentFloor === index
                ? "opacity-100 text-secondary"
                : "opacity-0 group-hover:opacity-100 text-muted-foreground"
            }`}
          >
            {floorLabels[index]}
          </span>
          <span
            className={`rounded-full transition-all duration-300 ${
              currentFloor === index
                ? "w-3 h-3 bg-secondary"
                : "w-2 h-2 bg-foreground/20 group-hover:bg-secondary/50"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default FloorIndicator;
