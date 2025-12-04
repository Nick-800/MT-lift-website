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
    <div className="floor-indicator hidden md:flex">
      {Array.from({ length: totalFloors }).map((_, index) => (
        <button
          key={index}
          onClick={() => onFloorClick(index)}
          className={`floor-dot ${currentFloor === index ? "active" : ""}`}
          aria-label={`Go to ${floorLabels[index]}`}
          title={floorLabels[index]}
        />
      ))}
    </div>
  );
};

export default FloorIndicator;
